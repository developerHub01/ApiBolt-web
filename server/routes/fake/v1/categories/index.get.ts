import { defineEventHandler } from "h3";
import { FAKE_CATEGORIES_LIST } from "~~/server/constant/fake/categories";

export default defineEventHandler(() => ({
  data: FAKE_CATEGORIES_LIST,
}));
