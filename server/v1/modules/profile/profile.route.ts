import { ProfileController } from "@/server/v1/modules/profile/profile.controller";
import { createRouter } from "@/utils/server/create-router";

const profileRouter = createRouter();

profileRouter.get(
  "/",
  ProfileController.handleGetMyProfile,
);

profileRouter.get("/:username", ProfileController.handleGetProfileByUsername);

export default profileRouter;
