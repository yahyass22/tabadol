"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, X, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useListings } from "@/context/listings-context"
import { Navbar } from "@/components/navbar"
import { useUser } from "@/context/user-context"
import { fileToBase64 } from "@/lib/storage-service"
import type { Listing } from "@/lib/types"

export default function CreateListingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addListing } = useListings()
  const { profile } = useUser()
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Form refs
  const titleRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLButtonElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const conditionRef = useRef<HTMLButtonElement>(null)
  const lookingForRef = useRef<HTMLTextAreaElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const exchangeMethodRef = useRef<HTMLButtonElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [category, setCategory] = useState<string>("")
  const [condition, setCondition] = useState<string>("")
  const [exchangeMethod, setExchangeMethod] = useState<string>("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      const newImages: string[] = []
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file type",
            description: "Please upload only image files",
            variant: "destructive",
          })
          continue
        }

        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please upload images smaller than 5MB",
            variant: "destructive",
          })
          continue
        }

        const base64String = await fileToBase64(file)
        newImages.push(base64String)
      }
      
      setImages(prev => [...prev, ...newImages].slice(0, 5)) // Limit to 5 images
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: "There was a problem processing your image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleAddImage = () => fileInputRef.current?.click()

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title: titleRef.current?.value?.trim(),
      description: descriptionRef.current?.value?.trim(),
      category,
      condition: condition || "Not specified",
      exchangeMethod: exchangeMethod || "Both options",
      lookingFor: lookingForRef.current?.value?.trim() || "",
      images,
      location: locationRef.current?.value?.trim() || "Not specified",
    };

    // Validate required fields
    if (!formData.title || !formData.description || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate images
    if (images.length === 0) {
      toast({
        title: "Missing images",
        description: "Please add at least one image",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData); // Debug log
      await addListing(formData);
      
      toast({
        title: "Success!",
        description: "Your listing has been created",
      });

      router.push("/main");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create listing",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors">
            <ChevronLeft size={18} />
            <span className="font-medium">Back to listings</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Create New Listing</h1>
            <p className="text-purple-100 mt-1">Share what you have to offer with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700 font-medium">
                    Title*
                  </Label>
                  <Input 
                    id="title" 
                    ref={titleRef} 
                    placeholder="What are you offering?" 
                    required 
                    className="mt-2 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium">
                    Category*
                  </Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger ref={categoryRef} className="mt-2 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition" className="text-gray-700 font-medium">
                    Condition
                  </Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger ref={conditionRef} className="mt-2 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-gray-700 font-medium">
                    Location
                  </Label>
                  <Input 
                    id="location" 
                    ref={locationRef} 
                    placeholder="City, State" 
                    className="mt-2 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="exchangeMethod" className="text-gray-700 font-medium">
                    Exchange Method
                  </Label>
                  <Select value={exchangeMethod} onValueChange={setExchangeMethod}>
                    <SelectTrigger ref={exchangeMethodRef} className="mt-2 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Select exchange method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-person only</SelectItem>
                      <SelectItem value="shipping">Shipping only</SelectItem>
                      <SelectItem value="both">Both options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Description*
              </Label>
              <Textarea
                id="description"
                ref={descriptionRef}
                placeholder="Describe your item or service in detail"
                required
                className="mt-2 min-h-[120px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <Label htmlFor="lookingFor" className="text-gray-700 font-medium">
                What are you looking for in exchange?*
              </Label>
              <Textarea
                id="lookingFor"
                ref={lookingForRef}
                placeholder="Describe what you want in return"
                required
                className="mt-2 min-h-[120px] bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium block mb-2">Photos*</Label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={`Listing image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} className="text-gray-700" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddImage}
                    disabled={isUploading}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-600 transition-all bg-gray-50"
                  >
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    ) : (
                      <>
                        <Upload size={20} className="mb-1" />
                        <span className="text-sm font-medium">Add Photo</span>
                        <span className="text-xs text-gray-500 mt-1">Max 5MB</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">First image will be used as cover. Max 5 images.</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-lg font-medium shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Publish Listing"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}