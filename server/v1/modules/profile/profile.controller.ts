import { HTTPException } from "hono/http-exception";
import { sendResponse } from "@/utils/server/api";
import { HTTPContext } from "@/types/server/env.types";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";
import { FullProfileInterface } from "@/types/server/profiles.types";

const handleReportAppInstall = async (c: HTTPContext) => {
  const userName = c.req.param("username");

  if (!userName)
    throw new HTTPException(400, {
      message: "Username is required",
    });

  const id = await ProfileService.getUserIdFromUserName(userName);

  if (!id)
    throw new HTTPException(404, {
      message: "No user found",
    });

  const data = await ProfileService.getFullProfileById(id);

  return sendResponse<FullProfileInterface | null>(c, {
    statusCode: 200,
    message: "profile data found",
    data,
  });
};

export const ProfileController = {
  handleReportAppInstall,
};
