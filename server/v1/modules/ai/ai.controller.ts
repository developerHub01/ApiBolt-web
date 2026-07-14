import { AskQueryBodyInterface } from "@/types/ai.types";
import { HTTPContext } from "@/types/server/env.types";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  tool,
  toUIMessageStream,
} from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tryRotatedKey } from "@/utils/server/ai/index.utils";
import { z } from "zod";
import { getKeyboardShortcutDocs } from "@/server/v1/modules/ai/ai.tools";
import { ASK_AI_API_KEY } from "@/constant/ai.constant";

// const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

export const maxDuration = 30;

const handleAskQuery = async (c: HTTPContext) => {
  const { messages } = await c.req.json<AskQueryBodyInterface>();

  const result = await tryRotatedKey({
    keys: ASK_AI_API_KEY,
    callback: async (key) => {
      const groq = createGroq({
        apiKey: key,
      });

      return streamText({
        model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
        instructions: "You are a helpful assistant.",
        messages: await convertToModelMessages(messages),
        tools: {
          keyboardShortcuts: tool({
            description:
              "Retrieve comprehensive keyboard shortcuts documentation for APIBolt. Use this when users ask about keyboard shortcuts, key bindings, hotkeys, or how to perform actions using keyboard combinations for the desktop app. Returns complete reference including navigation, tab management, UI toggles, search, code editing, and zoom shortcuts. Show them in table format.",
            inputSchema: z.object({
              query: z
                .string()
                .optional()
                .describe(
                  "Optional query to filter or search for specific shortcuts (e.g., 'tab shortcuts', 'navigation shortcuts'). Leave empty to get all shortcuts.",
                ),
            }),
            execute: async () => {
              const content = await getKeyboardShortcutDocs();
              return content;
            },
          }),
        },
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
