import { FakeCategoryInterface } from "~~/server/types/fake";

export const FAKE_CATEGORIES_LIST: Array<FakeCategoryInterface> = [
  {
    id: 1,
    name: "Tech",
    description: "All tech related posts",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Life",
    description: "Life experiences and stories",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Dev",
    description: "Development tutorials and tips",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "API",
    description: "API related content",
    createdAt: new Date().toISOString(),
  },
];

export const FAKE_CATEGORIES_MAP = FAKE_CATEGORIES_LIST.reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<number, FakeCategoryInterface>,
);
