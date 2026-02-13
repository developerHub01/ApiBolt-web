import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing user id",
    };

  const id = parseInt(idParam);
  const body = await readBody(event);

  return {
    data: {
      id,
      message: "User updated partially (dummy response)",
      received: body,
    },
  };
});
