import { Context } from "hono";
import {
  FAKE_CATEGORIES_LIST,
  FAKE_CATEGORIES_MAP,
} from "@/server/constant/fake/categories";

const handleGetCategories = async (c: Context) => {
  return c.json({
    data: FAKE_CATEGORIES_LIST,
  });
};

const handlePostCategories = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Category created (dummy response)",
      received,
    },
  });
};

const handleGetCategoriesById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing category id",
      },
      400,
    );

  const id = parseInt(idParam, 10);
  const category = FAKE_CATEGORIES_MAP[id];

  if (!category)
    return c.json(
      {
        error: "Category not found",
      },
      404,
    );

  return c.json({
    data: category,
  });
};

const handlePutCategoriesById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Category modified (dummy response)",
      received,
    },
  });
};

const handlePatchCategoriesById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Category modified (dummy response)",
      received,
    },
  });
};

const handleDeleteCategoriesById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing category id",
      },
      400,
    );

  return c.json({
    data: {
      id: parseInt(idParam, 10),
      message: "Category deleted (dummy)",
    },
  });
};

export const FakeCategoriesController = {
  handleGetCategories,
  handlePostCategories,
  handleGetCategoriesById,
  handlePutCategoriesById,
  handlePatchCategoriesById,
  handleDeleteCategoriesById,
};
