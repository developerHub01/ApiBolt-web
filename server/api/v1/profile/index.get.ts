import { checkUser } from "~~/server/utils/auth";
import { getProfileData } from "~~/server/utils/profile.helper";

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  return getProfileData(event, user?.user_metadata?.user_name);
});
