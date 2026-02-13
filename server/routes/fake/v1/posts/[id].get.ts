import { defineEventHandler } from "h3";
import { FAKE_POSTS_MAP } from "~~/server/constant/fake/posts";

export default defineEventHandler((event) => {
  const idParam = event.context.params?.id;
  if (!idParam)
    return {
      error: "Missing post id",
    };

  const id = parseInt(idParam);
  const post = FAKE_POSTS_MAP[id];

  if (!post)
    return {
      error: "Post not found",
    };

  return {
    data: post,
  };
});
