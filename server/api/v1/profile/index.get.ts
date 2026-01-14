import { checkUser } from "~~/server/utils/auth";
import { getFullProfileDataById } from "~~/server/utils/profile.helper";

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  return getFullProfileDataById(event, user?.id);
});
