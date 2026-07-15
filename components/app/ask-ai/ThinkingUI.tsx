import { memo } from "react";
import { Message, MessageContent } from "@/components/ui/message";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import ChatBubble from "@/components/app/ask-ai//ChatBubble";
import MessageStatusBadge from "@/components/app/ask-ai/MessageStatusBadge";

const ThinkingUI = memo(() => {
  return (
    <MessageScrollerItem key="loading-indicator" messageId="loading">
      <Message align="start">
        <MessageContent>
          <ChatBubble role={"assistant"}>
            <MessageStatusBadge isLoading={true}>
              <span>Thinking...</span>
            </MessageStatusBadge>
          </ChatBubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
});

ThinkingUI.displayName = "ThinkingUI";

export default ThinkingUI;
