"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"

interface UserContextType {
  user: User | null
  loading: boolean
  error: Error | null
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUser = async () => {
    if (status === "loading") return
    
    try {
      if (!session?.user?.email) {
        setUser(null)
        return
      }

      const response = await fetch('/api/users/me', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const userData = await response.json()
      console.log('Fetched user data:', userData)
      setUser(userData)
      setError(null)

    } catch (err) {
      console.error('Error fetching user:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch user'))
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser()
    }
  }, [session, status])

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}