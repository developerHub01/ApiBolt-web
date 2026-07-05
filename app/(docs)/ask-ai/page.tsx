"use client";

import { useChat } from "@ai-sdk/react";
import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
} from "lucide-react";
// import { MessageAnimated } from "@/components/message-animated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefaultChatTransport, TextStreamChatTransport } from "ai";
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Textarea } from "@/components/ui/textarea";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/v1/ai/ask-query",
    }),
  });
  const [input, setInput] = useState<string>("");

  console.log(messages);

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

  return (
    <MessageScrollerProvider>
      <Card className="w-full gap-0 flex-1 bg-transparent ring-0 h-full px-2">
        <CardHeader className="gap-1 border-b max-w-4xl mx-auto w-full px-0">
          <CardTitle>New Chat</CardTitle>
          <CardDescription>How can I help you today?</CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  onClick={handleSend}
                  disabled={isBusy}
                >
                  <RotateCwIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 flex overflow-hidden p-0 max-w-4xl mx-auto w-full flex-col">
          {/* <ScrollArea className="flex-1 min-h-0">
            {Array.from({ length: 30 }).map((_, index) => (
              <p key={index}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Provident eligendi aut aperiam molestiae delectus, inventore
                temporibus, doloribus officiis sint recusandae quisquam culpa
                assumenda porro non quam alias cumque similique possimus.
              </p>
            ))}
          </ScrollArea> */}

          {!messages.length ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleDashedIcon />
                </EmptyMedia>
                <EmptyTitle>Morning, shadcn!</EmptyTitle>
                <EmptyDescription>
                  What are we working on today? Press send to start a new
                  conversation
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  aria-busy={isBusy}
                  className="p-(--card-spacing)"
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
                              <AvatarImage src="/logo.svg" alt="@shadcn" />
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                          </MessageAvatar>
                        )}
                        <MessageContent className="selection:bg-background selection:text-primary">
                          {parts.map((part, index) => (
                            <Fragment key={`${id}_${index}`}>
                              {part.type === "text" && (
                                <Bubble>
                                  <BubbleContent>{part.text}</BubbleContent>
                                </Bubble>
                              )}
                            </Fragment>
                          ))}
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
        <CardFooter className="flex-col gap-2 max-w-4xl mx-auto w-full px-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="w-full"
          >
            <InputGroup aria-orientation="horizontal">
              <Textarea
                placeholder="Type your message here."
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="max-h-24"
              />
              <InputGroupAddon align="block-end" className="pt-1">
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  // disabled={!nextMessage || isBusy}
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
