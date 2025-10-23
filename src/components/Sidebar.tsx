"use client"

import { BarChart3, MessageSquare, Folder, Heart, Star, User } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-20 bg-[#1a1d23] flex flex-col items-center py-8 gap-8 rounded-l-3xl">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L9 17L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="text-white text-xs font-semibold">check<span className="font-normal">mark</span></span>
      </div>

      {/* Chart Icon - Active */}
      <div className="w-14 h-14 rounded-full bg-[#ff6b6b] flex items-center justify-center">
        <BarChart3 className="w-6 h-6 text-white" />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-6 mt-4">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Folder className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Star className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
