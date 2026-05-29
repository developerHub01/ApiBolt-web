import { Context } from "hono";
import { sendResponse } from "@/utils/server/api";
import { StatusService } from "@/server/v1/modules/status/status.service";

const handleGetStatusInstall = async (c: Context) => {
  const data = await StatusService.getStatusInstall();

  return sendResponse(c, {
    statusCode: 200,
    data,
    message: "success",
  });
};

export const StatusController = {
  handleGetStatusInstall,
};
