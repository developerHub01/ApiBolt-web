import { Hono } from "hono";
import v1Router from "@/server/v1/routes";
import { globalErrorHandler } from "@/utils/server/api";

const app = new Hono().basePath("/api");

const routes: Array<{
  path: string;
  route: Hono;
}> = [
  {
    path: "/v1",
    route: v1Router,
  },
];

routes.forEach((route) => {
  app.route(route.path, route.route);
});

app.notFound((c) => {
  return c.text("api not found", 404);
});

app.onError(globalErrorHandler);

export default app;
