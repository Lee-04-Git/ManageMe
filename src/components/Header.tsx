"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log("Searching for:", searchQuery)
      // For now, we'll just log the search query
    }
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-gray-400 text-sm mb-1">Hey Emily,</p>
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-[500px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here"
            className="w-full bg-[#2a2d35] text-white placeholder-gray-500 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#ff6b6b] transition-colors">
            <Search className="w-5 h-5 text-gray-400 hover:text-[#ff6b6b]" />
          </button>
        </form>
        
        {/* Profile Avatar */}
        <Link href="/profile" className="group">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#ff6b6b] transition-all">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
