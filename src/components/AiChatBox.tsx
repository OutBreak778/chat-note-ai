import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import AIChatButton from "./AiChatButton";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { Separator } from "./ui/separator";

interface AiChatProps {
  open: boolean;
  onClose: () => void;
}

const AIChatBox = ({ open, onClose }: AiChatProps) => {
  const {
    messages,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    input,
    handleInputChange,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (open) {
      inputRef.current?.focus();
    }
  }, [messages, open]);

  const lastMessage = messages[messages.length - 1]?.role === "user"

  return (
    <div
      className={cn(
        `bottom-0 right-1 z-10 w-full max-w-[400px] xl:max-w-[500px] p-1 xl:right-24 transition-all duration-1000`,
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="-mb-6 -mr-2 ms-auto block">
        <XCircle className="w-7 h-7" />
      </button>
      <div className="flex h-[555px] flex-col rounded-md bg-background border shadow-xl">
        <p className="p-2 capitalize text-center text-xl mx-4">Chat with Note</p>
        <Separator />
        <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {
            isLoading && lastMessage && (
              <ChatMessage message={{
                role: "assistant",
                content: "Thinking..."
              }} />
            )
          }
          {error && (
            <ChatMessage message={{
              role:"assistant",
              content: "Something went wrong!"
            }} />
          )}
          {!error && messages.length === 0 && (
            <div className="flex items-center justify-center h-full gap-4">
              <Bot className="w-8 h-8" />
              Ask this AI question about your notes
            </div>
          )}
        </div>
        <form className="m-3 flex gap-2" onSubmit={handleSubmit}>
          <Button
            type="button"
            variant="destructive"
            title="Clear Chat"
            className="shrink-0"
            onClick={() => setMessages([])}
          >
            <Trash className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder="Ask something..."
            className="mr-2"
          />
          <Button type="submit">
            <SendHorizonal className="w-4 h-4 m-1" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChatBox;
