"use client";

import { Fragment, memo } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import MarkdownPreview from "@/components/ui/markdown-preview";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import { ButtonGroup } from "@/components/ui/button-group";
import CopyButton from "@/components/ui/copy-button";
import { UIDataTypes, UIMessage, UITools } from "ai";

type Props = UIMessage<unknown, UIDataTypes, UITools>;

const extractTextFromParts = (
  parts: Array<{
    type: string;
    text?: string;
  }>,
) => {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text as string)
    .join("\n");
};

const ChatMessage = memo(({ id, role, parts }: Props) => {
  const textContent = extractTextFromParts(parts);

  return (
    <MessageScrollerItem messageId={id} scrollAnchor={role === "user"}>
      <Message align={role === "assistant" ? "start" : "end"}>
        {role === "assistant" && (
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="/icons/masked-logo.png"
                alt="apibolt"
                className="rounded-md"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </MessageAvatar>
        )}
        <MessageContent className="">
          <Bubble
            variant={role === "assistant" ? "secondary" : "default"}
            className={cn("overflow-visible", {
              "selection:bg-secondary selection:text-foreground":
                role === "user",
              "w-full": role === "assistant",
            })}
          >
            <BubbleContent className="w-fit">
              {parts.map((part, index) => (
                <Fragment key={`${id}_${index}`}>
                  {part.type === "text" &&
                    (role === "assistant" ? (
                      <MarkdownPreview code={part.text} />
                    ) : (
                      part.text
                    ))}
                  {part.type === "tool-invocation" && (
                    <div className="text-xs opacity-70 mt-1">Using tool...</div>
                  )}
                </Fragment>
              ))}
            </BubbleContent>
            {role === "assistant" && (
              <MessageFooter className="px-0">
                <ButtonGroup>
                  <CopyButton
                    value={textContent}
                    showLabel={false}
                    size={"icon-xs"}
                    variant={"secondary"}
                  />
                </ButtonGroup>
              </MessageFooter>
            )}
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
