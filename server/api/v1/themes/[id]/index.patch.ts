import { serverSupabaseClient } from "#supabase/server";
import { readFiles } from "h3-formidable";
import { SUPABSE_STORAGE_BUCKET_NAME } from "~~/server/constant/supabase";
import { checkUser } from "~~/server/utils/auth";
import { handleRemoveStorage } from "~~/server/utils/supabase-bucket";
import type { H3Event } from "h3";
import fs from "fs/promises";
import { ThemeInterface } from "~/types/theme.types";

interface ThemeUpdatePayload extends Partial<
  Pick<
    ThemeInterface,
    | "name"
    | "description"
    | "type"
    | "preview"
    | "thumbnail"
    | "palette"
    | "version"
  >
> {}

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  const client = await serverSupabaseClient(event);
  const themeId = getRouterParam(event, "id");

  if (!user || !themeId)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });

  const { fields, files } = await readFiles(event);
  const updatePayload: ThemeUpdatePayload = {};

  /* Check basic fields */
  if (fields.name?.[0]) updatePayload.name = fields.name[0].trim();
  if (fields.description?.[0])
    updatePayload.description = fields.description[0].trim();
  if (fields.type?.[0]) updatePayload.type = fields.type[0];

  /* Palette & Version Logic */
  if (fields.palette?.[0]) {
    try {
      const rawPalette = JSON.parse(fields.palette[0]) as Record<
        string,
        string
      >;
      updatePayload.palette = Object.fromEntries(
        Object.entries(rawPalette).map(([key, value]) => [
          key,
          value.toLowerCase(),
        ]),
      );

      const { data: theme } = await client
        .from("themes")
        .select("version")
        .eq("id", themeId)
        .single();

      updatePayload.version = (theme?.version ?? 1) + 1;
    } catch (e) {
      console.error("Palette parse error:", e);
    }
  }

  const previewFile = files.preview?.[0];
  const thumbnailFile = files.thumbnail?.[0];
  let assetPath = "";

  try {
    if (previewFile && thumbnailFile) {
      const ext = previewFile.mimetype?.split("/")[1] || "png";
      assetPath = `${user.id}/${themeId}.${ext}`;

      const [previewBuffer, thumbnailBuffer] = await Promise.all([
        fs.readFile(previewFile.filepath),
        fs.readFile(thumbnailFile.filepath),
      ]);

      const [pUp, tUp] = await Promise.all([
        client.storage
          .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview)
          .upload(assetPath, previewBuffer, {
            contentType: previewFile.mimetype ?? "image/png",
            upsert: true,
          }),
        client.storage
          .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail)
          .upload(assetPath, thumbnailBuffer, {
            contentType: thumbnailFile.mimetype ?? "image/png",
            upsert: true,
          }),
      ]);

      if (pUp.error || tUp.error) throw new Error("Storage upload failed");

      updatePayload.preview = client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview)
        .getPublicUrl(assetPath).data.publicUrl;
      updatePayload.thumbnail = client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail)
        .getPublicUrl(assetPath).data.publicUrl;
    }

    const { data, error } = await client
      .from("themes")
      .update(updatePayload)
      .eq("id", themeId)
      .eq("author", user.id)
      .select()
      .single();

    if (error) {
      if (assetPath && previewFile && thumbnailFile)
        await handleThemeAssetsStorage(event, assetPath);

      return sendStandardResponse(event, {
        success: false,
        statusCode: error.code === "23505" ? 400 : 500,
        message:
          error.code === "23505"
            ? "Duplicate palette detected."
            : error.message,
      });
    }

    return sendStandardResponse(event, {
      success: true,
      message: "Theme updated",
      data,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message,
    });
  } finally {
    if (previewFile) await fs.unlink(previewFile.filepath).catch(() => {});
    if (thumbnailFile) await fs.unlink(thumbnailFile.filepath).catch(() => {});
  }
});

const handleThemeAssetsStorage = async (event: H3Event, path: string) => {
  await Promise.all([
    handleRemoveStorage(
      event,
      SUPABSE_STORAGE_BUCKET_NAME.theme.theme_preview,
      path,
    ),
    handleRemoveStorage(
      event,
      SUPABSE_STORAGE_BUCKET_NAME.theme.theme_thumbnail,
      path,
    ),
  ]);
};
