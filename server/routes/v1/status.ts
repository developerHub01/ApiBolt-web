import { Hono } from "hono";

const status = new Hono();

status.get("/", (c) =>
  c.json({
    message: "status route",
  }),
);

export default status;
