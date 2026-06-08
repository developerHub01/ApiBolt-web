import { ClientController } from "@/server/v1/modules/client/client.controller";
import { createRouter } from "@/utils/server/create-router";

const clientRouter = createRouter();

clientRouter.post(
  "/app-install/report",
  ClientController.handleReportAppInstall,
);

clientRouter.get(
  "/themes/details/:id",
  ClientController.handleGetThemeDetailsById,
);

clientRouter.get("/themes/meta", ClientController.handleGetThemeMeta);

clientRouter.post("/themes/install", ClientController.handleThemeInstall);

export default clientRouter;
