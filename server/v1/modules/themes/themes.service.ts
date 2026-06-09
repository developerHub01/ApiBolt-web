import { prisma } from "@/db/client";
import { ThemeInterface } from "@/types/themes.types";

const getThemeById = async (id: string) =>
  await prisma.themes.findUnique({
    where: {
      id,
    },
  });

const createTheme = async (
  payload: Pick<
    ThemeInterface,
    | "id"
    | "name"
    | "description"
    | "palette"
    | "author"
    | "preview"
    | "thumbnail"
    | "type"
  >,
) =>
  await prisma.themes.create({
    data: payload,
  });

const updateTheme = async ({
  themeId,
  payload,
}: {
  themeId: string;
  payload: Partial<
    Pick<
      ThemeInterface,
      | "name"
      | "description"
      | "palette"
      | "author"
      | "preview"
      | "thumbnail"
      | "type"
    >
  >;
}) => {
  return await prisma.themes.update({
    data: payload,
    where: {
      id: themeId,
    },
  });
};

const checkIsMyTheme = async ({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}): Promise<boolean> => {
  const exists = await prisma.themes.count({
    where: {
      id,
      author: authorId,
    },
  });

  return exists > 0;
};

const deleteThemebyIdAndAuthorId = async ({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}): Promise<boolean> => {
  try {
    await prisma.themes.delete({
      where: {
        id,
        author: authorId,
      },
    });
    return true;
  } catch {
    return false;
  }
};

export const ThemesService = {
  getThemeById,
  createTheme,
  updateTheme,
  checkIsMyTheme,
  deleteThemebyIdAndAuthorId,
};
