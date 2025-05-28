"use client"

import Link from "next/link"
import { MessageCircle, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeleteListingButton } from "@/components/delete-listing-button"
import { useUser } from "@/context/user-context"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import type { Listing } from "@/lib/types"

interface ListingCardProps {
  listing: Listing
  showDeleteButton?: boolean
}

export default function ListingCard({ listing, showDeleteButton = false }: ListingCardProps) {
  const { saveListingToggle, isListingSaved } = useUser()
  const { toast } = useToast()
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if the user context is ready and listing data is available
    if (isListingSaved && listing.id) {
      setSaved(isListingSaved(listing.id))
      setIsLoading(false)
    }
  }, [listing.id, isListingSaved])

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newSavedState = !saved
    saveListingToggle(listing.id)
    setSaved(newSavedState)

    toast({
      title: newSavedState ? "Listing saved" : "Listing removed",
      description: newSavedState
        ? "The listing has been added to your saved items"
        : "The listing has been removed from your saved items",
    })
  }

  if (isLoading) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 overflow-hidden bg-gray-200 animate-pulse"></div>
        <CardContent className="pt-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-1 animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-3 animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.imageUrl || "/placeholder.svg"} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-purple-500">{listing.category}</Badge>
        </div>
        <button
          onClick={handleSaveToggle}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors"
          aria-label={saved ? "Unsave listing" : "Save listing"}
        >
          {saved ? (
            <BookmarkCheck size={18} className="text-purple-600" />
          ) : (
            <Bookmark size={18} className="text-gray-600" />
          )}
        </button>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{listing.description}</p>
        <div className="mt-3">
          <p className="text-sm font-medium">Looking for:</p>
          <p className="text-sm text-gray-600 line-clamp-1">{listing.lookingFor}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center gap-2">
          <img 
            src={listing.userAvatar || "/placeholder.svg"} 
            alt={listing.userName} 
            className="w-6 h-6 rounded-full" 
          />
          <span className="text-sm text-gray-600">{listing.userName}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/messages/conv-${listing.id}`} onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
              <MessageCircle size={18} />
            </Button>
          </Link>
          <Link href={`/listings/${listing.id}`} onClick={(e) => e.stopPropagation()}>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Show more
            </Button>
          </Link>
        </div>
      </CardFooter>
      {showDeleteButton && listing.isUserCreated && (
        <div className="px-4 pb-4">
          <DeleteListingButton listingId={listing.id} className="w-full" />
        </div>
      )}
    </Card>
  )
}