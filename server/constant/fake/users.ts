import { faker } from "~~/server/constant";
import { FakeUserInterface } from "~~/server/types/fake";

export const FAKE_USERS_MAP = Array.from(
  { length: 100 },
  (_, i) =>
    ({
      id: i + 1,
      username: faker.internet.username(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      role: faker.helpers.arrayElement(["user", "admin"]),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
    }) as FakeUserInterface,
).reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<number, FakeUserInterface>,
);

export const FAKE_USERS_LIST = Object.values(FAKE_USERS_MAP);
