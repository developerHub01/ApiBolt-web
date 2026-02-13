import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing post id",
    };

  return {
    data: {
      id: parseInt(idParam),
      message: "Post updated (dummy)",
      received: await readBody(event),
    },
  };
});
