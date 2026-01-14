import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { sendStandardResponse } from "~~/server/utils/response";
import { getSocialByUserId } from "~~/server/services/social.service";

export const getSocialLinksData = async (event: H3Event, id?: string) => {
  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "No user found",
    });

  const supabase = await serverSupabaseClient(event);
  const socialLinks = await getSocialByUserId(supabase, id);

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: `social data found`,
    data: socialLinks,
  });
};
