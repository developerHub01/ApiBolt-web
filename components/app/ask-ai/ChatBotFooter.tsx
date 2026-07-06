"use client";

import { ChangeEvent, memo, useCallback, useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

interface Props {
  isBusy: boolean;
  handleSend: (value: string) => void;
}

const ChatBotFooter = memo(({ isBusy, handleSend }: Props) => {
  const [input, setInput] = useState<string>("");
  const inputId = useId();

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return null;
    handleSend(input);
    setInput("");
  }, [handleSend, input]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim() && !isBusy) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <CardFooter className="flex-col gap-2 max-w-4xl mx-auto w-full p-3 border-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full"
      >
        <InputGroup>
          <Textarea
            id={inputId}
            name="message"
            placeholder="Type your query here."
            value={input}
            disabled={isBusy}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="max-h-24 border-0 focus-visible:ring-0 text-sm resize-none"
          />
          <InputGroupAddon align="block-end" className="pt-1">
            <InputGroupButton
              type="submit"
              variant="default"
              size="icon-sm"
              disabled={isBusy}
              className="ml-auto"
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </CardFooter>
  );
});

ChatBotFooter.displayName = "ChatBotFooter";

export default ChatBotFooter;
