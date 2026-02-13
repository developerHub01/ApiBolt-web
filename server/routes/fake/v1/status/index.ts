import { defineEventHandler } from "h3";
import { FAKE_STATUS } from "~~/server/constant/fake/status";

export default defineEventHandler(() => ({
  data: FAKE_STATUS,
}));
