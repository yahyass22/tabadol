"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/context/user-context"
import { useToast } from "@/components/ui/use-toast"
import { Camera, Loader2, MapPin, Mail, User } from "lucide-react"
import { fileToBase64 } from "@/lib/storage-service"

export default function ProfilePage() {
  const { profile, updateProfile } = useUser()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    location: profile?.location || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      const file = files[0]
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files",
          variant: "destructive",
        })
        setIsUploading(false)
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload images smaller than 5MB",
          variant: "destructive",
        })
        setIsUploading(false)
        return
      }

      const base64String = await fileToBase64(file)
      updateProfile({ avatar: base64String })

      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been successfully updated",
      })
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: "There was a problem processing your image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-600 mb-4" />
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white/20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-4xl bg-white/10 text-white">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    title="Upload profile photo"
                    placeholder="Upload profile photo"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 bg-white text-purple-600 hover:bg-gray-100 rounded-full h-10 w-10 shadow-md transition-all group-hover:scale-110"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera size={18} />
                    )}
                  </Button>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-purple-100">Member since {profile.joinDate}</p>
                  {profile.location && (
                    <div className="flex items-center justify-center sm:justify-start mt-2">
                      <MapPin size={16} className="mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="flex items-center text-gray-700">
                          <User className="mr-2 h-4 w-4" />
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2 bg-gray-50 border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="flex items-center text-gray-700">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2 bg-gray-50 border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="flex items-center text-gray-700">
                          <MapPin className="mr-2 h-4 w-4" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="mt-2 bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-2">
                          <User className="mr-2 h-4 w-4" />
                          <span className="text-sm font-medium">Name</span>
                        </div>
                        <p className="text-gray-900 font-medium">{profile.name}</p>
                      </div>

                      {profile.email && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-2">
                            <Mail className="mr-2 h-4 w-4" />
                            <span className="text-sm font-medium">Email</span>
                          </div>
                          <p className="text-gray-900 font-medium">{profile.email}</p>
                        </div>
                      )}

                      {profile.location && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span className="text-sm font-medium">Location</span>
                          </div>
                          <p className="text-gray-900 font-medium">{profile.location}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} BarterHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}