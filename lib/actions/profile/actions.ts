"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserAction } from "@/lib/actions/auth/actions";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";

export const updateProfileAction = async (formData: FormData) => {
  const user = await getUserAction();
  if (!user)
    return {
      success: false,
      message: "You are not logged in",
    };

  const supabase = await createClient();

  const fullName = formData.get("fullName") as string | null;
  const bio = formData.get("bio") as string | null;
  const avatarFile = formData.get("avatar") as File | null;
  const coverFile = formData.get("cover") as File | null;

  console.log({ avatarFile, coverFile });

  let avatarUrl: string | undefined;
  let coverUrl: string | undefined;

  if (avatarFile && avatarFile.size) {
    const ext = avatarFile.type.split("/")[1] || "png";
    const assetName = `${user.id}/avatar.${ext}`;
    const buffer = Buffer.from(await avatarFile.arrayBuffer());

    const { error } = await supabase.storage
      .from("profiles")
      .upload(assetName, buffer, {
        contentType: avatarFile.type,
        upsert: true,
      });

    if (error)
      return {
        success: false,
        message: "Avatar upload failed",
      };

    const { data } = supabase.storage.from("profiles").getPublicUrl(assetName);
    avatarUrl = data.publicUrl;
  }

  if (coverFile && coverFile.size) {
    const ext = coverFile.type.split("/")[1] || "png";
    const assetName = `${user.id}/cover.${ext}`;
    const buffer = Buffer.from(await coverFile.arrayBuffer());

    console.log({
      ext,
      assetName,
      buffer,
    });

    const { error } = await supabase.storage
      .from("profiles")
      .upload(assetName, buffer, {
        contentType: coverFile.type,
        upsert: true,
      });

    console.log(error);

    if (error)
      return {
        success: false,
        message: "Cover upload failed",
      };

    const { data } = supabase.storage.from("profiles").getPublicUrl(assetName);
    coverUrl = data.publicUrl;
  }

  try {
    const updatedProfile = await ProfileService.updateProfile({
      userId: user.id,
      payload: {
        ...(fullName && {
          full_name: fullName,
        }),
        ...(bio && {
          bio,
        }),
        ...(avatarUrl && {
          avatar_url: avatarUrl,
        }),
        ...(coverUrl && {
          cover_url: coverUrl,
        }),
      },
    });

    if (!updatedProfile)
      return {
        success: false,
        message: "Profile couldn't update",
      };

    revalidatePath("/dashboard/profile");
    revalidatePath(`/profile/${updatedProfile?.user_name}`);

    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};
