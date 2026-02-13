import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => ({
  data: {
    id: 999,
    message: "Category modified (dummy response)",
    received: await readBody(event),
  },
}));
