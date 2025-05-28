"use client"

import { useState, useEffect } from "react"
import { Search, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import ListingCard from "@/components/listing-card"
import { useListings } from "@/context/listings-context"
import { useUser } from "@/context/user-context"
import { mockListings } from "@/lib/mock-data"
import Link from "next/link"
import type { Listing } from "@/lib/types"

export default function SavedListingsPage() {
  const { listings } = useListings()
  const { savedListings } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [allSavedListings, setAllSavedListings] = useState<Listing[]>([])

  // Combine listings from context and mock data
  useEffect(() => {
    const savedItems: Listing[] = []

    // Check each saved listing ID
    savedListings.forEach((id) => {
      // First check in our context listings
      const contextListing = listings.find((l) => l.id === id)
      if (contextListing) {
        savedItems.push(contextListing)
      } else {
        // If not found, check in mock listings
        const mockListing = mockListings.find((l) => l.id === id)
        if (mockListing) {
          savedItems.push(mockListing)
        }
      }
    })

    setAllSavedListings(savedItems)
  }, [savedListings, listings])

  // Filter listings based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredListings(allSavedListings)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allSavedListings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query) ||
        listing.lookingFor.toLowerCase().includes(query),
    )

    setFilteredListings(filtered)
  }, [searchQuery, allSavedListings])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Saved Listings</h1>
        </div>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search saved listings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-5xl mb-4">
              <Bookmark className="mx-auto h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No saved listings found</h3>
            {allSavedListings.length === 0 ? (
              <div>
                <p className="text-gray-600 mb-6">You haven't saved any listings yet.</p>
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700">Browse Listings</Button>
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
