import { createRouter } from "@/utils/server/create-router";
import { FakeOrdersController } from "@/server/fake/v1/orders/orders.controller";

const fakeOrders = createRouter();

fakeOrders.get("/", FakeOrdersController.handleGetOrders);

fakeOrders.get("/:id", FakeOrdersController.handleGetOrdersById);
fakeOrders.put("/:id", FakeOrdersController.handlePutOrdersById);
fakeOrders.patch("/:id", FakeOrdersController.handlePatchOrdersById);
fakeOrders.delete("/:id", FakeOrdersController.handleDeleteOrdersById);

export default fakeOrders;
