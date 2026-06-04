import { RouteListItemInterface } from "@/types/server/api.types";
import { createRouter } from "@/utils/server/create-router";
import fakeCategories from "@/server/fake/v1/categories/categories.route";
import fakeOrders from "@/server/fake/v1/orders/orders.route";
import fakePosts from "@/server/fake/v1/posts/posts.route";
import fakeProducts from "@/server/fake/v1/products/products.route";
import fakeStatus from "@/server/fake/v1/status/status.route";

const fakeRouterV1 = createRouter();

const routes: Array<RouteListItemInterface> = [
  {
    path: "/categories",
    route: fakeCategories,
  },
  {
    path: "/orders",
    route: fakeOrders,
  },
  {
    path: "/posts",
    route: fakePosts,
  },
  {
    path: "/products",
    route: fakeProducts,
  },
  {
    path: "/status",
    route: fakeStatus,
  },
];

routes.forEach((route) => fakeRouterV1.route(route.path, route.route));

export default fakeRouterV1;
