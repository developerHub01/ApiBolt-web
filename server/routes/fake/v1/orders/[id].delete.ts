import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing order id",
    };

  return {
    data: {
      id: parseInt(idParam),
      message: "Order deleted (dummy)",
    },
  };
});
