import { defineEventHandler } from "h3";
import { FAKE_ORDERS_MAP } from "~~/server/constant/fake/orders";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing order id",
    };

  const id = parseInt(idParam);
  const order = FAKE_ORDERS_MAP[id];
  if (!order)
    return {
      error: "Order not found",
    };

  return {
    data: order,
  };
});
