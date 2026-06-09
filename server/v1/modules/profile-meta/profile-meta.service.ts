import { prisma } from "@/db/client";
import { ProfileInterface } from "@/types/profiles.types";

export const getProfileMetaById = async (id: string) => {
  try {
    return (
      ((await prisma.profiles.findUnique({
        where: {
          id,
        },
      })) as ProfileInterface) ?? null
    );
  } catch {
    return null;
  }
};

export const getUserIdFromUserName = async (userName: string) => {
  try {
    const data = (await prisma.profiles.findUnique({
      where: {
        user_name: userName,
      },
      select: {
        id: true,
      },
    })) as Pick<ProfileInterface, "id">;

    return data?.id ?? null;
  } catch {
    return null;
  }
};

export const ProfileMetaService = {
  getProfileMetaById,
  getUserIdFromUserName,
};
