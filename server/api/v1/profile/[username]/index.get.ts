import { getProfileData } from "~~/server/utils/profile.helper";

export default defineEventHandler(async (event) => {
  const userName = getRouterParam(event, "username");
  return getProfileData(event, userName);
});
