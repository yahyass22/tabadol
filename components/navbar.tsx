"use client"

import { useState } from "react"
import Link from "next/link";

// Inside your return:
<Link href="/landing">Landing</Link>

import { usePathname } from "next/navigation"
import { Bell, MessageSquare, Package, User, Menu, X, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/context/user-context"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface NavbarProps {
  scrolled: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Navbar({ scrolled, user }: NavbarProps) {
  const pathname = usePathname()
  const { profile, savedListings } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  // Example of the problematic line:
  const avatarUrl = profile?.avatar || '/default-avatar.png'; // Provide a fallback URL

  // Ensure `user` is not null before accessing `avatar`
  if (!profile) {
  return (
    <div className="p-4 text-center text-gray-500">
      User data not available. Please try again later.
    </div>
  );
}

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-purple-600">
            SWAP ON
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/main">
              <Button variant={isActive("/main") ? "default" : "ghost"} className={isActive("/main") ? "bg-purple-600" : ""}>
                Home
                
              </Button>
              
            </Link>
            <Link href="/my-listings">
              <Button
                variant={isActive("/my-listings") ? "default" : "ghost"}
                className={isActive("/my-listings") ? "bg-purple-600" : ""}
              >
                <Package size={18} className="mr-2" />
                My Listings
              </Button>
            </Link>
            <Link href="/saved-listings">
              <Button
                variant={isActive("/saved-listings") ? "default" : "ghost"}
                className={isActive("/saved-listings") ? "bg-purple-600" : ""}
              >
                <Bookmark size={18} className="mr-2" />
                Saved
                {savedListings.length > 0 && <Badge className="ml-2 bg-purple-500">{savedListings.length}</Badge>}
              </Button>
            </Link>
            <Link href="/messages">
              <Button
                variant={isActive("/messages") ? "default" : "ghost"}
                className={isActive("/messages") ? "bg-purple-600" : ""}
              >
                <MessageSquare size={18} className="mr-2" />
                Messages
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <Bell size={18} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-500">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium">New message from Alex Johnson</p>
                      <p className="text-sm text-gray-500">
                        "Hi there! I'm interested in your vintage record player..."
                      </p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium">New offer on your listing</p>
                      <p className="text-sm text-gray-500">Someone made an offer on "Mountain Bike - Trek Marlin 7"</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium">Listing view milestone</p>
                      <p className="text-sm text-gray-500">Your "Leather Sofa" listing reached 50 views!</p>
                      <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Link href="/notifications" className="text-purple-600 w-full text-center">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/create-listing">
              <Button className="bg-purple-600 hover:bg-purple-700 ml-2">Create Listing</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link href="/create-listing" className="mr-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Create Listing
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-2">
              <Link href="/main" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/") ? "bg-purple-600" : ""}`}
                >
                  Home
                </Button>
              </Link>
              <Link href="/my-listings" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/my-listings") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/my-listings") ? "bg-purple-600" : ""}`}
                >
                  <Package size={18} className="mr-2" />
                  My Listings
                </Button>
              </Link>
              <Link href="/saved-listings" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/saved-listings") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/saved-listings") ? "bg-purple-600" : ""}`}
                >
                  <Bookmark size={18} className="mr-2" />
                  Saved Listings
                  {savedListings.length > 0 && <Badge className="ml-2 bg-purple-500">{savedListings.length}</Badge>}
                </Button>
              </Link>
              <Link href="/messages" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/messages") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/messages") ? "bg-purple-600" : ""}`}
                >
                  <MessageSquare size={18} className="mr-2" />
                  Messages
                </Button>
              </Link>
              <Link href="/notifications" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/notifications") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/notifications") ? "bg-purple-600" : ""}`}
                >
                  <Bell size={18} className="mr-2" />
                  Notifications
                  <Badge className="ml-2 bg-purple-500">3</Badge>
                </Button>
              </Link>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/profile") ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive("/profile") ? "bg-purple-600" : ""}`}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
