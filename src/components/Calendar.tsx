"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(22)
  const [currentMonth, setCurrentMonth] = useState("February")
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const dates = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, null, null, null, null],
  ]

  const highlightedDates = [19, 22, 23, 24, 25]
  const eventDates = [22, 23] // Dates with events

  const handleDateClick = (date: number | null) => {
    if (date) {
      setSelectedDate(date)
      console.log('Selected date:', date)
      // Could open date details or events
    }
  }

  const handleMonthChange = () => {
    console.log('Change month')
    // Could implement month navigation
  }

  return (
    <div className="bg-[#2a2d35] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-[#1a1d23] rounded">
            <ChevronLeft className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button 
            onClick={handleMonthChange}
            className="flex items-center gap-2 hover:text-[#ff6b6b] transition-colors"
          >
            <span className="text-white font-semibold">{currentMonth}</span>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
          <button className="p-1 hover:bg-[#1a1d23] rounded">
            <ChevronRight className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
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
          <button
            key={i}
            onClick={() => handleDateClick(date)}
            disabled={!date}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg relative transition-all
              ${!date ? 'invisible' : 'hover:bg-[#1a1d23]'}
              ${selectedDate === date ? 'bg-[#ff6b6b] text-white font-bold scale-110' : ''}
              ${highlightedDates.includes(date as number) && selectedDate !== date ? 'bg-white text-black font-semibold' : ''}
              ${!highlightedDates.includes(date as number) && selectedDate !== date ? 'text-gray-400 hover:text-white' : ''}
            `}
          >
            {date}
            {eventDates.includes(date as number) && (
              <div className="absolute bottom-1 w-1 h-1 bg-[#ff6b6b] rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
