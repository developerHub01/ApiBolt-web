import { defineEventHandler } from "h3";
import { FAKE_CATEGORIES_MAP } from "~~/server/constant/fake/categories";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing category id",
    };

  const id = parseInt(idParam);
  const category = FAKE_CATEGORIES_MAP[id];
  if (!category)
    return {
      error: "Category not found",
    };

  return {
    data: category,
  };
});
