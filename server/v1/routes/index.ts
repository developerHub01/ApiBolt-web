import { RouteListItemInterface } from "@/types/server/api.types";
import { createRouter } from "@/utils/server/create-router";
import clientRouter from "@/server/v1/modules/client/client.route";

const v1Router = createRouter();

const routes: Array<RouteListItemInterface> = [
  {
    path: "/client",
    route: clientRouter,
  },
];

routes.forEach((route) => v1Router.route(route.path, route.route));

export default v1Router;
