import { Context } from "hono";
import {
  FAKE_ORDERS_LIST,
  FAKE_ORDERS_MAP,
} from "@/server/constant/fake/orders";

const handleGetOrders = async (c: Context) => {
  const pageStr = c.req.query("page");
  const limitStr = c.req.query("limit");

  const page = parseInt(pageStr || "1", 10);
  const limit = parseInt(limitStr || "20", 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const total = FAKE_ORDERS_LIST.length;

  return c.json({
    data: FAKE_ORDERS_LIST.slice(start, end),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const handleGetOrdersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing order id",
      },
      400,
    );

  const id = parseInt(idParam, 10);
  const order = FAKE_ORDERS_MAP[id];

  if (!order)
    return c.json(
      {
        error: "Order not found",
      },
      404,
    );

  return c.json({
    data: order,
  });
};

const handlePutOrdersById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Order modified (dummy response)",
      received,
    },
  });
};

const handlePatchOrdersById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Order modified (dummy response)",
      received,
    },
  });
};

const handleDeleteOrdersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing order id",
      },
      400,
    );

  return c.json({
    data: {
      id: parseInt(idParam),
      message: "Order deleted (dummy)",
    },
  });
};

export const FakeOrdersController = {
  handleGetOrders,
  handleGetOrdersById,
  handlePutOrdersById,
  handlePatchOrdersById,
  handleDeleteOrdersById,
};
