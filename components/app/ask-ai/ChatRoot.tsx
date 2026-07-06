"use client";

import { useCallback, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { CardContent } from "@/components/ui/card";
import { DefaultChatTransport } from "ai";
import ChatBotFooter from "@/components/app/ask-ai/ChatBotFooter";
import EmptyMessage from "@/components/app/ask-ai/EmptyMessage";
import MessageArea from "@/components/app/ask-ai/MessageArea";

const ChatRoot = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/v1/ai/ask-query",
    }),
  });

  const isBusy = useMemo(
    () => ["submitted", "streaming"].includes(status),
    [status],
  );

  const handleSend = useCallback(
    (value: string) =>
      sendMessage({
        text: value,
      }),
    [sendMessage],
  );

  return (
    <>
      <CardContent className="flex-1 flex overflow-hidden p-0! mx-auto w-full flex-col">
        {messages.length ? (
          <MessageArea isBusy={isBusy} messages={messages} status={status} />
        ) : (
          <EmptyMessage />
        )}
      </CardContent>
      <ChatBotFooter isBusy={isBusy} handleSend={handleSend} />
    </>
  );
};

export default ChatRoot;
