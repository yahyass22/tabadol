import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Conversation } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ConversationListProps {
  conversations: Conversation[]
}

export default function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="space-y-1">
      {conversations.map((conversation) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1]
        const unreadCount = conversation.messages.filter(
          (msg) => !msg.isRead && msg.senderId !== "current-user"
        ).length
        const isUnread = unreadCount > 0

        return (
          <Link
            key={conversation.id}
            href={`/messages/${conversation.id}`}
            className={`block p-4 rounded-lg transition-all hover:bg-gray-50/80 active:scale-[0.98] ${
              isUnread ? "bg-gray-50" : ""
            }`}
          >
            <div className="flex gap-3 items-start">
              <Avatar className="border-2 border-white shadow-sm">
                <AvatarImage
                  src={conversation.participantAvatar || "/placeholder.svg"}
                  alt={conversation.participantName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300">
                  {conversation.participantName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className={`font-medium ${isUnread ? "text-gray-900" : "text-gray-700"}`}>
                    {conversation.participantName}
                  </h3>
                  <span className="text-xs whitespace-nowrap text-gray-400">
                    {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                  </span>
                </div>

                <p
                  className={`text-sm truncate ${
                    isUnread ? "text-gray-800 font-medium" : "text-gray-500"
                  }`}
                >
                  {lastMessage.text}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full truncate max-w-[180px]">
                    {conversation.listingTitle}
                  </span>
                </div>
              </div>

              {isUnread && (
                <Badge className="ml-auto bg-blue-500 hover:bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center p-0">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}