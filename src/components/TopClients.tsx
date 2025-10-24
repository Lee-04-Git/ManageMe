"use client"

import Link from "next/link"

export default function TopClients() {
  const clients = [
    { id: 1, name: "Glenda Clevland", amount: "$2,121.88", avatar: "https://i.pravatar.cc/150?img=10" },
    { id: 2, name: "Tylor Andrews", amount: "$4,731.88", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 3, name: "Patrickson Hills", amount: "$3,331.48", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 4, name: "Joseph Anthony", amount: "$1,931.48", avatar: "https://i.pravatar.cc/150?img=13" },
    { id: 5, name: "Corey Taylor", amount: "$6,434.99", avatar: "https://i.pravatar.cc/150?img=14" },
  ]

  const handleClientClick = (clientId: number) => {
    console.log('Navigate to client profile:', clientId)
    // Could navigate to client detail page
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Top Clients</h3>
        <Link href="/profile" className="text-gray-400 hover:text-[#ff6b6b] text-sm transition-colors">
          View All
        </Link>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
          <span>Client Name</span>
          <span>Amount</span>
        </div>
        
        {clients.map((client, i) => (
          <button
            key={i}
            onClick={() => handleClientClick(client.id)}
            className="w-full flex items-center justify-between py-3 px-1 hover:bg-[#2a2d35]/50 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#ff6b6b] transition-all">
                <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-sm group-hover:text-[#ff6b6b] transition-colors">{client.name}</span>
            </div>
            <span className="text-white text-sm font-medium">{client.amount}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
