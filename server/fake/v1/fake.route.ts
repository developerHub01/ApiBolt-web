import { RouteListItemInterface } from "@/types/server/api.types";
import { createRouter } from "@/utils/server/create-router";
import fakeCategories from "@/server/fake/v1/categories/categories.route";

const fakeRouterV1 = createRouter();

const routes: Array<RouteListItemInterface> = [
  {
    path: "/categories",
    route: fakeCategories,
  },
];

routes.forEach((route) => fakeRouterV1.route(route.path, route.route));

export default fakeRouterV1;
