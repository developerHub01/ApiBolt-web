import { prisma } from "@/db/client";
import { FullProfileInterface, ProfileInterface } from "@/types/profiles.types";

export const getUserIdFromUserName = async (userName: string) => {
  try {
    const profile = await prisma.profiles.findFirst({
      where: {
        user_name: userName,
      },
      select: {
        id: true,
      },
    });

    return profile?.id ?? null;
  } catch {
    return null;
  }
};

export const getUserNameById = async (id: string) => {
  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        id,
      },
      select: {
        user_name: true,
      },
    });
    console.log({ profile });

    return profile?.user_name ?? null;
  } catch {
    return null;
  }
};

export const getProfileById = async (
  id: string,
): Promise<ProfileInterface | null> => {
  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        id,
      },
    });

    if (!profile) return null;

    return profile;
  } catch {
    return null;
  }
};

export const getFullProfileById = async (
  id: string,
): Promise<FullProfileInterface | null> => {
  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        id,
      },
      include: {
        themes: {
          select: {
            id: true,
            name: true,
            type: true,
            preview: true,
            thumbnail: true,
            version: true,
            description: true,
            install_count: true,
            author: true,
            created_at: true,
          },
          orderBy: [
            {
              install_count: "desc",
            },
            {
              created_at: "desc",
            },
          ],
          take: 3,
        },
      },
    });

    if (!profile) return null;

    return profile as FullProfileInterface;
  } catch {
    return null;
  }
};

export const getFullProfileByUserName = async (
  userName: string,
): Promise<FullProfileInterface | null> => {
  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        user_name: userName,
      },
      include: {
        themes: {
          select: {
            id: true,
            name: true,
            type: true,
            preview: true,
            thumbnail: true,
            version: true,
            description: true,
            install_count: true,
            author: true,
            created_at: true,
          },
          orderBy: [
            {
              install_count: "desc",
            },
            {
              created_at: "desc",
            },
          ],
          take: 3,
        },
      },
    });

    if (!profile) return null;

    return profile as FullProfileInterface;
  } catch {
    return null;
  }
};

export const updateProfile = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: Partial<
    Pick<ProfileInterface, "full_name" | "bio" | "avatar_url" | "cover_url">
  >;
}): Promise<ProfileInterface | null> => {
  try {
    return await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        ...payload,
      },
    });
  } catch {
    return null;
  }
};

export const ProfileService = {
  getUserIdFromUserName,
  getUserNameById,
  getProfileById,
  getFullProfileById,
  getFullProfileByUserName,
  updateProfile,
};
