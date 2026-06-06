import { ProfileController } from "@/server/v1/modules/profile/profile.controller";
import { createRouter } from "@/utils/server/create-router";
import { AuthMiddleware } from "@/server/v1/middlwares/auth";

const profileRouter = createRouter();

profileRouter.get(
  "/",
  AuthMiddleware.checkUser,
  ProfileController.handleGetMyProfile,
);

profileRouter.get("/:username", ProfileController.handleGetProfileByUsername);

export default profileRouter;
