import { faker } from "~~/server/constant";
import { FakeProductInterface } from "~~/server/types/fake";

export const FAKE_PRODUCTS_MAP = Array.from(
  { length: 80 },
  (_, i) =>
    ({
      id: i + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(
        faker.commerce.price({
          min: 10,
          max: 2000,
        }),
      ),
      stock: faker.number.int({
        min: 0,
        max: 500,
      }),
      rating: Number(
        faker.number.float({
          min: 1,
          max: 5,
          fractionDigits: 1,
        }),
      ),
      thumbnail: faker.image.urlPicsumPhotos(),
      createdAt: faker.date.recent().toISOString(),
    }) as FakeProductInterface,
).reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<number, FakeProductInterface>,
);

export const FAKE_PRODUCTS_LIST = Object.values(FAKE_PRODUCTS_MAP);
