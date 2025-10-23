"use client"

import { Search } from "lucide-react"

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-gray-400 text-sm mb-1">Hey Emily,</p>
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Search Here"
            className="w-full bg-[#2a2d35] text-gray-400 placeholder-gray-500 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        {/* Profile Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
