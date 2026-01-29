import { serverSupabaseClient } from "#supabase/server";
import { getUserIdFromUserName } from "~~/server/services/profile.service";
import { getFullProfileMetaDataById } from "~~/server/utils/profile.helper";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const userName = getRouterParam(event, "username")!;
  const id = await getUserIdFromUserName(supabase, userName);
  return getFullProfileMetaDataById(event, id ?? undefined);
});
