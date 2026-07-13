import path from "path";
import fs from "fs/promises";

export const getKeyboardShortcutDocs = async (): Promise<string> => {
  const filePath = path.join(
    process.cwd(),
    "app/(docs)/(scrollable)/docs/keyboard/content.mdx",
  );
  return await fs.readFile(filePath, "utf-8");
};
