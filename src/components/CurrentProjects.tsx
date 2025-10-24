"use client"

import { ChevronRight, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { useEscapeKey } from "@/hooks/useKeyboard"

export default function CurrentProjects() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setActiveDropdown(null))
  
  useEscapeKey(() => setActiveDropdown(null))

  const projects = [
    {
      id: 1,
      name: "GMB Vault",
      subtitle: "Website Development",
      completed: 4,
      inProgress: 7,
      pending: 2,
      progressColors: ["bg-green-500", "bg-yellow-500", "bg-pink-500"]
    },
    {
      id: 2,
      name: "Sky Project",
      subtitle: "App Development",
      completed: 9,
      inProgress: 2,
      pending: 2,
      progressColors: ["bg-green-500", "bg-yellow-500", "bg-pink-500"]
    },
    {
      id: 3,
      name: "Task Management",
      subtitle: "Dashboard",
      completed: 2,
      inProgress: 12,
      pending: 2,
      progressColors: ["bg-green-500", "bg-yellow-500", "bg-pink-500"]
    }
  ]

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleProjectClick = (projectId: number) => {
    console.log('Navigate to project:', projectId)
    // Could navigate to project detail page
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/projects" className="flex items-center gap-2 hover:text-[#ff6b6b] transition-colors">
          <h3 className="text-white font-semibold text-lg">Current Project</h3>
          <ChevronRight className="w-5 h-5 text-white" />
        </Link>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div 
            key={i} 
            onClick={() => handleProjectClick(project.id)}
            className="bg-[#2a2d35] rounded-2xl p-5 cursor-pointer hover:bg-[#2f3239] transition-colors group"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="text-white font-semibold mb-1 group-hover:text-[#ff6b6b] transition-colors">{project.name}</h4>
                <p className="text-gray-500 text-xs">{project.subtitle}</p>
              </div>
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDropdownToggle(i)
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {activeDropdown === i && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[120px]"
                  >
                    <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">View Details</button>
                    <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Edit Project</button>
                    <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Add Task</button>
                    <button className="w-full text-left px-3 py-1 text-gray-300 hover:bg-[#2a2d35] text-sm">Share</button>
                    <button className="w-full text-left px-3 py-1 text-red-400 hover:bg-[#2a2d35] text-sm">Delete</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{project.completed}</div>
                  <div className="text-gray-500 text-xs">Completed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <div className="text-yellow-500 text-sm font-bold">{project.inProgress}</div>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{project.inProgress}</div>
                  <div className="text-gray-500 text-xs">In Progress</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <div className="text-pink-500 text-sm font-bold">{project.pending}</div>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{project.pending}</div>
                  <div className="text-gray-500 text-xs">Pending</div>
                </div>
              </div>
            </div>
            
            <div className="h-2 bg-[#1a1d23] rounded-full overflow-hidden flex">
              <div className="bg-green-500 w-[40%]"></div>
              <div className="bg-yellow-500 w-[45%]"></div>
              <div className="bg-pink-500 w-[15%]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
