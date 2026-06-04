import { createRouter } from "@/utils/server/create-router";
import { FakeCategoriesController } from "@/server/fake/v1/categories/categories.controller";

const fakeCategories = createRouter();

fakeCategories.get("/", FakeCategoriesController.handleGetCategories);
fakeCategories.post("/", FakeCategoriesController.handlePostCategories);


fakeCategories.get("/:id", FakeCategoriesController.handleGetCategoriesById);
fakeCategories.put("/:id", FakeCategoriesController.handlePutCategoriesById);
fakeCategories.patch("/:id", FakeCategoriesController.handlePatchCategoriesById);
fakeCategories.delete("/:id", FakeCategoriesController.handleDeleteCategoriesById);

export default fakeCategories;
