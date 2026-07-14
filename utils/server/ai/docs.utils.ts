import fs from "fs/promises";
import path from "path";

export const handleReadDocs = async () => {
  const dir = path.join(process.cwd(), "app/(docs)/(scrollable)/docs");
  const rootDir = path.join(process.cwd(), "app/(docs)/(scrollable)");

  return handleReadRecursive({
    dir,
    rootDir,
  });
};

const handleReadRecursive = async ({
  dir,
  rootDir,
  results = {},
}: {
  dir: string;
  rootDir: string;
  results?: Record<string, string>;
}) => {
  const dirents = await fs.readdir(dir, {
    withFileTypes: true,
  });

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory())
      await handleReadRecursive({
        dir: fullPath,
        rootDir,
        results,
      });
    else if (path.extname(dirent.name) === ".mdx") {
      const content = await fs.readFile(fullPath, "utf-8");
      const normalizedPath = path.dirname(
        path.relative(rootDir, fullPath).split(path.sep).join("/"),
      );
      results[normalizedPath] = content;
    }
  }

  return results;
};
