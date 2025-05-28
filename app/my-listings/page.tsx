"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import ListingCard from "@/components/listing-card"
import { useListings } from "@/context/listings-context"

export default function MyListingsPage() {
  const { getUserListings } = useListings()
  const userListings = getUserListings()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter listings based on search query
  const filteredListings = userListings.filter((listing) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      listing.title.toLowerCase().includes(query) ||
      listing.description.toLowerCase().includes(query) ||
      listing.category.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">My Listings</h1>
          <Link href="/create-listing">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus size={18} className="mr-2" />
              Create New Listing
            </Button>
          </Link>
        </div>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search your listings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showDeleteButton />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            {userListings.length === 0 ? (
              <div>
                <p className="text-gray-600 mb-6">You haven't created any listings yet.</p>
                <Link href="/create-listing">
                  <Button className="bg-purple-600 hover:bg-purple-700">Create Your First Listing</Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">No listings match your search. Try adjusting your search criteria.</p>
            )}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 BarterHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
