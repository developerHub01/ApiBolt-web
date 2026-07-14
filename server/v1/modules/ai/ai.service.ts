import { prisma } from "@/db/client";
import { generateDocsEmbeddedData } from "@/utils/server/ai/embedding.utils";
import { Prisma } from "@/prisma/generated/prisma/client";

const createDocsVectorDB = async () => {
  const docsEmbeddingsMap = await generateDocsEmbeddedData();

  await prisma.$transaction(async (tx) => {
    for (const [path, { chunks, embeddings }] of Object.entries(
      docsEmbeddingsMap,
    )) {
      if (!chunks.length) continue;

      /* creating document */
      const document = await tx.document.create({
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
        INSERT INTO public.doc_chunk (document_id, section, content, embedding)
        VALUES ${Prisma.join(insertValues, ", ")}
      `;
    }
  });
};

const flushDocsVectorDB = async () => await prisma.document.deleteMany({});

const seedDocsVectorDB = async () => {
  await AIService.flushDocsVectorDB();
  await AIService.createDocsVectorDB();
};

export const AIService = {
  createDocsVectorDB,
  flushDocsVectorDB,
  seedDocsVectorDB,
};
