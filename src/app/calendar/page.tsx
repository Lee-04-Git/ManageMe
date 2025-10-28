"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useState } from "react"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Mock data - In a real app, this would come from your backend/state management
  const projects = [
    { id: 1, name: "E-commerce Platform", deadline: new Date(2024, 11, 15), color: "bg-blue-500", priority: "High" },
    { id: 2, name: "Mobile App Redesign", deadline: new Date(2024, 10, 28), color: "bg-purple-500", priority: "Medium" },
    { id: 3, name: "API Integration", deadline: new Date(2024, 10, 30), color: "bg-green-500", priority: "High" }
  ]

  const tasks = [
    { id: 1, name: "Project Setup", dueDate: new Date(2024, 10, 5), project: "E-commerce Platform", assignee: "John Doe", priority: "High", completed: true },
    { id: 2, name: "Database Design", dueDate: new Date(2024, 10, 12), project: "E-commerce Platform", assignee: "Mike Johnson", priority: "High", completed: true },
    { id: 3, name: "API Development", dueDate: new Date(2024, 10, 1), project: "E-commerce Platform", assignee: "Mike Johnson", priority: "High", completed: false },
    { id: 4, name: "Frontend Development", dueDate: new Date(2024, 10, 20), project: "E-commerce Platform", assignee: "Jane Smith", priority: "Medium", completed: false },
    { id: 5, name: "Testing & Deployment", dueDate: new Date(2024, 11, 10), project: "E-commerce Platform", assignee: "John Doe", priority: "Medium", completed: false },
    { id: 6, name: "UI Mockups", dueDate: new Date(2024, 10, 15), project: "Mobile App Redesign", assignee: "Jane Smith", priority: "High", completed: false },
    { id: 7, name: "Authentication API", dueDate: new Date(2024, 10, 25), project: "API Integration", assignee: "Mike Johnson", priority: "Critical", completed: false }
  ]

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayTasks = tasks.filter(task => isSameDay(task.dueDate, date))
    const dayProjects = projects.filter(project => isSameDay(project.deadline, date))
    return { tasks: dayTasks, projects: dayProjects }
  }

  const isToday = (day: number) => {
    const today = new Date()
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return isSameDay(date, today)
  }

  const isPastDate = (day: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    date.setHours(0, 0, 0, 0)
    return date < today
  }

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-400"
      case "High":
        return "text-orange-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  // Get upcoming events for the sidebar
  const upcomingEvents = [
    ...tasks.filter(t => !t.completed).map(t => ({ ...t, type: 'task' as const })),
    ...projects.map(p => ({ ...p, type: 'project' as const, dueDate: p.deadline }))
  ]
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <Header />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CalendarIcon className="w-8 h-8 text-[#ff6b6b]" />
            <h1 className="text-3xl font-bold text-white">Calendar</h1>
          </div>
          <p className="text-gray-400">View project deadlines and task due dates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#2a2d35] rounded-lg p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1d23] rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1a1d23] rounded-lg transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1d23] rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const { tasks: dayTasks, projects: dayProjects } = getEventsForDay(day)
                  const hasEvents = dayTasks.length > 0 || dayProjects.length > 0

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      className={`aspect-square p-2 rounded-lg text-sm transition-colors relative ${
                        isToday(day)
                          ? "bg-[#ff6b6b] text-white font-bold"
                          : isPastDate(day)
                          ? "bg-[#1a1d23] text-gray-500 hover:bg-gray-700"
                          : "bg-[#1a1d23] text-white hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{day}</span>
                        {hasEvents && (
                          <div className="flex gap-1 mt-1">
                            {dayTasks.length > 0 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            )}
                            {dayProjects.length > 0 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-gray-400 text-sm">Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span className="text-gray-400 text-sm">Project Deadlines</span>
                </div>
              </div>
            </div>

            {/* Selected Day Details */}
            {selectedDate && (
              <div className="bg-[#2a2d35] rounded-lg p-6 mt-6">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Events for {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                </h3>
                
                {(() => {
                  const { tasks: dayTasks, projects: dayProjects } = getEventsForDay(selectedDate.getDate())
                  
                  if (dayTasks.length === 0 && dayProjects.length === 0) {
                    return <p className="text-gray-400 text-center py-4">No events for this day</p>
                  }

                  return (
                    <div className="space-y-4">
                      {/* Projects */}
                      {dayProjects.length > 0 && (
                        <div>
                          <h4 className="text-gray-400 text-sm font-medium mb-2">Project Deadlines</h4>
                          <div className="space-y-2">
                            {dayProjects.map((project) => (
                              <div key={project.id} className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg">
                                <div className={`w-3 h-3 rounded-full ${project.color}`} />
                                <div className="flex-1">
                                  <p className="text-white font-medium">{project.name}</p>
                                  <p className={`text-sm ${getPriorityColor(project.priority)}`}>
                                    {project.priority} Priority
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tasks */}
                      {dayTasks.length > 0 && (
                        <div>
                          <h4 className="text-gray-400 text-sm font-medium mb-2">Tasks Due</h4>
                          <div className="space-y-2">
                            {dayTasks.map((task) => (
                              <div key={task.id} className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg">
                                <div className="flex-1">
                                  <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                                    {task.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <p className="text-gray-400 text-sm">{task.project}</p>
                                    <span className="text-gray-500">•</span>
                                    <p className={`text-sm ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </p>
                                  </div>
                                </div>
                                {task.completed && (
                                  <span className="text-green-400 text-xs px-2 py-1 bg-green-400/10 rounded">
                                    Completed
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#2a2d35] rounded-lg p-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#ff6b6b]" />
                Upcoming
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const daysUntil = Math.ceil((event.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  const isOverdue = daysUntil < 0
                  
                  return (
                    <div key={`${event.type}-${index}`} className="p-3 bg-[#1a1d23] rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white font-medium text-sm">{event.name}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          isOverdue 
                            ? 'bg-red-500/20 text-red-400' 
                            : daysUntil === 0 
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {isOverdue 
                            ? `${Math.abs(daysUntil)}d overdue` 
                            : daysUntil === 0 
                            ? 'Today' 
                            : `${daysUntil}d`}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {event.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {'type' in event && event.type === 'task' && 'assignee' in event && (
                          <span className="text-gray-500 text-xs">{event.assignee}</span>
                        )}
                        {'priority' in event && (
                          <span className={`text-xs ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
                {upcomingEvents.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#2a2d35] rounded-lg p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Projects</span>
                  <span className="text-white font-bold">{projects.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Tasks</span>
                  <span className="text-white font-bold">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Completed Tasks</span>
                  <span className="text-green-400 font-bold">{tasks.filter(t => t.completed).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Pending Tasks</span>
                  <span className="text-yellow-400 font-bold">{tasks.filter(t => !t.completed).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
