import { prisma } from "@/db/client";
import { AppInstallationInterface } from "@/types/status.types";

const getStatusInstall = async (): Promise<AppInstallationInterface> => {
  try {
    const totalInstalls = await prisma.app_install_events.count();
    const uniqueDevices = await prisma.unique_devices_installs.count();

    return {
      totalInstalls,
      uniqueDevices,
    };
  } catch {
    return {
      totalInstalls: 0,
      uniqueDevices: 0,
    };
  }
};

export const StatusService = {
  getStatusInstall,
};
