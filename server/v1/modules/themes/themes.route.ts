import { createRouter } from "@/utils/server/create-router";
import { ThemesController } from "@/server/v1/modules/themes/themes.controller";

const themesRouter = createRouter();

themesRouter.post("/publish", ThemesController.handlePublishTheme);

export default themesRouter;
