import { serverSupabaseClient } from "#supabase/server";
import { readFiles } from "h3-formidable";
import { SUPABSE_STORAGE_BUCKET_NAME } from "~~/server/constant/supabase";
import { checkUser } from "~~/server/utils/auth";
import { handleRemoveStorage } from "~~/server/utils/supabase-bucket";
import type { ProfileMetaInterface } from "~/types/profile.types";
import type { H3Event } from "h3";
import fs from "fs/promises";

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  const userId = user?.id;
  const client = await serverSupabaseClient(event);

  console.log(user);

  if (!user || !userId)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 401,
      message: "you are not logged in",
    });

  const { fields, files } = await readFiles(event);

  const avatarFile = files.avatar?.[0];
  const coverFile = files.cover?.[0];

  const updatePayload: Partial<ProfileMetaInterface> = {
    full_name: fields.fullName?.[0],
    bio: fields.bio?.[0] || null,
  };

  try {
    if (avatarFile) {
      const ext = avatarFile.mimetype?.split("/")[1] || "png";
      const assetName = `${userId}/avatar.${ext}`;
      const buffer = await fs.readFile(avatarFile.filepath);

      const { error: upError } = await client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.profile)
        .upload(assetName, buffer, {
          contentType: avatarFile.mimetype ?? "image/png",
          upsert: true,
        });

      if (upError) {
        await handleProfileAssetsStorage(event, assetName);
        throw new Error("Avatar upload failed");
      }

      updatePayload.avatar_url = client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.profile)
        .getPublicUrl(assetName).data.publicUrl;
    }

    if (coverFile) {
      const ext = coverFile.mimetype?.split("/")[1] || "png";
      const assetName = `${user.id}/cover.${ext}`;
      const buffer = await fs.readFile(coverFile.filepath);

      const { error: upError } = await client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.profile)
        .upload(assetName, buffer, {
          contentType: coverFile.mimetype ?? "image/png",
          upsert: true,
        });

      if (upError) {
        await handleProfileAssetsStorage(event, assetName);
        throw new Error("Cover upload failed");
      }

      updatePayload.cover_url = client.storage
        .from(SUPABSE_STORAGE_BUCKET_NAME.profile)
        .getPublicUrl(assetName).data.publicUrl;
    }

    const { data, error } = await client
      .from("profiles")
      .update(updatePayload)
      .eq("id", userId)
      .select<"*", ProfileMetaInterface>()
      .maybeSingle();

    if (error || !data) {
      if (avatarFile)
        await handleProfileAssetsStorage(
          event,
          `${user.id}/avatar.${avatarFile.mimetype?.split("/")[1] || "png"}`,
        );
      if (coverFile)
        await handleProfileAssetsStorage(
          event,
          `${user.id}/cover.${coverFile.mimetype?.split("/")[1] || "png"}`,
        );

      return sendStandardResponse(event, {
        success: false,
        statusCode: error ? 500 : 404,
        message: error?.message ?? "Profile not found or update failed.",
      });
    }

    return sendStandardResponse(event, {
      success: true,
      message: "profile updated successfully",
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
    if (avatarFile) fs.unlink(avatarFile.filepath).catch(() => {});
    if (coverFile) fs.unlink(coverFile.filepath).catch(() => {});
  }
});

const handleProfileAssetsStorage = async (event: H3Event, path: string) => {
  await handleRemoveStorage(event, SUPABSE_STORAGE_BUCKET_NAME.profile, path);
};
