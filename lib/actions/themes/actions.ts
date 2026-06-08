"use server";

import { getUserAction } from "@/lib/actions/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { Prisma } from "@/prisma/generated/prisma/client";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";
import { ThemesService } from "@/server/v1/modules/themes/themes.service";
import { ThemeInterface, TThemeType } from "@/types/themes.types";
import generateThemeAssetsServer from "@/utils/themes.utils";
import { revalidatePath } from "next/cache";

export const publishThemeAction = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      success: false,
      message: "You are not logged in",
    };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const themeType = formData.get("type") as TThemeType;
  const paletteString = formData.get("palette") as string;
  const { preview: previewFile, thumbnail: thumbnailFile } =
    await generateThemeAssetsServer(formData.get("preview") as File);

  if (
    !previewFile ||
    !thumbnailFile ||
    !previewFile.size ||
    !thumbnailFile.size
  )
    return {
      success: false,
      message: "Missing image file",
    };

  let palette: ThemeInterface["palette"] = {};

  try {
    palette = Object.fromEntries(
      Object.entries(JSON.parse(paletteString)).map(([key, value]) => [
        key,
        String(value).toLowerCase(),
      ]),
    );
  } catch {
    return {
      success: false,
      message: "Invalid palette JSON",
    };
  }

  const themeId = crypto.randomUUID();
  const ext = previewFile.type.split("/")[1] || "png";
  const assetName = `${user.id}/${themeId}.${ext}`;

  const previewBuffer = Buffer.from(await previewFile.arrayBuffer());
  const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());

  const [pUp, tUp] = await Promise.all([
    supabase.storage.from("theme_preview").upload(assetName, previewBuffer, {
      contentType: previewFile.type,
    }),
    supabase.storage
      .from("theme_thumbnail")
      .upload(assetName, thumbnailBuffer, {
        contentType: thumbnailFile.type,
      }),
  ]);

  if (pUp.error || tUp.error) {
    await Promise.all([
      pUp.error
        ? null
        : supabase.storage.from("theme_preview").remove([assetName]),
      tUp.error
        ? null
        : supabase.storage.from("theme_thumbnail").remove([assetName]),
    ]);

    return {
      success: false,
      message: "Theme preview upload failed",
    };
  }

  const { data: previewData } = supabase.storage
    .from("theme_preview")
    .getPublicUrl(assetName);
  const { data: thumbnailData } = supabase.storage
    .from("theme_thumbnail")
    .getPublicUrl(assetName);

  try {
    const theme = await ThemesService.createTheme({
      id: themeId,
      name,
      description,
      palette,
      author: user.id,
      preview: previewData.publicUrl,
      thumbnail: thumbnailData.publicUrl,
      type: themeType,
    });

    const authorUserName = (await ProfileService.getUserNameById(user.id))!;
    revalidatePath("/dashboard/themes");
    revalidatePath("/marketplace");
    revalidatePath(`/profile/${authorUserName}`);

    return {
      success: true,
      message: "Theme created successfully",
      data: theme,
    };
  } catch (error) {
    await Promise.all([
      supabase.storage.from("theme_preview").remove([assetName]),
      supabase.storage.from("theme_thumbnail").remove([assetName]),
    ]);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    )
      return {
        success: false,
        message: "This theme palette is already created by someone.",
      };

    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

export const updateThemeAction = async (
  themeId: string,
  formData: FormData,
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      success: false,
      message: "You are not logged in",
    };

  const isMine = ThemesService.checkIsMyTheme({
    id: themeId,
    authorId: user.id,
  });

  if (!isMine)
    return {
      success: false,
      message: "Theme not found or you do not have permission to update it",
    };

  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const themeType = formData.get("type") as TThemeType | null;
  const paletteString = formData.get("palette") as string | null;
  const rawPreviewFile = formData.get("preview") as File | null;

  let palette: ThemeInterface["palette"] | undefined;

  if (paletteString) {
    try {
      palette = Object.fromEntries(
        Object.entries(JSON.parse(paletteString)).map(([key, value]) => [
          key,
          String(value).toLowerCase(),
        ]),
      );
    } catch {
      return {
        success: false,
        message: "Invalid palette JSON",
      };
    }
  }

  let previewUrl = null;
  let thumbnailUrl = null;

  if (rawPreviewFile && rawPreviewFile.size) {
    const { preview: previewFile, thumbnail: thumbnailFile } =
      await generateThemeAssetsServer(rawPreviewFile);

    if (
      !previewFile ||
      !thumbnailFile ||
      !previewFile.size ||
      !thumbnailFile.size
    )
      return {
        success: false,
        message: "Missing image file",
      };

    const ext = previewFile.type.split("/")[1] || "png";
    const assetName = `${user.id}/${themeId}.${ext}`;

    const previewBuffer = Buffer.from(await previewFile.arrayBuffer());
    const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());

    const [pUp, tUp] = await Promise.all([
      supabase.storage.from("theme_preview").upload(assetName, previewBuffer, {
        contentType: previewFile.type,
        upsert: true,
      }),
      supabase.storage
        .from("theme_thumbnail")
        .upload(assetName, thumbnailBuffer, {
          contentType: thumbnailFile.type,
          upsert: true,
        }),
    ]);

    if (pUp.error || tUp.error) {
      await Promise.all([
        pUp.error
          ? null
          : supabase.storage.from("theme_preview").remove([assetName]),
        tUp.error
          ? null
          : supabase.storage.from("theme_thumbnail").remove([assetName]),
      ]);

      return {
        success: false,
        message: "Theme preview upload failed",
      };
    }

    const { data: previewData } = supabase.storage
      .from("theme_preview")
      .getPublicUrl(assetName);
    const { data: thumbnailData } = supabase.storage
      .from("theme_thumbnail")
      .getPublicUrl(assetName);

    previewUrl = previewData.publicUrl;
    thumbnailUrl = thumbnailData.publicUrl;
  }

  interface UpdateThemePayload {
    name?: string;
    description?: string;
    type?: TThemeType;
    palette?: Record<string, string>;
    preview?: string;
    thumbnail?: string;
  }

  const payload: UpdateThemePayload = {};

  if (name !== null) payload.name = name;
  if (description !== null) payload.description = description;
  if (themeType !== null) payload.type = themeType;
  if (palette !== undefined) payload.palette = palette;
  if (rawPreviewFile && rawPreviewFile.size) {
    payload.preview = previewUrl ?? undefined;
    payload.thumbnail = thumbnailUrl ?? undefined;
  }

  try {
    const theme = await ThemesService.updateTheme({
      themeId,
      payload,
    });

    const authorUserName = (await ProfileService.getUserNameById(user.id))!;
    revalidatePath(`/profile/${authorUserName}`);
    revalidatePath("/dashboard/themes");
    revalidatePath("/marketplace");
    revalidatePath(`/dashboard/theme/${themeId}/edit`);
    revalidatePath(`/theme/${themeId}`);

    return {
      success: true,
      message: "Theme updated successfully",
      data: theme,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    )
      return {
        success: false,
        message: "This theme palette is already created by someone.",
      };

    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

export const deleteThemeByIdAction = async (id: string) => {
  const user = await getUserAction();
  if (!user) return false;

  const response = await ThemesService.deleteThemebyIdAndAuthorId({
    id,
    authorId: user.id,
  });

  if (response) {
    revalidatePath("/dashboard/themes");
    revalidatePath("/marketplace");
  }

  return response;
};
