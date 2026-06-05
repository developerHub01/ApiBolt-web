import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/app/common/CodeBlock";
import Link from "next/link";
import CoreIdeaGrid from "@/components/app/mdx/CoreIdeaGrid";
import ExpectHighlight from "@/components/app/mdx/ExpectHighlight";
import Image, { ImageProps } from "next/image";

interface CodeProps {
  node?: unknown;
  className?: string;
  children?: ReactNode;
}

interface LinkProps {
  node?: unknown;
  href: string;
  children?: ReactNode;
}

const CustomCode = ({ className, children }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? (match[1] as "ts" | "json" | "js") : "js";
  const codeString = String(children).replace(/\n$/, "");

  if (!match)
    return (
      <code
        className={cn(
          "px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono text-xs",
        )}
      >
        {children}
      </code>
    );

  return <CodeBlock language={language} code={codeString} />;
};

const CustomLink = ({ href, children }: LinkProps) => {
  return (
    <Link
      href={href}
      className={cn("text-primary hover:underline font-semibold")}
    >
      {children}
    </Link>
  );
};

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    h1: ({ children }) => (
      <h1
        className={cn(
          "text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4 mt-8",
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={cn(
          "text-2xl font-semibold text-foreground border-b border-border pb-2 mt-8 mb-4",
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={cn("text-xl font-bold text-foreground mt-6 mb-3")}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className={cn("text-base text-muted-foreground leading-relaxed mb-4")}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className={cn(
          "list-disc pl-6 space-y-2 text-muted-foreground text-base mb-4",
        )}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={cn(
          "list-decimal pl-6 space-y-2 text-muted-foreground text-base mb-4",
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className={cn("text-muted-foreground")}>{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "border-l-4 border-muted-foreground/30 pl-4 py-2 mt-2 text-sm text-muted-foreground italic bg-muted/20 rounded-r-md",
          "[&>*:last-child]:mb-0",
        )}
      >
        {children}
      </blockquote>
    ),
    a: CustomLink,
    table: ({ children }) => (
      <div className="overflow-hidden border border-border rounded shadow-sm bg-card mt-6 mb-4">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted border-b border-border">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 font-medium text-foreground w-1/2">
        {children}
      </th>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-muted-foreground">{children}</td>
    ),
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    ),
    pre: ({ children }) => <div className={cn("my-6")}>{children}</div>,
    code: CustomCode,
    ...components,
    CoreIdeaGrid,
    ExpectHighlight,
  };
};
