import { Card } from "@/components/ui/card";
import { MessageScrollerProvider } from "@/components/ui/message-scroller";
import ChatRoot from "@/components/app/ask-ai/ChatRoot";

const Page = () => {
  return (
    <MessageScrollerProvider>
      <Card className="w-full gap-0 flex-1 bg-transparent ring-0 h-full py-0">
        <ChatRoot />
      </Card>
    </MessageScrollerProvider>
  );
};

export default Page;
