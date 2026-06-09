import { createRouter } from "@/utils/server/create-router";
import { FakeStatusController } from "@/server/fake/v1/status/status.controller";

const fakeStatus = createRouter();

fakeStatus.get("/", FakeStatusController.handleGetStatus);

export default fakeStatus;
