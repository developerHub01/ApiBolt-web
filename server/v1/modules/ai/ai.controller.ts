import { AskQueryBodyInterface } from "@/types/ai.types";
import { HTTPContext } from "@/types/server/env.types";
import { sendResponse } from "@/utils/server/api";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const API_KEY = process.env.ASK_AI_API_KEY!;

const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

const handleAskQuery = async (c: HTTPContext) => {
  const { message } = await c.req.json<AskQueryBodyInterface>();

  const { text } = await generateText({
    model: google("gemini-3-flash-preview"),
    prompt: message,
  });

  return sendResponse(c, {
    statusCode: 200,
    message: "AI message got successfully",
    data: text,
  });
};

export const AIController = {
  handleAskQuery,
};
