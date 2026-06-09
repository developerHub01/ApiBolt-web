import { Context } from "hono";
import { FAKE_STATUS } from "@/server/constant/fake/status";

const handleGetStatus = async (c: Context) => {
  return c.json({
    data: FAKE_STATUS,
  });
};

export const FakeStatusController = {
  handleGetStatus,
};
