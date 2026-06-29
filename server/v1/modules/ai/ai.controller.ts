import { AskQueryBodyInterface } from "@/types/ai.types";
import { HTTPContext } from "@/types/server/env.types";
import { sendResponse } from "@/utils/server/api";

const API_KEY = process.env.ASK_AI_API_KEY;

const handleAskQuery = async (c: HTTPContext) => {
  const body = c.req.json<AskQueryBodyInterface>();

  console.log({
    API_KEY,
  });

  return sendResponse(c, {
    statusCode: 200,
    message: "AI message got successfully",
    data: body,
  });
};

export const AIController = {
  handleAskQuery,
};
