"use client"

import { ChevronDown } from "lucide-react"

export default function Calendar() {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const dates = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, null, null, null, null],
  ]

  const highlightedDates = [19, 22, 23, 24, 25]

  return (
    <div className="bg-[#2a2d35] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">February</span>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-center text-gray-500 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {dates.flat().map((date, i) => (
          <div
            key={i}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              ${!date ? 'invisible' : ''}
              ${highlightedDates.includes(date as number) ? 'bg-white text-black font-semibold' : 'text-gray-400'}
              ${date === 22 ? 'relative' : ''}
            `}
          >
            {date}
            {date === 22 && <div className="absolute bottom-0 w-1 h-1 bg-[#ff6b6b] rounded-full"></div>}
            {date === 23 && <div className="absolute bottom-0 w-1 h-1 bg-[#ff6b6b] rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
