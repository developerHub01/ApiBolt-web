import { prisma } from "@/db/client";

const getStatusInstall = async () => {
  const totalInstalls = await prisma.app_install_events.count();
  const uniqueDevices = await prisma.unique_devices_installs.count();

  return {
    totalInstalls,
    uniqueDevices,
  };
};

export const StatusService = {
  getStatusInstall,
};
