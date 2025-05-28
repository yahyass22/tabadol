"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Send, Phone, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import type { Message, Conversation } from "@/lib/types"
import { useListings } from "@/context/listings-context"
import { Navbar } from "@/components/navbar"

export default function ConversationPage() {
  const params = useParams()
  const router = useRouter()
  const conversationId = params.id as string
  const { listings } = useListings()

  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [listing, setListing] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If the conversationId is for a listing, show a starter conversation
    if (conversationId.startsWith("conv-")) {
      const listingId = conversationId.replace("conv-", "")
      const foundListing = listings.find((l) => l.id === listingId)

      if (foundListing) {
        const newConversation: Conversation = {
          id: conversationId,
          participantId: foundListing.id,
          participantName: foundListing.userName,
          participantAvatar: foundListing.userAvatar,
          listingId: foundListing.id,
          listingTitle: foundListing.title,
          startedAt: new Date().toISOString(),
          messages: [
            {
              id: `msg-${Date.now()}`,
              senderId: foundListing.id,
              text: `Hello! I see you're interested in my ${foundListing.title}. How can I help you?`,
              timestamp: new Date().toISOString(),
              isRead: true,
            },
          ],
        }

        setConversation(newConversation)
        setListing(foundListing)
        setMessages(newConversation.messages)
        return
      }
    }

    // If not found, redirect to messages page
    router.push("/messages")
  }, [conversationId, listings, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    setTimeout(() => {
      const response: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: conversation?.participantId || "other-user",
        text: getRandomResponse(),
        timestamp: new Date().toISOString(),
        isRead: true,
      }

      setMessages((prevMessages) => [...prevMessages, response])
    }, 1000)
  }

  const getRandomResponse = () => {
    const responses = [
      "That sounds good to me!",
      "I'm interested in trading. When would you be available to meet?",
      "Could you tell me more about the condition?",
      "Would you consider a partial trade plus some cash?",
      "I have a few questions about what you're offering.",
      "Thanks for the message. Let me think about it and get back to you.",
      "Is the item still available?",
      "I'm available this weekend if you want to meet up for the exchange.",
      "Do you have any more photos you could share?",
      "I appreciate your offer, but I'm looking for something slightly different.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <Link href="/messages" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ChevronLeft size={16} />
            <span>Back to all messages</span>
          </Link>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 pb-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={conversation.participantAvatar || "/placeholder.svg"}
                  alt={conversation.participantName}
                />
                <AvatarFallback>{(conversation.participantName || "U").charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{conversation.participantName}</h2>
                <p className="text-sm text-gray-500">{listing ? `Re: ${listing.title}` : "Conversation"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Info size={18} />
              </Button>
            </div>
          </div>

          {listing && (
            <div className="p-3 bg-gray-50 border-b flex items-center gap-3">
              <img
                src={listing.imageUrl || "/placeholder.svg"}
                alt={listing.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{listing.title}</h3>
                <p className="text-xs text-gray-500 truncate">Looking for: {listing.lookingFor}</p>
              </div>
              <Link href={`/listings/${listing.id}`}>
                <Button variant="outline" size="sm">
                  View Listing
                </Button>
              </Link>
            </div>
          )}

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <div className="text-center text-xs text-gray-500 my-2">
              {new Date(conversation.startedAt).toLocaleDateString()}
            </div>

            {messages.map((message) => {
              const isCurrentUser = message.senderId === "current-user"
              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      isCurrentUser
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs mt-1 ${isCurrentUser ? "text-purple-100" : "text-gray-500"}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 BarterHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
