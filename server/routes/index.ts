import { Hono } from "hono";
import v1Router from "@/server/routes/v1";

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

export default app;
