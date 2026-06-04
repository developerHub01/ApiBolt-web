import { ProfileController } from "@/server/v1/modules/profile/profile.controller";
import { createRouter } from "@/utils/server/create-router";

const profileRouter = createRouter();

profileRouter.get("/:username", ProfileController.handleReportAppInstall);

export default profileRouter;
