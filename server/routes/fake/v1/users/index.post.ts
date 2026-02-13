import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    data: {
      id: 999,
      message: "User created (dummy response)",
      received: body,
    },
  };
});
