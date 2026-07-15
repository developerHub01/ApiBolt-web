import { tool } from "ai";
import { z } from "zod";
import { RAGService } from "@/server/v1/modules/rag/rag.service";

export const searchDocsTool = tool({
  description:
    "Searches the APIBolt knowledge base for documentation. Use this for ANY question about APIBolt features, configuration, or technical details. If the user asks about something not in the APIBolt docs, this tool will return no results, and you must inform the user you cannot answer.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "A concise search query focusing on the specific APIBolt feature or task. Infer the correct feature name even if the user makes typos.",
      ),
  }),
  strict: true,
  execute: async ({ query }: { query: string }) => {
    const context = await RAGService.retriveMatchedDocsContext({
      query,
      topK: 3,
      matchThreshold: 0.4,
    });

    return context;
  },
});

export const done = tool({
  description:
    "Call this tool when you have the final answer and no more searches are needed.",
  inputSchema: z.object({}),
  execute: async () => ({
    status: "finished",
  }),
});
