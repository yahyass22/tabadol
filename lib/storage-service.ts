import type { Listing } from "./types"
import { useEffect, useState } from "react"

// Only keep user profile utilities here

// User profile type
export interface UserProfile {
  name: string
  email?: string
  avatar?: string
  joinDate: string
  location?: string
}

// Default user profile
const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Your Name",
  avatar: "/placeholder.svg?height=100&width=100&text=YOU",
  joinDate: "January 2023",
  location: "Portland, OR",
}

const STORAGE_KEYS = {
  USER_PROFILE: "barter-hub-user-profile",
}

// Save user profile to localStorage
export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
  }
}

// Load user profile from localStorage
export const loadUserProfile = (): UserProfile => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    return stored ? JSON.parse(stored) : DEFAULT_USER_PROFILE
  }
  return DEFAULT_USER_PROFILE
}

// Update user avatar
export const updateUserAvatar = (avatarUrl: string): void => {
  const profile = loadUserProfile()
  profile.avatar = avatarUrl
  saveUserProfile(profile)
}

// Convert file to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const res = await fetch("/api/listings");
      const data = await res.json();
      setListings(data);
    }
    fetchListings();
  }, []);

 
}
