"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

interface SignupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setShowLogin: (show: boolean) => void
  onSignupSuccess: () => void
}

export function SignupDialog({ 
  open, 
  onOpenChange, 
  setShowLogin,
  onSignupSuccess
}: SignupDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: "/main"
      })
      
      if (result?.error) {
        toast.error("Authentication failed")
      } else {
        onSignupSuccess()
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            {isLoading ? "Loading..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              setShowLogin(true)
            }}
            disabled={isLoading}
          >
            Log in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}