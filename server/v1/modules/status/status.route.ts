import { StatusController } from "@/server/v1/modules/status/status.controller";
import { createRouter } from "@/utils/server/create-router";

const statusRouter = createRouter();

statusRouter.get("/installs", StatusController.handleGetStatusInstall);

export default statusRouter;
