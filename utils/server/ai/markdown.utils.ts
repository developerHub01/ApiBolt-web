import { fromMarkdown } from "mdast-util-from-markdown";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Root, Heading, RootContent } from "mdast";

interface RAGChunkMetadata {
  sectionHeader: string;
}

interface RAGChunk {
  pageContent: string;
  metadata: RAGChunkMetadata;
}

interface MarkdownSection {
  header: string;
  content: string;
}

interface ChunkConfig {
  maxChunkSize: number;
  chunkOverlap: number;
}

/* helper to get text out of ast node, handles nested stuff nicely */
const extractTextFromNode = (node: RootContent): string => {
  /* if node has value property and its string, just return it directly */
  if ("value" in node && typeof node.value === "string") return node.value;

  /* if it has children, we map over them and join with space */
  if ("children" in node && Array.isArray(node.children))
    return node.children.map(extractTextFromNode).join(" ");

  /* fallback to empty string if nothing matches */
  return "";
};

/* this is where we actually parse markdown to ast and group by headers */
const extractSectionsFromAST = (markdown: string): Array<MarkdownSection> => {
  /* get the full ast tree from markdown string */
  const tree: Root = fromMarkdown(markdown);
  const sections: Array<MarkdownSection> = [];

  /* default header if markdown starts without one */
  let currentHeader = "Introduction";
  let currentNodes: Array<RootContent> = [];

  /* flush function pushes accumulated nodes to sections and clears buffer */
  const flush = () => {
    if (currentNodes.length) {
      const text: string = currentNodes
        .map(extractTextFromNode)
        .join("\n\n")
        .trim();

      /* only push if there is actual text content */
      if (text.length)
        sections.push({
          header: currentHeader,
          content: text,
        });

      /* reset buffer for next section */
      currentNodes = [];
    }
  };

  /* loop through top level nodes only so we dont duplicate nested content */
  tree.children.forEach((node: RootContent) => {
    if (node.type === "heading") {
      /* found new header, so save previous section first */
      flush();
      currentHeader = (node as Heading).children
        .map(extractTextFromNode)
        .join(" ");
    } else {
      /* not a header, just add to current section buffer */
      currentNodes.push(node);
    }
  });

  /* make sure to flush the very last section after loop ends */
  flush();
  return sections;
};

/* main function that orchestrates the whole chunking flow */
const processMarkdownForRAG = async ({
  markdown,
  config,
}: {
  markdown: string;
  config: ChunkConfig;
}): Promise<Array<RAGChunk>> => {
  /* step 1: get all sections grouped by their headers */
  const sections: Array<MarkdownSection> = extractSectionsFromAST(markdown);
  const finalChunks: Array<RAGChunk> = [];

  /* step 2: setup langchain splitter for handling long sections */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: config.maxChunkSize,
    chunkOverlap: config.chunkOverlap,
  });

  /* step 3: process each section one by one */
  for (const section of sections) {
    const metadata: RAGChunkMetadata = {
      sectionHeader: section.header,
    };

    /* if section is small enough, we keep it as single chunk */
    if (section.content.length <= config.maxChunkSize)
      finalChunks.push({
        pageContent: section.content,
        metadata,
      });
    else {
      /* if its too long, we let langchain split it smartly by paragraphs */
      const subChunks: Array<string> = await textSplitter.splitText(
        section.content,
      );

      /* attach same header metadata to all sub chunks so context is not lost */
      subChunks.forEach((chunkText: string) => {
        finalChunks.push({
          pageContent: chunkText,
          metadata,
        });
      });
    }
  }

  /* return the final array of chunks ready for embedding */
  return finalChunks;
};

export { processMarkdownForRAG };
export type { RAGChunk, RAGChunkMetadata };
