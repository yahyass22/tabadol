"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useListings } from "@/context/listings-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface DeleteListingButtonProps {
  listingId: string
  className?: string
}

export function DeleteListingButton({ listingId, className }: DeleteListingButtonProps) {
  const [open, setOpen] = useState(false)
  const { deleteListing: deleteListingContext } = useListings()
  const router = useRouter()
  const { toast } = useToast()

  const deleteListing = async (id: string) => {
    await fetch(`/api/listings/${id}`, { method: "DELETE" })
    deleteListingContext(id)
  }

  const handleDelete = () => {
    deleteListing(listingId)
    toast({
      title: "Listing deleted",
      description: "Your listing has been successfully deleted",
    })
    setOpen(false)
    router.push("/")
  }

  return (
    <>
      <Button variant="destructive" size="sm" className={className} onClick={() => setOpen(true)}>
        <Trash2 size={16} className="mr-2" />
        Delete Listing
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your listing and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
