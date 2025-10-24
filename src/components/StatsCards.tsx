"use client"

import { ChevronRight, TrendingUp, MoreVertical, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { useEscapeKey } from "@/hooks/useKeyboard"

export default function StatsCards() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setActiveDropdown(null))
  
  useEscapeKey(() => setActiveDropdown(null))

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleCardClick = (cardType: string) => {
    // Navigate to relevant sections
    switch(cardType) {
      case 'new-project':
        // Could navigate to projects page or open new project modal
        console.log('Navigate to new project creation')
        break
      case 'upcoming':
        // Could navigate to calendar or upcoming projects
        console.log('Navigate to upcoming projects')
        break
      case 'completed':
        // Could navigate to completed projects
        console.log('Navigate to completed projects')
        break
      case 'progress':
        // Could navigate to progress tracking
        console.log('Navigate to progress tracking')
        break
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white text-lg">Overview</span>
        <ChevronRight className="w-5 h-5 text-white" />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {/* New Project Card */}
        <div 
          onClick={() => handleCardClick('new-project')}
          className="bg-[#2a2d35] rounded-2xl p-5 cursor-pointer hover:bg-[#2f3239] transition-colors group"
        >
          <div className="flex items-start justify-between mb-4">
            <Link href="/projects" className="flex items-center gap-2 group-hover:text-[#ff6b6b] transition-colors">
              <div className="w-8 h-8 rounded bg-[#ff6b6b] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">New Project</span>
            </Link>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDropdownToggle(0)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {activeDropdown === 0 && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[120px]"
                >
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">View Details</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Edit</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Share</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-2">
              <div className="flex -space-x-2">
                <button className="w-6 h-6 rounded-full border-2 border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                  <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-full h-full object-cover" />
                </button>
                <button className="w-6 h-6 rounded-full border-2 border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                  <img src="https://i.pravatar.cc/150?img=2" alt="" className="w-full h-full object-cover" />
                </button>
                <button className="w-6 h-6 rounded-full border-2 border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                  <img src="https://i.pravatar.cc/150?img=3" alt="" className="w-full h-full object-cover" />
                </button>
              </div>
              <span className="text-gray-400 text-xs ml-1">+1</span>
            </div>
          </div>
          
          <div className="text-white text-sm mb-1">+20 New Task</div>
          <div className="text-xs text-gray-400 mb-3">+ 29.44%</div>
          <div className="text-xs text-gray-500 mb-3">From Last Week</div>
          
          <div className="flex gap-2 mb-2">
            <div className="flex-1 bg-white rounded-full h-12"></div>
            <div className="flex-1 bg-white rounded-full h-12"></div>
            <div className="flex-1 bg-white rounded-full h-12"></div>
            <div className="flex-1 bg-white rounded-full h-12"></div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex -space-x-1">
              <button className="w-4 h-4 rounded-full border border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                <img src="https://i.pravatar.cc/150?img=4" alt="" className="w-full h-full object-cover" />
              </button>
              <button className="w-4 h-4 rounded-full border border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                <img src="https://i.pravatar.cc/150?img=5" alt="" className="w-full h-full object-cover" />
              </button>
              <button className="w-4 h-4 rounded-full border border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                <img src="https://i.pravatar.cc/150?img=6" alt="" className="w-full h-full object-cover" />
              </button>
              <button className="w-4 h-4 rounded-full border border-[#2a2d35] overflow-hidden hover:scale-110 transition-transform">
                <img src="https://i.pravatar.cc/150?img=7" alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Project Card */}
        <div 
          onClick={() => handleCardClick('upcoming')}
          className="bg-[#2a2d35] rounded-2xl p-5 cursor-pointer hover:bg-[#2f3239] transition-colors group"
        >
          <div className="flex items-start justify-between mb-8">
            <Link href="/projects" className="flex items-center gap-2 group-hover:text-[#ff6b6b] transition-colors">
              <div className="w-8 h-8 rounded bg-[#ff6b6b] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Upcoming Project</span>
            </Link>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDropdownToggle(1)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {activeDropdown === 1 && (
                <div className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">View Details</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Edit</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Share</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-white text-5xl font-bold">05</span>
            <TrendingUp className="w-5 h-5 text-white mb-2" />
          </div>
          
          <div className="mt-2">
            <div className="text-xs text-gray-400">+ 10.64%</div>
            <div className="text-xs text-gray-500">From Last Week</div>
          </div>
        </div>

        {/* Project Completed Card */}
        <div 
          onClick={() => handleCardClick('completed')}
          className="bg-[#2a2d35] rounded-2xl p-5 cursor-pointer hover:bg-[#2f3239] transition-colors group"
        >
          <div className="flex items-start justify-between mb-8">
            <Link href="/projects" className="flex items-center gap-2 group-hover:text-[#ff6b6b] transition-colors">
              <div className="w-8 h-8 rounded bg-[#ff6b6b] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Project Completed</span>
            </Link>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDropdownToggle(2)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {activeDropdown === 2 && (
                <div className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">View Details</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Edit</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Share</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-white text-5xl font-bold">25</span>
            <TrendingUp className="w-5 h-5 text-white mb-2" />
          </div>
          
          <div className="mt-2">
            <div className="text-xs text-gray-400">+ 12.52%</div>
            <div className="text-xs text-gray-500">From Last Week</div>
          </div>
        </div>

        {/* Weekly Progress Card */}
        <div 
          onClick={() => handleCardClick('progress')}
          className="bg-[#2a2d35] rounded-2xl p-5 cursor-pointer hover:bg-[#2f3239] transition-colors group"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-2 group-hover:text-[#ff6b6b] transition-colors">
              <div className="w-8 h-8 rounded bg-[#ff6b6b] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Weekly Progress</span>
            </div>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleDropdownToggle(3)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {activeDropdown === 3 && (
                <div className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">View Details</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Edit</button>
                  <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Share</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-white text-sm mb-1">70% Completed</div>
            </div>
            <div className="text-white text-sm">18/30</div>
          </div>
        </div>
      </div>
    </div>
  )
}
