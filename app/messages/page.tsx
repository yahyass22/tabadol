import { Navbar } from "@/components/navbar"
import ConversationList from "@/components/conversation-list"
import { Input } from "@/components/ui/input"
import { mockConversations } from "@/lib/mock-data"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Input placeholder="Search conversations..." className="pl-10" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <ConversationList conversations={mockConversations} />

            <div className="p-8 text-center text-gray-500 border-t">
              <p>Select a conversation to view messages or start a new one from a listing page.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 BarterHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
