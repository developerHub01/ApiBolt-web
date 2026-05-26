import { Hono } from "hono";
import status from "@/server/routes/status";

const app = new Hono().basePath("/api");

const routes: Array<{
  path: string;
  route: Hono;
}> = [
  {
    path: "/status",
    route: status,
  },
];

routes.forEach((route) => {
  app.route(route.path, route.route);
});

export default app;
