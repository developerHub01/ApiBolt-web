import { RAGService } from "@/server/v1/modules/rag/rag.service";

/* wrapper function to handle the script execution and exit codes */
const runSeedScript = async (): Promise<void> => {
  try {
    console.log("Starting vector DB seeding process...");

    /* call the main seeding function from our service */
    await RAGService.seedDocsVectorDB();

    console.log("Vector DB seeding completed successfully.");
    /* exit with 0 to tell the terminal everything is good */
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed vector DB:", error);
    /* exit with 1 to tell the terminal or CI pipeline it failed */
    process.exit(1);
  }
};

runSeedScript();
