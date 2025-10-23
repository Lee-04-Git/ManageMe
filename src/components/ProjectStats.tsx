"use client"

export default function ProjectStats() {
  const data = [
    { inquiries: 85, completion: 30 },
    { inquiries: 100, completion: 15 },
    { inquiries: 60, completion: 35 },
    { inquiries: 95, completion: 100 },
    { inquiries: 70, completion: 50 },
    { inquiries: 80, completion: 45 },
    { inquiries: 100, completion: 65 },
    { inquiries: 60, completion: 45 },
    { inquiries: 80, completion: 25 },
  ]

  return (
    <div className="bg-[#2a2d35] rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-1">Project Stats</h3>
        <p className="text-gray-500 text-xs">04 Days  19 Feb, 2023 - 22 Feb, 2023</p>
      </div>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <span className="text-gray-400 text-xs">Inquiries</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
          <span className="text-gray-400 text-xs">Completion Rate</span>
        </div>
      </div>
      
      <div className="h-48 flex items-end justify-between gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-white rounded-t-lg" style={{ height: `${item.inquiries}%` }}></div>
            <div className="w-full bg-[#ff6b6b] rounded-t-lg" style={{ height: `${item.completion}%` }}></div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <span className="text-gray-500 text-xs">10 Feb, 2023</span>
        <span className="text-gray-500 text-xs">22 Feb, 2023</span>
      </div>
    </div>
  )
}
