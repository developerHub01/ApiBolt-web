import { Hono } from "hono";
import status from "@/server/routes/v1/status";

const v1Router = new Hono();

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
  v1Router.route(route.path, route.route);
});

export default v1Router;
