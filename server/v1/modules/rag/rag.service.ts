import { prisma } from "@/db/client";
import {
  generateDocsEmbeddedData,
  generateEmbeddQuery,
} from "@/utils/server/ai/embedding.utils";
import { Prisma } from "@/prisma/generated/prisma/client";
import { SITE_URL } from "@/constant/index.constant";

interface MatchDocumentResult {
  chunk_id: string;
  section: string;
  content: string;
  document_title: string;
  document_path: string;
  similarity: number;
}

const createDocsVectorDB = async () => {
  const docsEmbeddingsMap = await generateDocsEmbeddedData();

  await prisma.$transaction(async (tx) => {
    for (const [path, { chunks, embeddings }] of Object.entries(
      docsEmbeddingsMap,
    )) {
      if (!chunks.length) continue;

      /* creating document */
      const document = await tx.documents.create({
        data: {
          path,
          title: chunks[0]?.metadata.sectionHeader || path,
        },
      });

      /* creating chunk data matrix */
      const insertValues = chunks.map((chunk, index) => {
        const embJson = JSON.stringify(embeddings[index]);
        return Prisma.sql`(
            ${document.id}::uuid, 
            ${chunk.metadata.sectionHeader}, 
            ${chunk.pageContent}, ${embJson}::vector
          )`;
      });

      /* creating chunk */
      await tx.$executeRaw`
        INSERT INTO public.doc_chunks (
          document_id, 
          section, 
          content, 
          embedding
        )
        VALUES ${Prisma.join(insertValues, ", ")}
      `;
    }
  });
};

const flushDocsVectorDB = async () => await prisma.documents.deleteMany({});

const seedDocsVectorDB = async () => {
  await RAGService.flushDocsVectorDB();
  await RAGService.createDocsVectorDB();
};

const retriveMatchedDocsContext = async ({
  query,
  topK,
  matchThreshold,
}: {
  query: string;
  topK?: number;
  matchThreshold?: number;
}) => {
  const embedding = await generateEmbeddQuery({
    query,
  });

  const results = await prisma.$queryRaw<Array<MatchDocumentResult>>`
    SELECT * FROM match_documents(
      ${JSON.stringify(embedding)}::vector(1536),
      ${matchThreshold ?? 0.7}::float,
      ${topK ?? 5}::int
    )
  `;

  if (!results || !results.length)
    return "No relevant documentation found for this query.";

  return results.map(
    (doc) =>
      `### [${doc.document_title}] (${doc.document_path}) - ${doc.section}\n${doc.content}\n\nSource: ${SITE_URL}/${doc.document_path}`,
  ).join(`\n\n
\n\n`);
};

export const RAGService = {
  createDocsVectorDB,
  flushDocsVectorDB,
  seedDocsVectorDB,
  retriveMatchedDocsContext,
};
