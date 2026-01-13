import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { getProfileByUsername } from "~~/server/services/profile.service";
import { sendStandardResponse } from "~~/server/utils/response";

export const getProfileData = async (event: H3Event, userName?: string) => {
  if (!userName)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "No user found",
    });

  const supabase = await serverSupabaseClient(event);
  const profile = await getProfileByUsername(supabase, userName);

  return sendStandardResponse(event, {
    success: true,
    statusCode: profile ? 200 : 404,
    message: `profile data${profile ? " " : " not "}found`,
    data: profile,
  });
};
