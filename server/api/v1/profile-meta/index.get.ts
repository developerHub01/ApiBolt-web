import { checkUser } from "~~/server/utils/auth";
import { getFullProfileMetaDataById } from "~~/server/utils/profile.helper";

export default defineEventHandler(async (event) => {
  const user = await checkUser(event);
  return getFullProfileMetaDataById(event, user?.id);
});
