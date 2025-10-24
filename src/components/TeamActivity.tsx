"use client"

import { ChevronRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function TeamActivity() {
  const activities = [
    {
      id: 1,
      name: "Will Loqso",
      role: "Backend Developer",
      message: "How can i buy the design?",
      time: "5 min ago",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    {
      id: 2,
      name: "Saresh Hosten",
      role: "Project Manager",
      message: "I need react Version asap!",
      time: "10 min ago",
      avatar: "https://i.pravatar.cc/150?img=21"
    }
  ]

  const handleActivityClick = (activityId: number) => {
    console.log('Navigate to conversation:', activityId)
    // Could navigate to messages or team member profile
  }

  const handleReplyClick = (activityId: number) => {
    console.log('Reply to message:', activityId)
    // Could open message compose
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/messages" className="flex items-center gap-2 hover:text-[#ff6b6b] transition-colors">
          <h3 className="text-white font-semibold text-lg">Team Activity</h3>
          <ChevronRight className="w-5 h-5 text-white" />
        </Link>
        <Link href="/messages" className="text-gray-400 hover:text-[#ff6b6b] text-sm transition-colors">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div 
            key={i} 
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#2a2d35]/50 transition-colors group cursor-pointer"
            onClick={() => handleActivityClick(activity.id)}
          >
            <button className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-[#ff6b6b] transition-all">
              <img src={activity.avatar} alt={activity.name} className="w-full h-full object-cover" />
            </button>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-[#ff6b6b] transition-colors">{activity.name}</h4>
                  <p className="text-gray-500 text-xs">{activity.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReplyClick(activity.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4 text-gray-400 hover:text-[#ff6b6b]" />
                  </button>
                </div>
              </div>
              <p className="text-white text-sm">{activity.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
