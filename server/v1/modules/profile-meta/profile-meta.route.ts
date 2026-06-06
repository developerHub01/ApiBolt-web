import { ProfileMetaController } from "@/server/v1/modules/profile-meta/profile-meta.controller";
import { createRouter } from "@/utils/server/create-router";
import { AuthMiddleware } from "@/server/v1/middlwares/auth";

const profileMetaRouter = createRouter();

profileMetaRouter.get(
  "/",
  AuthMiddleware.checkUser,
  ProfileMetaController.handleGetProfileMeta,
);

profileMetaRouter.get(
  "/:username",
  ProfileMetaController.handleGetProfileMetaByUsername,
);

export default profileMetaRouter;
