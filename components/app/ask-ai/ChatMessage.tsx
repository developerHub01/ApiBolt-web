"use client";

import { Fragment, memo, useMemo } from "react";
import { Message, MessageContent } from "@/components/ui/message";
import MarkdownPreview from "@/components/ui/markdown-preview";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import { ChatStatus, TextUIPart, UIDataTypes, UIMessage, UITools } from "ai";
import MessageStatusBadge from "@/components/app/ask-ai/MessageStatusBadge";
import ChatBubble from "@/components/app/ask-ai//ChatBubble";

type Props = UIMessage<unknown, UIDataTypes, UITools> & {
  messageIndex: number;
  status: ChatStatus;
  isBusy: boolean;
};

const ChatMessage = memo(({ id, role, parts, messageIndex, isBusy }: Props) => {
  const showCopy = useMemo(
    () => Boolean(messageIndex && !isBusy),
    [messageIndex, isBusy],
  );

  return (
    <MessageScrollerItem messageId={id} scrollAnchor={role === "user"}>
      <Message align={role === "assistant" ? "start" : "end"}>
        <MessageContent>
          <ChatBubble parts={parts} role={role} showCopy={showCopy}>
            {parts.map((part, index) => {
              const processingText =
                part.type === "dynamic-tool" || part.type.startsWith("tool-")
                  ? "Using tool..."
                  : part.type === "reasoning"
                    ? "Reasoning..."
                    : part.type === "text"
                      ? null
                      : "Processing...";

              return (
                <Fragment key={`${id}_${index}`}>
                  {processingText ? (
                    <MessageStatusBadge isLoading={isBusy}>
                      <span>{processingText}</span>
                    </MessageStatusBadge>
                  ) : (
                    <>
                      {role === "assistant" ? (
                        <MarkdownPreview code={(part as TextUIPart).text} />
                      ) : (
                        (part as TextUIPart).text
                      )}
                    </>
                  )}
                </Fragment>
              );
            })}
          </ChatBubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
