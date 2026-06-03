import { createRouter } from "@/utils/server/create-router";
import { ThemesController } from "./themes.controller";

const themes = createRouter();

themes.post("/publis", ThemesController.handlePublishTheme);

export default themes;
