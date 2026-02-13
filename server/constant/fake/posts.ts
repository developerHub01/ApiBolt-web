import { faker } from "~~/server/constant";
import { FakePostInterface } from "~~/server/types/fake";

export const FAKE_POSTS_MAP = Array.from(
  { length: 200 },
  (_, i) =>
    ({
      id: i + 1,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      tags: faker.helpers.arrayElements(
        ["tech", "life", "backend", "frontend", "dev", "api"],
        {
          min: 1,
          max: 3,
        },
      ),
      reactions: faker.number.int({
        min: 0,
        max: 1000,
      }),
      createdAt: faker.date.recent().toISOString(),
    }) as FakePostInterface,
).reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<number, FakePostInterface>,
);

export const FAKE_POSTS_LIST = Object.values(FAKE_POSTS_MAP);
