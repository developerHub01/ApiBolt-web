"use client";

import React, { useMemo } from "react";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { ButtonGroup } from "@/components/ui/button-group";
import CopyButton from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import { UIMessage } from "ai";

interface Props {
  children: React.ReactNode;
  role: UIMessage["role"];
  parts?: UIMessage["parts"];
  showCopy?: boolean;
}

const extractTextFromParts = (
  parts: Array<{
    type: string;
    text?: string;
  }>,
) => {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text!)
    .join("\n");
};

const ChatBubble = ({
  children,
  role,
  showCopy = false,
  parts = [],
}: Props) => {
  const textContent = useMemo(() => extractTextFromParts(parts), [parts]);

  return (
    <Bubble
      variant={role === "assistant" ? "transparent" : "default"}
      className={cn("overflow-visible group/bubble relative", {
        "w-full max-w-full": role === "assistant",
        "selection:bg-secondary selection:text-foreground": role === "user",
      })}
    >
      <BubbleContent
        className={cn("w-fit", {
          "w-full p-0": role === "assistant",
        })}
      >
        {children}
      </BubbleContent>

      {showCopy && (
        <div
          className={cn(
            "opacity-0 group-hover/bubble:opacity-100 focus-within:opacity-100 transition-opacity duration-200 mt-1.5 flex select-none",
            role === "assistant" ? "justify-start" : "justify-end",
          )}
        >
          <ButtonGroup>
            <CopyButton
              value={textContent}
              showLabel={false}
              size={"icon-xs"}
              variant={"secondary"}
            />
          </ButtonGroup>
        </div>
      )}
    </Bubble>
  );
};

export default ChatBubble;
