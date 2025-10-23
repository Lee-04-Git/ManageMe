"use client"

import { ChevronRight } from "lucide-react"

export default function TeamActivity() {
  const activities = [
    {
      name: "Will Loqso",
      role: "Backend Developer",
      message: "How can i buy the design?",
      time: "5 min ago",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    {
      name: "Saresh Hosten",
      role: "Project Manager",
      message: "I need react Version asap!",
      time: "10 min ago",
      avatar: "https://i.pravatar.cc/150?img=21"
    }
  ]

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-white font-semibold text-lg">Team Activity</h3>
        <ChevronRight className="w-5 h-5 text-white" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={activity.avatar} alt={activity.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="text-white font-semibold text-sm">{activity.name}</h4>
                  <p className="text-gray-500 text-xs">{activity.role}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
              <p className="text-white text-sm">{activity.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
