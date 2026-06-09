import { prisma } from "@/db/client";
import {
  AppInstallReportBodyInterface,
  InstallThemeBodyPayloadInterface,
} from "@/types/server/client.types";
import { ThemeDetailsInterface } from "@/types/themes.types";

const reportAppInstall = async ({
  deviceId,
  version,
}: AppInstallReportBodyInterface): Promise<boolean> => {
  try {
    await prisma.$transaction([
      prisma.unique_devices_installs.upsert({
        where: {
          machine_id: deviceId,
        },
        create: {
          machine_id: deviceId,
        },
        update: {},
      }),

      prisma.app_install_events.create({
        data: {
          machine_id: deviceId,
          version,
        },
      }),
    ]);

    return true;
  } catch {
    return false;
  }
};

const getThemeDetailsById = async (
  id: string,
): Promise<ThemeDetailsInterface | null> => {
  try {
    const theme = await prisma.themes.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        preview: true,
        thumbnail: true,
        palette: true,
        version: true,
        install_count: true,
        profiles: {
          select: {
            id: true,
            full_name: true,
            user_name: true,
          },
        },
      },
    });

    if (!theme) throw new Error();

    const { profiles, ...themeData } = theme;

    return {
      ...themeData,
      type: themeData.type as ThemeDetailsInterface["type"],
      palette: themeData.palette as ThemeDetailsInterface["palette"],
      authorId: profiles?.id,
      author: profiles?.full_name,
      authorUsername: profiles?.user_name,
    };
  } catch {
    return null;
  }
};

const themeInstall = async ({
  deviceId,
  themeId,
  actionType,
}: InstallThemeBodyPayloadInterface) => {
  try {
    if (actionType === "install") {
      await prisma.theme_device_installs.upsert({
        where: {
          device_id_theme_id: {
            device_id: deviceId,
            theme_id: themeId,
          },
        },
        create: {
          device_id: deviceId,
          theme_id: themeId,
        },
        update: {},
      });
    } else {
      await prisma.theme_device_installs.deleteMany({
        where: {
          device_id: deviceId,
          theme_id: themeId,
        },
      });
    }

    return true;
  } catch {
    return false;
  }
};

export const ClientService = {
  reportAppInstall,
  getThemeDetailsById,
  themeInstall,
};
