import { faker } from "~~/server/constant";
import { FakeOrderInterface } from "~~/server/types/fake";

export const FAKE_ORDERS_MAP = Array.from(
  { length: 60 },
  (_, i) =>
    ({
      id: i + 1,
      reference: faker.string.alphanumeric(10).toUpperCase(),
      amount: faker.number.float({
        min: 50,
        max: 5000,
      }),
      currency: faker.helpers.arrayElement(["USD", "EUR", "BDT"]),
      status: faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
      createdAt: faker.date.recent().toISOString(),
    }) as FakeOrderInterface,
).reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<number, FakeOrderInterface>,
);

export const FAKE_ORDERS_LIST = Object.values(FAKE_ORDERS_MAP);
