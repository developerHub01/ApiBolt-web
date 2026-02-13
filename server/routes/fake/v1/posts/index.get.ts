import { defineEventHandler, getQuery } from "h3";
import { FAKE_POSTS_LIST } from "~~/server/constant/fake/posts";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: FAKE_POSTS_LIST.slice(start, end),
    meta: {
      total: FAKE_POSTS_LIST.length,
      page,
      limit,
      totalPages: Math.ceil(FAKE_POSTS_LIST.length / limit),
    },
  };
});
