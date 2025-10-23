"use client"

export default function TopClients() {
  const clients = [
    { name: "Glenda Clevland", amount: "$2,121.88", avatar: "https://i.pravatar.cc/150?img=10" },
    { name: "Tylor Andrews", amount: "$4,731.88", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Patrickson Hills", amount: "$3,331.48", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Joseph Anthony", amount: "$1,931.48", avatar: "https://i.pravatar.cc/150?img=13" },
    { name: "Corey Taylor", amount: "$6,434.99", avatar: "https://i.pravatar.cc/150?img=14" },
  ]

  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Top Clients</h3>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
          <span>Client Name</span>
          <span>Amount</span>
        </div>
        
        {clients.map((client, i) => (
          <div key={i} className="flex items-center justify-between py-3 px-1 hover:bg-[#2a2d35]/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-sm">{client.name}</span>
            </div>
            <span className="text-white text-sm font-medium">{client.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
