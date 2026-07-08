import { AskQueryBodyInterface } from "@/types/ai.types";
import { HTTPContext } from "@/types/server/env.types";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tryRotatedKey } from "@/utils/server/ai/index.utils";

// const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY: Array<string> = (() => {
  try {
    return JSON.parse(process.env.ASK_AI_API_KEY!);
  } catch {
    return [];
  }
})();

export const maxDuration = 30;

const handleAskQuery = async (c: HTTPContext) => {
  const { messages } = await c.req.json<AskQueryBodyInterface>();

  const result = await tryRotatedKey({
    keys: API_KEY,
    callback: async (key) => {
      const groq = createGroq({
        apiKey: key,
      });

      return streamText({
        model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
        instructions: "You are a helpful assistant.",
        messages: await convertToModelMessages(messages),
      });
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
    }),
  });
};

export const AIController = {
  handleAskQuery,
};
