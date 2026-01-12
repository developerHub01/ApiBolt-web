import { serverSupabaseClient } from "#supabase/server";
import { readFiles } from "h3-formidable";
import { SUPABSE_STORAGE_BUCKET_NAME } from "~~/server/constant/supabase";
import { checkUser } from "~~/server/utils/auth";
import { handleRemoveStorage } from "~~/server/utils/supabase-bucket";
import type { H3Event } from "h3";
import fs from "fs/promises";

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  const client = await serverSupabaseClient(event);

  if (!user)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 401,
      message: "you are not logged in",
    });

  const { fields, files } = await readFiles(event);

  // Text fields
  const name = fields.name?.[0];
  const description = fields.description?.[0];
  const themeType = fields.type?.[0];
  const palette = JSON.parse(fields.palette?.[0] || "{}");

  // File fields
  const previewFile = files.preview?.[0];
  const thumbnailFile = files.thumbnail?.[0];

  if (!previewFile || !thumbnailFile)
    throw sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Missing image file",
    });

  const themeId = crypto.randomUUID();
  const ext = previewFile.mimetype?.split("/")[1] || "png";
  const assetName = `${user.id}/${themeId}.${ext}`;

  try {
    const [previewBuffer, thumbnailBuffer] = await Promise.all([
      fs.readFile(previewFile.filepath),
      fs.readFile(thumbnailFile.filepath),
    ]);

    const [pUp, tUp] = await Promise.all([
      client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview)
        .upload(assetName, previewBuffer, {
          contentType: previewFile.mimetype ?? "image/png",
        }),
      client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail)
        .upload(assetName, thumbnailBuffer, {
          contentType: thumbnailFile.mimetype ?? "image/png",
        }),
    ]);

    if (pUp.error || tUp.error) {
      await handleThemeAssetsStorage(event, assetName);
      throw new Error("Theme preview upload failed");
    }

    const previewUrl = client.storage
      .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview)
      .getPublicUrl(assetName).data.publicUrl;
    const thumbnailUrl = client.storage
      .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail)
      .getPublicUrl(assetName).data.publicUrl;

    /* create theme */
    const { data, error } = await client
      .from("themes")
      .insert({
        id: themeId,
        name,
        description,
        palette,
        author: user.id,
        preview: previewUrl,
        thumbnail: thumbnailUrl,
        type: themeType,
      })
      .select()
      .single();

    if (error) {
      await handleThemeAssetsStorage(event, assetName);

      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: error.message ?? "Something went wrong.",
      });
    }

    return sendStandardResponse(event, {
      success: true,
      message: "theme created successfully",
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message: message,
    });
  } finally {
    Promise.all([
      fs.unlink(previewFile.filepath).catch(() => {}),
      fs.unlink(thumbnailFile.filepath).catch(() => {}),
    ]);
  }
});

const handleThemeAssetsStorage = async (event: H3Event, path: string) => {
  await Promise.all([
    handleRemoveStorage(
      event,
      SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview,
      path
    ),
    handleRemoveStorage(
      event,
      SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail,
      path
    ),
  ]);
};
