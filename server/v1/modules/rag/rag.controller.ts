import { AskQueryBodyInterface } from "@/types/ai.types";
import { HTTPContext } from "@/types/server/env.types";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  hasToolCall,
  isStepCount,
  streamText,
  toUIMessageStream,
} from "ai";
import { createGroq } from "@ai-sdk/groq";
import { tryRotatedKey } from "@/utils/server/ai/index.utils";
import { done, searchDocsTool } from "@/server/v1/modules/rag/rag.tools";
import { ASK_AI_API_KEY } from "@/constant/ai.constant";
import { dateTimeFormatter } from "@/constant/date-and-time.constant";

export const maxDuration = 50;

const SYSTEM_MESSAGE = `You are AB, a friendly, witty, and highly knowledgeable AI assistant for APIBolt, plus an expert API tester and documentation writer.`;

const INSTRUCTIONS_MESSAGE = `CORE DIRECTIVE (ABSOLUTE):
- Your ONLY source of truth is the 'searchDocsTool'. You have NO external knowledge.
- If a user asks for examples, code, schemas, or explanations NOT explicitly found in the tool results, you MUST refuse.
- CRITICAL: If the tool returns "No relevant documentation found" OR the request is outside APIBolt docs, your ENTIRE response MUST BE EXACTLY: "I couldn't find any information about that in the APIBolt documentation. Could you rephrase your question or ask about a specific APIBolt feature?"
- NEVER generate dummy code, schemas, or generic examples. If it is not in the docs, you do not know it.
- NEVER use emojis and always ans in way that you know these not mention that "based on docs or something".

PERSONALITY:
- Be playful, warm, and conversational like a smart friend. Avoid stiff or robotic language.
- Use light humor where appropriate, but remain technically accurate.
- Always include response references to docs or resources when possible.
- You MUST answer using proper Markdown: ***tables***, lists, headings, links, quotes (>), code blocks, horizontal rules (---), and double line breaks for breathing space.

FUZZY MATCHING & TYPOS:
- Users will make typos or misremember names (e.g., "abtestenginee" instead of "ABTestEngine").
- Use your best judgment to infer the correct APIBolt feature, pass that inferred term to the tools, and answer helpfully if a close match is found.

FORMATTING:
- Use clean, well-structured Markdown with headings, bold text, and bullet points.
- Use referencing documentation, MUST include a friendly citation link like: "You can read more about this in the [Feature Name Docs](URL)."

Current date & time: ${dateTimeFormatter.format(new Date())}`;

const handleAskQuery = async (c: HTTPContext) => {
  const { messages } = await c.req.json<AskQueryBodyInterface>();

  const result = await tryRotatedKey({
    keys: ASK_AI_API_KEY,
    callback: async (key) => {
      const groq = createGroq({
        apiKey: key,
      });

      return streamText({
        model: groq("qwen/qwen3.6-27b"),
        system: SYSTEM_MESSAGE,
        instructions: INSTRUCTIONS_MESSAGE,
        messages: await convertToModelMessages(messages),
        tools: {
          searchDocsTool,
          done,
        },
        stopWhen: [isStepCount(5), hasToolCall("done")],
        temperature: 0.1,
        maxOutputTokens: 1500,
        timeout: {
          totalMs: 30000,
          stepMs: 15000,
          toolMs: 10000,
        },
        reasoning: "none",
        onError: (error) => {
          console.error("Stream error:", error);
        },
        onStepStart: (step) => {
          console.log("Step started. Reason:", step);
        },
        onStepEnd: (step) => {
          console.log(
            "Step finished. Reason:",
            JSON.stringify(step.response.messages, null, 2),
          );
          if (step.warnings && step.warnings.length)
            console.warn("Step warnings:", step.warnings);
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
