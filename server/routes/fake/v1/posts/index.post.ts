import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => ({
  data: {
    id: 999,
    message: "Post created (dummy)",
    received: await readBody(event),
  },
}));
