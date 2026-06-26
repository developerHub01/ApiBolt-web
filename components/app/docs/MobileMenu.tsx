"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { docsConfig } from "@/constant/docs.constant";
import DocsSidebarNode from "@/components/app/docs/DocsSidebarNode";
import AskAIButton from "@/components/app/ask-ai/AskAIButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  handleToggleOpen: (value: boolean) => void;
}

const MobileMenu = ({ isOpen, handleToggleOpen }: Props) => {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        title="Open documentation menu"
        aria-label="Open documentation menu"
        onClick={() => handleToggleOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all md:bottom-8 md:right-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        <Menu
          className={cn(
            "w-5 h-5 absolute transition-all duration-200",
            isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
          )}
        />
        <X
          className={cn(
            "w-5 h-5 absolute transition-all duration-200",
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
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
              onClick={() => handleToggleOpen(false)}
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
              className="fixed inset-y-0 left-0 z-110 w-70 bg-background border-r border-border shadow-2xl lg:hidden flex flex-col gap-4  pb-3"
            >
              <div className="flex items-center justify-between p-3 border-b border-border bg-muted/10 shrink-0">
                <span className="font-semibold tracking-tight text-foreground">
                  Documentation
                </span>
                <button
                  type="button"
                  title="Close menu"
                  aria-label="Close menu"
                  onClick={() => handleToggleOpen(false)}
                  className="p-1.5 -mr-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ScrollArea
                className="flex-1 min-h-0 w-full px-1"
                data-lenis-prevent
              >
                <nav className="flex flex-col relative z-10 w-full h-full overflow-visible">
                  <DocsSidebarNode
                    items={docsConfig}
                    parentPath={[]}
                    depth={0}
                  />
                </nav>
              </ScrollArea>
              <AskAIButton />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
