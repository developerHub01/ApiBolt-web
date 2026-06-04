import v1Router from "@/server/v1/routes";
import { RouteListItemInterface } from "@/types/server/api.types";
import { globalErrorHandler } from "@/utils/server/api";
import { createRouter } from "@/utils/server/create-router";
import fakeRouterV1 from "@/server/fake/v1/fake.route";

const app = createRouter().basePath("/api");

const routes: Array<RouteListItemInterface> = [
  {
    path: "/v1",
    route: v1Router,
  },
  {
    path: "/fake/v1",
    route: fakeRouterV1,
  },
];

routes.forEach((route) => app.route(route.path, route.route));

app.notFound((c) => {
  return c.text("api not found", 404);
});

app.onError(globalErrorHandler);

export default app;
