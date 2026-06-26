"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { DocsNavItem } from "@/types/docs.types";

interface Props {
  items: Array<DocsNavItem>;
  parentPath: Array<string>;
  depth: number;
}

const resolvePath = (parents: Array<string>, slug: string): Array<string> => [
  ...parents,
  slug,
];

const resolveFullPath = (parents: Array<string>, slug: string): string =>
  `/docs/${[...parents, slug].join("/")}`;

const isPathActiveOrChildActive = (
  pathArr: Array<string>,
  pathname: string,
): boolean => {
  const fullPath = `/docs/${pathArr.join("/")}`;
  return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
};

const DocsSidebarNode = ({ items, parentPath, depth }: Props) => {
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initialSet = new Set<string>();
    for (const item of items) {
      if (
        item.children &&
        isPathActiveOrChildActive(resolvePath(parentPath, item.slug), pathname)
      )
        initialSet.add(item.slug);
    }
    return initialSet;
  });

  const isActive = (pathArr: Array<string>): boolean => {
    const fullPath = `/docs/${pathArr.join("/")}`;
    return pathname === fullPath;
  };

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) newSet.delete(slug);
      else newSet.add(slug);

      return newSet;
    });
  };

  const [prevPathname, setPrevPathname] = useState<string>(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      items.forEach((item) => {
        if (
          item.children &&
          isPathActiveOrChildActive(
            resolvePath(parentPath, item.slug),
            pathname,
          )
        )
          newSet.add(item.slug);
      });
      return newSet;
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-1 relative before:absolute before:content-[''] before:left-2.5 before:top-0 before:w-px before:h-full",
        {
          "pl-5 before:bg-border/40 mt-1": depth,
        },
      )}
    >
      {items.map((item) => (
        <div key={item.slug}>
          {!item.children || !item.children.length ? (
            <Link
              href={resolveFullPath(parentPath, item.slug)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all cursor-pointer w-full group text-muted-foreground hover:text-foreground",
                {
                  "font-medium text-foreground bg-muted/50": isActive(
                    resolvePath(parentPath, item.slug),
                  ),
                },
              )}
            >
              <span>{item.label}</span>
            </Link>
          ) : (
            <div className="flex flex-col w-full relative">
              <div
                className={cn(
                  "flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-all w-full group",
                  isPathActiveOrChildActive(
                    resolvePath(parentPath, item.slug),
                    pathname,
                  ) || openSections.has(item.slug)
                    ? "text-foreground"
                    : "text-muted-foreground",
                  {
                    "mt-2 font-medium": !depth,
                  },
                )}
              >
                <Link
                  href={resolveFullPath(parentPath, item.slug)}
                  className={cn("flex-1 hover:text-foreground truncate", {
                    "font-medium text-foreground": isActive(
                      resolvePath(parentPath, item.slug),
                    ),
                  })}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  title="Toggle section"
                  aria-label="Toggle section"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(item.slug);
                  }}
                  className={cn(
                    "p-1 hover:bg-muted rounded-sm transition-colors cursor-pointer shrink-0 ml-1 text-muted-foreground",
                    {
                      "text-foreground": openSections.has(item.slug),
                    },
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200 opacity-60",
                      {
                        "rotate-180 opacity-100": openSections.has(item.slug),
                      },
                    )}
                  />
                </button>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.has(item.slug) ? "auto" : 0,
                  opacity: openSections.has(item.slug) ? 1 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="flex flex-col w-full overflow-hidden"
              >
                <DocsSidebarNode
                  items={item.children}
                  parentPath={resolvePath(parentPath, item.slug)}
                  depth={depth + 1}
                />
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocsSidebarNode;
