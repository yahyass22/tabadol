"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LoginDialog } from "@/components/login-dialog"
import { SignupDialog } from "@/components/signup-dialog"

export function AuthButtons() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  if (session) {
    router.push('/main')
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline"
        onClick={() => setShowLogin(true)}
        className="hover:bg-purple-50"
      >
        Log in
      </Button>
      
      <Button 
        onClick={() => setShowSignup(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Sign up
      </Button>

      <LoginDialog 
        open={showLogin}
        onOpenChange={setShowLogin}
        setShowSignup={setShowSignup}
      />
      
      <SignupDialog 
        open={showSignup}
        onOpenChange={setShowSignup}
        setShowLogin={setShowLogin}
      />
    </div>
  )
}