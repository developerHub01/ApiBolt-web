import { createRouter } from "@/utils/server/create-router";
import { FakeProductsController } from "@/server/fake/v1/products/products.controller";

const fakeProducts = createRouter();

fakeProducts.get("/", FakeProductsController.handleGetProducts);
fakeProducts.post("/", FakeProductsController.handlePostProducts);

fakeProducts.get("/:id", FakeProductsController.handleGetProductsById);
fakeProducts.put("/:id", FakeProductsController.handlePutProductsById);
fakeProducts.patch("/:id", FakeProductsController.handlePatchProductsById);
fakeProducts.delete("/:id", FakeProductsController.handleDeleteProductsById);

export default fakeProducts;
