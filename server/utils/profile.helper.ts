import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import {
  getFullProfileById,
  getProfileByUserName,
  getProfileMetaById,
} from "~~/server/services/profile.service";
import { sendStandardResponse } from "~~/server/utils/response";

export const getProfileData = async (event: H3Event, userName?: string) => {
  if (!userName)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "No user found",
    });

  const supabase = await serverSupabaseClient(event);
  const profile = await getProfileByUserName(supabase, userName);

  return sendStandardResponse(event, {
    success: true,
    statusCode: profile ? 200 : 404,
    message: `profile data${profile ? " " : " not "}found`,
    data: profile,
  });
};

export const getFullProfileDataById = async (event: H3Event, id?: string) => {
  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "No user found",
    });

  const supabase = await serverSupabaseClient(event);
  const profile = await getFullProfileById(supabase, id);

  return sendStandardResponse(event, {
    success: true,
    statusCode: id ? 200 : 404,
    message: `profile data${id ? " " : " not "}found`,
    data: profile,
  });
};

export const getFullProfileMetaDataById = async (event: H3Event, id?: string) => {
  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "No user found",
    });

  const supabase = await serverSupabaseClient(event);
  const profile = await getProfileMetaById(supabase, id);

  return sendStandardResponse(event, {
    success: true,
    statusCode: id ? 200 : 404,
    message: `profile data${id ? " " : " not "}found`,
    data: profile,
  });
};
