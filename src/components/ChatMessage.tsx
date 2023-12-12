import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { Message } from 'ai'
import { Bot } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ChatMessage = ({message: {role, content}}:{message: Pick<Message,"role" | "content">}) => {

    const {user} = useUser()

    const isMessage = role === "assistant"

  return (
    <div className={cn("flex items-center mb-3 p-4", isMessage ? "justify-start me-6" : " justify-end ms-5")}>
        {
            isMessage && <Bot className='mr-3 shrink-0' />
        }
        <p className={cn("whitespace-pre-line rounded-md p-2", isMessage ? "bg-background" :"bg-primary text-primary-foreground")}>{content}</p>
        {!isMessage && user?.imageUrl && (
            <Image alt='user Image' src={user?.imageUrl} width={30} height={30} className='rounded-full ml-3' />
        )}
    </div>
  )
}

export default ChatMessage