import { defineEventHandler } from "h3";
import { FAKE_USERS_MAP } from "~~/server/constant/fake/users";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;

  if (!idParam)
    return {
      error: "Missing user id parameter",
    };

  const id = parseInt(idParam);
  const user = FAKE_USERS_MAP[id];

  if (!user)
    return {
      error: "User not found",
    };

  return {
    data: user,
  };
});
