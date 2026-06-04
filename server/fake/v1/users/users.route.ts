import { createRouter } from "@/utils/server/create-router";
import { FakeUsersController } from "@/server/fake/v1/users/users.controller";

const fakeUsers = createRouter();

fakeUsers.get("/", FakeUsersController.handleGetUsers);
fakeUsers.post("/", FakeUsersController.handlePostUsers);

fakeUsers.get("/:id", FakeUsersController.handleGetUsersById);
fakeUsers.put("/:id", FakeUsersController.handlePutUsersById);
fakeUsers.patch("/:id", FakeUsersController.handlePatchUsersById);
fakeUsers.delete("/:id", FakeUsersController.handleDeleteUsersById);

export default fakeUsers;
