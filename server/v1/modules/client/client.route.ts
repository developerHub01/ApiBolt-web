import { ClientController } from "@/server/v1/modules/client/client.controller";
import { AuthMiddleware } from "@/server/v1/middlwares/auth";
import { createRouter } from "@/utils/server/create-router";

const client = createRouter();

client.post("/app-install/report", ClientController.handleReportAppInstall);

client.get("/themes/details/:id", ClientController.handleGetThemeDetailsById);

client.get(
  "/themes/meta",
  AuthMiddleware.checkUser,
  ClientController.handleGetThemeMeta,
);

client.post("/themes/install", ClientController.handleThemeInstall);

export default client;
