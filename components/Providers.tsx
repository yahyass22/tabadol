"use client"

import { ListingsProvider } from "@/context/listings-context"
import { UserProvider } from "@/context/user-context"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <ListingsProvider>
          {children}
        </ListingsProvider>
      </UserProvider>
    </SessionProvider>
  )
}