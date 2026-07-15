import React from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/app/common/CodeBlock";
import { LangType } from "@/types/code.types";

interface MarkdownPreviewProps {
  code: string;
  className?: string;
  [key: string]: unknown;
}

const MarkdownPreview = ({
  code,
  className,
  ...props
}: MarkdownPreviewProps) => {
  return (
    <div
      className={cn(
        "w-full text-sm text-foreground select-text [&>*:last-child]:mb-0",
        className,
      )}
      {...props}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold tracking-tight mt-6 mb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3 pb-1 border-b first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold tracking-tight mt-5 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-medium mt-4 mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium mt-4 mb-2">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="leading-7 mb-3 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-3 space-y-0.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-3 space-y-0.5">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-6">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-primary/40 pl-4 italic mb-3 text-muted-foreground bg-muted/20 py-1.5 pr-3 rounded-r-md">
              {children}
            </blockquote>
          ),
          code({
            children,
            ...rest
          }: React.ComponentProps<"code"> & { inline?: boolean }) {
            const language: LangType | undefined =
              (rest.className?.split("language-")?.[1] as LangType) ??
              undefined;

            if (!language) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary"
                  {...rest}
                >
                  {children}
                </code>
              );
            } else if (typeof children === "string")
              return (
                <CodeBlock
                  language={language}
                  code={children.trim()}
                  className="mb-3 w-full"
                />
              );
            else
              return (
                <pre className="bg-muted border border-border/40 p-3 rounded-lg overflow-x-auto text-xs font-mono my-3">
                  <code {...rest}>{children}</code>
                </pre>
              );
          },
          hr: () => <hr className="my-4 border-border/50" />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline underline-offset-2 hover:text-primary/70 transition-colors"
            >
              {children}
            </a>
          ),
          img: () =>
            // { src, alt }: React.ComponentProps<"img">
            null,
          // <Image
          //   src={typeof src === "string" ? src : ""}
          //   alt={alt || ""}
          //   width={400}
          //   height={300}
          //   className="mb-4 rounded max-w-full h-auto"
          // />
          table: ({ children }: React.ComponentProps<"table">) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-border/50">
              <table className="w-full border-collapse mb-0">{children}</table>
            </div>
          ),
          thead: ({ children }: React.ComponentProps<"thead">) => (
            <thead className="bg-muted/60 border-b border-border/50">
              {children}
            </thead>
          ),
          tbody: ({ children }: React.ComponentProps<"thead">) => (
            <tbody className="divide-y divide-border/30">{children}</tbody>
          ),
          tr: ({ children }: React.ComponentProps<"tr">) => (
            <tr className="hover:bg-muted/20 transition-colors">{children}</tr>
          ),
          th: ({ children }: React.ComponentProps<"th">) => (
            <th className="px-3 py-2 text-left font-semibold text-muted-foreground text-[11px] uppercase tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }: React.ComponentProps<"td">) => (
            <td className="px-3 py-2 text-foreground/85">{children}</td>
          ),
        }}
      >
        {code}
      </Markdown>
    </div>
  );
};

export default MarkdownPreview;
