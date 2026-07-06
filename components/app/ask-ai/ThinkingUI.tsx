import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import { Loader2 } from "lucide-react";
import { memo } from "react";

const ThinkingUI = memo(() => {
  return (
    <MessageScrollerItem key="loading-indicator" messageId="loading">
      <Message align="start">
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
        <MessageContent>
          <Bubble variant="secondary" className="overflow-visible">
            <BubbleContent className="flex items-center gap-2 min-h-6">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm opacity-70">Thinking...</span>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
});

ThinkingUI.displayName = "ThinkingUI";

export default ThinkingUI;
