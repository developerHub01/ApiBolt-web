import { sendResponse } from "@/utils/server/api";
import { StatusService } from "@/server/v1/modules/status/status.service";
import { HTTPContext } from "@/types/server/env.types";
import { AppInstallationInterface } from "@/types/status.types";

const handleGetStatusInstall = async (c: HTTPContext) => {
  const data = await StatusService.getStatusInstall();

  return sendResponse<AppInstallationInterface>(c, {
    statusCode: 200,
    data,
    message: "success",
  });
};

export const StatusController = {
  handleGetStatusInstall,
};
