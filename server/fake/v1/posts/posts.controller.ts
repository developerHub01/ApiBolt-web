import { Context } from "hono";
import { FAKE_POSTS_LIST, FAKE_POSTS_MAP } from "@/server/constant/fake/posts";

const handleGetPosts = async (c: Context) => {
  const pageStr = c.req.query("page");
  const limitStr = c.req.query("limit");

  const page = parseInt(pageStr || "1", 10);
  const limit = parseInt(limitStr || "20", 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const total = FAKE_POSTS_LIST.length;

  return c.json({
    data: FAKE_POSTS_LIST.slice(start, end),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const handlePostPosts = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Post created (dummy)",
      received,
    },
  });
};

const handleGetPostsById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing category id",
      },
      400,
    );

  const id = parseInt(idParam, 10);
  const category = FAKE_POSTS_MAP[id];

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

const handlePutPostsById = async (c: Context) => {
  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: 999,
      message: "Post updated (dummy)",
      received,
    },
  });
};

const handlePatchPostsById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing post id",
      },
      400,
    );

  const received = await c.req.json().catch(() => null);

  return c.json({
    data: {
      id: parseInt(idParam),
      message: "Post updated (dummy)",
      received,
    },
  });
};

const handleDeletePostsById = async (c: Context) => {
  const idParam = c.req.param("id");

  if (!idParam)
    return c.json(
      {
        error: "Missing post id",
      },
      400,
    );

  return c.json({
    data: {
      id: parseInt(idParam),
      message: "Post deleted (dummy)",
    },
  });
};

export const FakePostsController = {
  handleGetPosts,
  handlePostPosts,
  handleGetPostsById,
  handlePutPostsById,
  handlePatchPostsById,
  handleDeletePostsById,
};
