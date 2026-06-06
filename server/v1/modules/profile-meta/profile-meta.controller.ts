import { HTTPException } from "hono/http-exception";
import { sendResponse } from "@/utils/server/api";
import { HTTPContext } from "@/types/server/env.types";
import { ProfileMetaService } from "@/server/v1/modules/profile-meta/profile-meta.service";
import { ProfileMetaInterface } from "@/types/profile.types";

const handleGetProfileMeta = async (c: HTTPContext) => {
  const user = c.get("user");

  if (!user || !user?.id)
    throw new HTTPException(400, {
      message: "No user found",
    });

  const id = user.id;
  const profile = await ProfileMetaService.getProfileMetaById(id);

  return sendResponse<ProfileMetaInterface | null>(c, {
    statusCode: id ? 200 : 404,
    message: `profile data${id ? " " : " not "}found`,
    data: profile,
  });
};

const handleGetProfileMetaByUsername = async (c: HTTPContext) => {
  const userName = c.req.param("username");

  if (!userName)
    throw new HTTPException(400, {
      message: "Username is required",
    });

  const id = await ProfileMetaService.getUserIdFromUserName(userName);

  if (!id)
    throw new HTTPException(400, {
      message: "No user found",
    });

  const profile = await ProfileMetaService.getProfileMetaById(id);

  return sendResponse<ProfileMetaInterface | null>(c, {
    statusCode: id ? 200 : 404,
    message: `profile data${id ? " " : " not "}found`,
    data: profile,
  });
};

export const ProfileMetaController = {
  handleGetProfileMeta,
  handleGetProfileMetaByUsername,
};
