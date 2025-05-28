"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Listing } from "@prisma/client"

interface ListingsContextType {
  listings: Listing[]
  loading: boolean
  error: Error | null
  refreshListings: () => Promise<void>
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function ListingsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/listings')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setListings(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch listings'))
    } finally {
      setLoading(false)
    }
  }

  const refreshListings = async () => {
    await fetchListings()
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <ListingsContext.Provider value={{ listings, loading, error, refreshListings }}>
      {children}
    </ListingsContext.Provider>
  )
}

export function useListings() {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider')
  }
  return context
}
