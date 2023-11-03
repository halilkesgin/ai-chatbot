import { useState } from "react";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import AIChatBox from "./ai-chat-box";

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false)

    return (
        <>
            <Button 
                onClick={() => setChatBoxOpen(true)}
            >
                <Bot className="h-4 w-4 mr-2" /> 
                AI Chat
            </Button>
            <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    )
}