import { Context } from "hono";
import { FAKE_USERS_LIST, FAKE_USERS_MAP } from "@/server/constant/fake/users";

const handleGetUsers = async (c: Context) => {
  const pageStr = c.req.query("page");
  const limitStr = c.req.query("limit");

  const page = parseInt(pageStr || "1", 10);
  const limit = parseInt(limitStr || "20", 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const total = FAKE_USERS_LIST.length;

  return c.json({
    data: FAKE_USERS_LIST.slice(start, end),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const handlePostUsers = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "User created (dummy response)",
      received,
    },
  });
};

const handleGetUsersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing user id parameter",
      },
      400,
    );

  const id = parseInt(idParam, 10);
  const user = FAKE_USERS_MAP[id];

  if (!user)
    return c.json(
      {
        error: "User not found",
      },
      404,
    );

  return c.json({
    data: user,
  });
};

const handlePutUsersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing user id",
      },
      400,
    );

  const id = parseInt(idParam);
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id,
      message: "User replaced (dummy response)",
      received,
    },
  });
};

const handlePatchUsersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing user id",
      },
      400,
    );

  const id = parseInt(idParam);
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id,
      message: "User updated partially (dummy response)",
      received,
    },
  });
};

const handleDeleteUsersById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing user id",
      },
      400,
    );

  const id = parseInt(idParam);

  return c.json({
    data: {
      id,
      message: "User deleted (dummy response)",
    },
  });
};

export const FakeUsersController = {
  handleGetUsers,
  handlePostUsers,
  handleGetUsersById,
  handlePutUsersById,
  handlePatchUsersById,
  handleDeleteUsersById,
};
