"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/constant/docs.constant";
import DocsSidebarNode from "@/components/app/docs/DocsSidebarNode";
import AskAIButton from "@/components/app/ask-ai/AskAIButton";
import SIdebarMenuHeadingLink from "@/components/app/docs/SIdebarMenuHeadingLink";

const DesktopMenu = () => {
  return (
    <aside className="hidden lg:flex w-70 shrink-0 border-r border-border/40 relative z-10 bg-background flex-col gap-4 py-3">
      <SIdebarMenuHeadingLink />
      <ScrollArea className="flex-1 min-h-0 w-full px-1" data-lenis-prevent>
        <nav className="flex flex-col relative z-10 w-full h-full overflow-visible">
          <DocsSidebarNode items={docsConfig} parentPath={[]} depth={0} />
        </nav>
      </ScrollArea>
      <AskAIButton />
    </aside>
  );
};

export default DesktopMenu;
