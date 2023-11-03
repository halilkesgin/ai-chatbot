import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { Button } from "./ui/button"
import { Bot, Trash, X } from "lucide-react"
import { Input } from "./ui/input"
import { Message } from "ai"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface AIChatBoxProps {
    open: boolean
    onClose: () => void
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        setMessages,
        handleSubmit,
        isLoading,
        error
    } = useChat()

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (open) {
            inputRef?.current?.focus()
        }
    }, [open])

    const lastMessageIsUser = messages[messages.length - 1]?.role === "user"

    return (
        <div className={cn(
            "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
            open ? "fixed" : "hidden"
        )}>
            <Button onClick={onClose} variant="outline" className="mb-1 ms-auto block">
                <X className="h-4 w-4" />
            </Button>
            <div className="flex h-[600px] flex-col rounded bg-background border shadow-sm">
                <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
                    {messages.map((message) => (
                        <ChatMessage message={message} key={message.id} />
                    ))}
                    {isLoading && lastMessageIsUser && (
                        <ChatMessage 
                            message={{
                                role: "assistant",
                                content: "Thingking..."
                            }}
                        />
                    )}
                    {error && (
                        <ChatMessage 
                            message={{
                                role: "assistant",
                                content: "Something went wrong"
                            }}
                        />
                    )}
                    {!error && messages.length === 0 && (
                        <div className="flex h-full items-center justify-center gap-3">
                            <Bot className="h-4 w-4" />
                            Ask the AI Question about your notes.
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    <Button variant="destructive" title="Clear Chat" className="shrink-0" type="button" onClick={() => setMessages([])}>
                        <Trash className="h-4 w-4" />
                    </Button>
                    <Input 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Say something..."
                        ref={inputRef}
                    />
                    <Button
                        type="button"
                        variant="outline"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

function ChatMessage({ message: { role, content }}: {message: Pick<Message, "role" | "content">} ) {

    const { user } = useUser()

    const isAiMessage = role === "assistant"
     
    return (
            <div className={cn(
                "mb-3 flex items-center",
                isAiMessage ? "justify-start me-5" : "justify-end ms-5"
            )}>
                {isAiMessage && <Bot className="mr-2 shrink-0" />}
                <p className={cn(
                    "whitespace-pre-line rounded-md border px-3 py-2",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
                )}>
                    {content}
                </p>
                {!isAiMessage && user?.imageUrl && (
                    <Image 
                        src={user.imageUrl}
                        alt="User Image"
                        width={100}
                        height={100}
                        className="ml-2 rounded-full w-10 h-10 object-cover"
                    />
                )}
            </div>
    )
}