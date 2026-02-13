import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam) return { error: "Missing post id" };

  return {
    data: {
      id: parseInt(idParam as string),
      message: "Post deleted (dummy)",
    },
  };
});
