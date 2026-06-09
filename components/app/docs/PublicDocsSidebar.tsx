"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { docsConfig } from "@/constant/docs.constant";
import DocsSidebarNode from "@/components/app/docs/DocsSidebarNode";

const PublicDocsSidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-70 shrink-0 border-r border-border/40 relative z-10 bg-background">
        <ScrollArea className="h-full w-full" data-lenis-prevent>
          <div className="pt-5 pb-10 pr-6 pl-2 w-full h-full">
            <div className="mb-4 pl-3">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Documentation
              </span>
            </div>

            <nav className="flex flex-col relative z-10 w-full overflow-visible">
              <DocsSidebarNode items={docsConfig} parentPath={[]} depth={0} />
            </nav>
          </div>
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <button
          type="button"
          title="Open documentation menu"
          aria-label="Open documentation menu"
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all md:bottom-8 md:right-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <Menu
            className={cn(
              "w-5 h-5 absolute transition-all duration-200",
              isMobileOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
            )}
          />
          <X
            className={cn(
              "w-5 h-5 absolute transition-all duration-200",
              isMobileOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
            )}
          />
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 z-100 bg-background/80 backdrop-blur-sm lg:hidden"
              />
              <motion.div
                key="drawer"
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "-100%",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="fixed inset-y-0 left-0 z-110 w-70 bg-background border-r border-border shadow-2xl lg:hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/10 shrink-0">
                  <span className="font-semibold tracking-tight text-foreground">
                    Documentation
                  </span>
                  <button
                    type="button"
                    title="Close menu"
                    aria-label="Close menu"
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 -mr-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-hidden min-h-0 relative w-full">
                  <ScrollArea className="h-full w-full" data-lenis-prevent>
                    <div className="p-4 w-full h-full">
                      <nav className="flex flex-col w-full pb-8">
                        <DocsSidebarNode
                          items={docsConfig}
                          parentPath={[]}
                          depth={0}
                        />
                      </nav>
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PublicDocsSidebar;
