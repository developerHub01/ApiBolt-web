"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";
import ThinkingUI from "@/components/app/ask-ai/ThinkingUI";
import ChatMessage from "@/components/app/ask-ai/ChatMessage";

interface Props {
  isBusy: boolean;
  messages: Array<UIMessage<unknown, UIDataTypes, UITools>>;
  status: ChatStatus;
}

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
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              {...message}
              messageIndex={index}
              status={status}
              isBusy={isBusy}
            />
          ))}
          {<ThinkingUI />}
          {/* {status === "submitted" && <ThinkingUI />} */}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
});

MessageArea.displayName = "MessageArea";

export default MessageArea;
