"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, MessageCircle, Share2, Flag, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound } from "next/navigation"
import { useListings } from "@/context/listings-context"
import { useUser } from "@/context/user-context"
import { useToast } from "@/components/ui/use-toast"
import { mockListings } from "@/lib/mock-data"
import type { Listing } from "@/lib/types"
import { DeleteListingButton } from "@/components/delete-listing-button"
import { Navbar } from "@/components/navbar"

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params) // <-- Unwrap params with React.use()

  const { listings } = useListings()
  const { saveListingToggle, isListingSaved } = useUser()
  const { toast } = useToast()
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Use `id` instead of params.id
    const contextListing = listings.find((l) => l.id === id)

    if (contextListing) {
      setListing(contextListing)
    } else {
      // Fallback to mock data if not found in context
      const mockListing = mockListings.find((l) => l.id === id)
      if (mockListing) {
        setListing(mockListing)
      }
    }

    setIsLoading(false)
  }, [id, listings])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  // If listing not found, show 404
  if (!listing) {
    notFound()
  }

  // Get all images or just the main image
  const images = listing.imageUrl ? listing.imageUrl.split(",") : [];
  const currentImage = images[currentImageIndex]

  // Check if listing is saved
  const isSaved = isListingSaved(listing.id)

  // Handle save toggle
  const handleSaveToggle = () => {
    saveListingToggle(listing.id)

    toast({
      title: isSaved ? "Listing removed" : "Listing saved",
      description: isSaved
        ? "The listing has been removed from your saved items"
        : "The listing has been added to your saved items",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ChevronLeft size={16} />
            <span>Back to listings</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-96">
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500">{listing.category}</Badge>
                </div>

                {/* Image gallery thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{listing.title}</h1>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleSaveToggle} className="flex items-center gap-1">
                      {isSaved ? (
                        <>
                          <BookmarkCheck size={18} className="text-purple-600" />
                          <span className="text-purple-600">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark size={18} />
                          <span>Save</span>
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 size={18} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag size={18} />
                    </Button>
                  </div>
                </div>

                {/* Show delete button for user-created listings */}
                {listing.isUserCreated && (
                  <div className="mb-4">
                    <DeleteListingButton listingId={listing.id} />
                  </div>
                )}

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="exchange">Exchange Terms</TabsTrigger>
                    {images.length > 1 && <TabsTrigger value="photos">All Photos</TabsTrigger>}
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{listing.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Condition</h3>
                      <p className="text-gray-700">{listing.condition}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <p className="text-gray-700">{listing.location}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="exchange" className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Looking For</h3>
                      <p className="text-gray-700">{listing.lookingFor}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Exchange Method</h3>
                      <p className="text-gray-700">{listing.exchangeMethod || "In-person or shipping"}</p>
                    </div>
                  </TabsContent>
                  {images.length > 1 && (
                    <TabsContent value="photos" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="aspect-square border rounded-md overflow-hidden cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <img
                              src={img}
                              alt={`${listing.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={listing.userAvatar || "/placeholder.svg"}
                  alt={listing.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{listing.userName}</h3>
                  <p className="text-sm text-gray-600">Member since {listing.userJoinDate || "Jan 2023"}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-gray-600">
                    (
                    {listing.userRating
                      ? `${listing.userRating}/5 from ${listing.userReviews} reviews`
                      : "5.0/5 from 12 reviews"}
                    )
                  </span>
                </div>
                <p className="text-sm text-gray-600">{listing.userResponseRate || "Usually responds within 2 hours"}</p>
              </div>

              <Link href={`/messages/conv-${listing.id}`} className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                  <MessageCircle size={18} className="mr-2" />
                  Contact {(listing.userName || "User").split(" ")[0]}
                </Button>
              </Link>

              <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                Make an Offer
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Meet in a public place for exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Inspect items before completing the exchange</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Use the platform's messaging for all communications</span>
                  </li>
                </ul>
              </div>
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
