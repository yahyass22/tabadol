import { User } from "@prisma/client"

// User related types
export interface UserProfile extends User {
  listings?: Listing[]
  savedListings?: Listing[]
}

// Auth related types
export interface Session {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

// Listing related types
export interface Listing {
  id: string
  title: string
  description: string
  category: string
  condition: string
  exchangeMethod: string
  lookingFor: string
  images: string[]
  location: string
  createdAt: string
  userId: string
  user: {
    name: string | null
    image: string | null
  }
  isSaved?: boolean
}

// Filter related types
export interface FilterOptions {
  categories: string[]
  condition: string
  exchangeMethod: string
  maxDistance: number
  sortBy: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

// Form related types
export interface ListingFormData {
  title: string
  description: string
  category: string
  condition: string
  exchangeMethod: string
  lookingFor: string
  location: string
  images: string[]
}

export interface UserFormData {
  name: string
  email: string
  location: string
  avatar?: string
}

// Constants
export const LISTING_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Services",
  "Other"
] as const

export const CONDITION_TYPES = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Poor"
] as const

export const EXCHANGE_METHODS = [
  "In-person",
  "Shipping",
  "Both"
] as const

export type Category = typeof LISTING_CATEGORIES[number]
export type Condition = typeof CONDITION_TYPES[number]
export type ExchangeMethod = typeof EXCHANGE_METHODS[number]
