import { prisma } from "@/db/client";
import { ThemeInterface } from "@/types/themes.types";

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
) => {
  return await prisma.themes.create({
    data: payload,
  });
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
  createTheme,
  deleteThemebyIdAndAuthorId,
};
