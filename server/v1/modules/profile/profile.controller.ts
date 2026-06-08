import { HTTPException } from "hono/http-exception";
import { sendResponse } from "@/utils/server/api";
import { HTTPContext } from "@/types/server/env.types";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";
import { FullProfileInterface } from "@/types/profiles.types";

const handleGetMyProfile = async (c: HTTPContext) => {
  const user = c.get("user")!;
  const id = user.id;

  const profile = await ProfileService.getFullProfileById(id);

  return sendResponse<FullProfileInterface | null>(c, {
    statusCode: id ? 200 : 404,
    message: `profile data${id ? " " : " not "}found`,
    data: profile,
  });
};

const handleGetProfileByUsername = async (c: HTTPContext) => {
  const userName = c.req.param("username");

  if (!userName)
    throw new HTTPException(400, {
      message: "Username is required",
    });

  const data = await ProfileService.getFullProfileByUserName(userName);

  return sendResponse<FullProfileInterface | null>(c, {
    statusCode: 200,
    message: "profile data found",
    data,
  });
};

export const ProfileController = {
  handleGetMyProfile,
  handleGetProfileByUsername,
};
