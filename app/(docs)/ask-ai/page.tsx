"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon, Bot as AIIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { DefaultChatTransport } from "ai";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import MarkdownPreview from "@/components/ui/markdown-preview";

const Page = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/v1/ai/ask-query",
    }),
  });
  const [input, setInput] = useState<string>("");
  const inputId = useId();

  const isBusy = useMemo(
    () => status === "submitted" || status === "streaming",
    [status],
  );

  const handleSend = useCallback(() => {
    if (!input.trim()) return null;
    sendMessage({ text: input });
    setInput("");
  }, [input, sendMessage]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim() && !isBusy) {
      e.preventDefault();
      handleSend();
    }
  };

  console.log(messages);

  return (
    <MessageScrollerProvider>
      <Card className="w-full gap-0 flex-1 bg-transparent ring-0 h-full py-0">
        <CardContent className="flex-1 flex overflow-hidden p-0! mx-auto w-full flex-col">
          {!messages.length ? (
            <Empty className="h-full p-3">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <AIIcon />
                </EmptyMedia>
                <EmptyTitle>APIBolt AI!</EmptyTitle>
                <EmptyDescription>
                  Ask any question to as to get docs details and ans of your
                  queries.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
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
                  {messages.map(({ id, parts, role }) => (
                    <MessageScrollerItem
                      key={id}
                      messageId={id}
                      scrollAnchor={role === "user"}
                    >
                      <Message align={role === "assistant" ? "start" : "end"}>
                        {role === "assistant" && (
                          <MessageAvatar>
                            <Avatar>
                              <AvatarImage src="/logo.svg" alt="apibolt" />
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                          </MessageAvatar>
                        )}
                        <MessageContent>
                          <Bubble
                            variant={
                              role === "assistant" ? "secondary" : "default"
                            }
                            className={cn({
                              "selection:bg-secondary selection:text-foreground":
                                role === "user",
                            })}
                          >
                            <BubbleContent>
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
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 max-w-4xl mx-auto w-full p-3 border-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="w-full"
          >
            <InputGroup>
              <Textarea
                id={inputId}
                name="message"
                placeholder="Type your query here."
                value={input}
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
      </Card>
    </MessageScrollerProvider>
  );
};

export default Page;
