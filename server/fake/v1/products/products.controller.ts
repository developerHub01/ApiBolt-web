import {
  FAKE_PRODUCTS_LIST,
  FAKE_PRODUCTS_MAP,
} from "@/server/constant/fake/products";
import { Context } from "hono";

const handleGetProducts = async (c: Context) => {
  const pageStr = c.req.query("page");
  const limitStr = c.req.query("limit");

  const page = parseInt(pageStr || "1", 10);
  const limit = parseInt(limitStr || "20", 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const total = FAKE_PRODUCTS_LIST.length;

  return c.json({
    data: FAKE_PRODUCTS_LIST.slice(start, end),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const handlePostProducts = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Product created (dummy response)",
      received,
    },
  });
};

const handleGetProductsById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing product id",
      },
      400,
    );

  const id = parseInt(idParam, 10);
  const product = FAKE_PRODUCTS_MAP[id];

  if (!product)
    return c.json(
      {
        error: "Product not found",
      },
      404,
    );

  return c.json({
    data: product,
  });
};

const handlePutProductsById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Product modified (dummy response)",
      received,
    },
  });
};

const handlePatchProductsById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Product modified (dummy response)",
      received,
    },
  });
};

const handleDeleteProductsById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing product id",
      },
      400,
    );

  return c.json({
    data: {
      id: parseInt(idParam),
      message: "Product deleted (dummy)",
    },
  });
};

export const FakeProductsController = {
  handleGetProducts,
  handlePostProducts,
  handleGetProductsById,
  handlePutProductsById,
  handlePatchProductsById,
  handleDeleteProductsById,
};
