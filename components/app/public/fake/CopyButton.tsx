"use client";

import { Copy } from "lucide-react";

const CopyButton = ({ text }: { text: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      type="button"
      title="Copy to clipboard"
      onClick={handleCopy}
      className="ml-4 p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
    >
      <Copy className="w-4 h-4" />
    </button>
  );
};

export default CopyButton;
