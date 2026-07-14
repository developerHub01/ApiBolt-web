import { embedMany } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { AI_EMBEDDING_API_KEY } from "@/constant/ai.constant";
import { handleReadDocs } from "@/utils/server/ai/docs.utils";
import {
  processMarkdownForRAG,
  RAGChunk,
} from "@/utils/server/ai/markdown.utils";

const google = createGoogle({
  apiKey: AI_EMBEDDING_API_KEY[0],
});

export const generateDocsEmbeddedData = async () => {
  const documentsMap = await handleReadDocs();
  const embeddedDocs: Record<
    string,
    {
      chunks: Array<RAGChunk>;
      embeddings: Array<Array<number>>;
    }
  > = {};

  for (const [path, content] of Object.entries(documentsMap)) {
    const chunks = await processMarkdownForRAG({
      markdown: content,
      config: {
        maxChunkSize: 1000,
        chunkOverlap: 200,
      },
    });

    if (!chunks.length) continue;

    const { embeddings } = await embedMany({
      model: google.embedding("gemini-embedding-001"),
      values: chunks.map((chunk: RAGChunk) => chunk.pageContent),
      providerOptions: {
        google: {
          outputDimensionality: 1536,
        },
      },
    });

    embeddedDocs[path] = {
      chunks,
      embeddings,
    };
  }

  return embeddedDocs;
};
