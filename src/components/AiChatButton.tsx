"use client"

import { useState } from "react"
import AIChatBox from "./AiChatBox"
import { Button } from "./ui/button"
import { Bot } from "lucide-react"

const AIChatButton = () => {

    const [chatOpen, setChatOpen] = useState(false)

    return(
        <div>
            <Button onClick={() => setChatOpen(true)}>
                <Bot className="w-4 h-4 mr-2" />AI Chat
            </Button>
            <AIChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
    )
}

export default AIChatButton