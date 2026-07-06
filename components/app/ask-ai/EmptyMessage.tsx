import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bot as AIIcon } from "lucide-react";

const EmptyMessage = () => {
  return (
    <Empty className="h-full p-3">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AIIcon />
        </EmptyMedia>
        <EmptyTitle>APIBolt AI!</EmptyTitle>
        <EmptyDescription>
          Ask any question to as to get docs details and ans of your queries.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyMessage;
