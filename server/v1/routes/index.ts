import status from "@/server/v1/modules/status/status.route";
import client from "@/server/v1/modules/client/client.route";
import { createRouter } from "@/utils/server/create-router";
import { RouteListItemInterface } from "@/types/server/api.types";
import themes from "@/server/v1/modules/themes/themes.route";

const v1Router = createRouter();

const routes: Array<RouteListItemInterface> = [
  {
    path: "/status",
    route: status,
  },
  {
    path: "/client",
    route: client,
  },
  {
    path: "/themes",
    route: themes,
  },
];

routes.forEach((route) => v1Router.route(route.path, route.route));

export default v1Router;
