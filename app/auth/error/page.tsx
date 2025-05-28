"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"

export default function ErrorPage() {
  useEffect(() => {
    // Redirect to Google sign-in immediately
    signIn("google", { callbackUrl: "/main" })
  }, [])

  return null
}