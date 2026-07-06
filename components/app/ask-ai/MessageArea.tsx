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
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";
import { ButtonGroup } from "@/components/ui/button-group";
import CopyButton from "@/components/ui/copy-button";
import ThinkingUI from "@/components/app/ask-ai//ThinkingUI";

interface Props {
  isBusy: boolean;
  messages: Array<UIMessage<unknown, UIDataTypes, UITools>>;
  status: ChatStatus;
}

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

const MessageArea = memo(({ isBusy, messages, status }: Props) => {
  return (
    <MessageScroller>
      <MessageScrollerViewport
        className={cn(
          "[scrollbar-color:var(--accent)_var(--secondary)]",
          "[&::-webkit-scrollbar]:w-2.5",
          "[&::-webkit-scrollbar-track]:bg-secondary",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-accent",
          "[&::-webkit-scrollbar-thumb]:border-2",
          "[&::-webkit-scrollbar-thumb]:border-secondary",
        )}
      >
        <MessageScrollerContent
          aria-busy={isBusy}
          className="max-w-4xl mx-auto p-3"
        >
          {messages.map(({ id, parts, role }) => {
            const textContent = extractTextFromParts(parts);
            return (
              <MessageScrollerItem
                key={id}
                messageId={id}
                scrollAnchor={role === "user"}
              >
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
                      <BubbleContent className="w-full">
                        {parts.map((part, index) => (
                          <Fragment key={`${id}_${index}`}>
                            {part.type === "text" &&
                              (role === "assistant" ? (
                                <MarkdownPreview code={part.text} />
                              ) : (
                                part.text
                              ))}
                            {part.type === "tool-invocation" && (
                              <div className="text-xs opacity-70 mt-1">
                                Using tool...
                              </div>
                            )}
                          </Fragment>
                        ))}
                      </BubbleContent>
                      {role === "assistant" && (
                        <MessageFooter className="px-0">
                          <ButtonGroup className="ml-auto">
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
          })}

          {status === "submitted" && <ThinkingUI />}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
});

MessageArea.displayName = "MessageArea";

export default MessageArea;
