import { createRouter } from "@/utils/server/create-router";
import { AIController } from "@/server/v1/modules/rag/rag.controller";

const aiRouter = createRouter();

aiRouter.post("/ask-query", AIController.handleAskQuery);

export default aiRouter;
