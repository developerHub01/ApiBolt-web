import { RouteListItemInterface } from "@/types/server/api.types";
import { createRouter } from "@/utils/server/create-router";
import statusRouter from "@/server/v1/modules/status/status.route";
import clientRouter from "@/server/v1/modules/client/client.route";
import themesRouter from "@/server/v1/modules/themes/themes.route";
import profileRouter from "@/server/v1/modules/profile/profile.route";

const v1Router = createRouter();

const routes: Array<RouteListItemInterface> = [
  {
    path: "/status",
    route: statusRouter,
  },
  {
    path: "/client",
    route: clientRouter,
  },
  {
    path: "/themes",
    route: themesRouter,
  },
  {
    path: "/profile",
    route: profileRouter,
  },
];

routes.forEach((route) => v1Router.route(route.path, route.route));

export default v1Router;
