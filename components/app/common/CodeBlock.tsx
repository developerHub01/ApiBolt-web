"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { LangType } from "@/types/code.types";
import Code from "@/components/app/common/Code";

interface Props {
  code: string;
  language?: LangType;
}

const CodeBlock = ({ code = "", language = "js" }: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="doc-code-block group relative rounded-lg border border-border/60 bg-[#0B0F19] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-card/60 border-b border-border/40">
        {language && (
          <div className="flex items-center gap-2">
            <span
              v-if="lang"
              className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 select-none"
            >
              {language}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all h-7 ml-auto",
            {
              "text-emerald-400 hover:text-emerald-400": isCopied,
            },
          )}
        >
          {isCopied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
        <Code code={code} language={language} className="rounded-none p-4 text-sm" />
      </div>
    </div>
  );
};

export default CodeBlock;
