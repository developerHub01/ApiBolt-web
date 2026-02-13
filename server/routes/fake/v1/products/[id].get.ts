import { defineEventHandler } from "h3";
import { FAKE_PRODUCTS_MAP } from "~~/server/constant/fake/products";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing product id",
    };

  const id = parseInt(idParam);
  const product = FAKE_PRODUCTS_MAP[id];
  if (!product)
    return {
      error: "Product not found",
    };

  return {
    data: product,
  };
});
