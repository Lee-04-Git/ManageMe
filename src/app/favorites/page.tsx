"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Heart, Calendar, Users, CheckCircle, Eye, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Project {
  id: number
  name: string
  description: string
  status: string
  progress: number
  team: string[]
  deadline: string
  priority: string
  color: string
  createdAt: string
  estimatedHours: number
  budget: string
  subtasks?: Array<{
    id: number
    title: string
    completed: boolean
    assignee?: string
  }>
}

export default function Favorites() {
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load favorite projects from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorite-projects')
      if (saved) {
        setFavoriteProjects(JSON.parse(saved))
      }
      setLoading(false)
    }
  }, [])

  const removeFavorite = (projectId: number) => {
    const updatedFavorites = favoriteProjects.filter(p => p.id !== projectId)
    setFavoriteProjects(updatedFavorites)
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const favoriteIds = updatedFavorites.map(p => p.id)
      localStorage.setItem('project-favorites', JSON.stringify(favoriteIds))
      localStorage.setItem('favorite-projects', JSON.stringify(updatedFavorites))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Review":
        return "bg-yellow-500"
      case "Testing":
        return "bg-purple-500"
      case "Planning":
        return "bg-gray-500"
      case "Paused":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-400 bg-red-400/10"
      case "High":
        return "text-orange-400 bg-orange-400/10"
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10"
      case "Low":
        return "text-green-400 bg-green-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1d23] flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Header />
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Loading favorites...</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <Header />
        
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Favorites</h1>
              <p className="text-gray-400">Your favorite projects ({favoriteProjects.length})</p>
            </div>
            <Link 
              href="/projects"
              className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse Projects
            </Link>
          </div>
        </div>

        {favoriteProjects.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-xl mb-2">No Favorite Projects</h3>
            <p className="text-gray-400 mb-6">Start adding projects to your favorites to see them here</p>
            <Link 
              href="/projects"
              className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Find Projects to Favorite
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProjects.map((project) => (
              <div key={project.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${project.color}`}></div>
                    <div>
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="text-white font-semibold hover:text-[#ff6b6b] transition-colors">{project.name}</h3>
                      </Link>
                      <span className="text-[#ff6b6b] text-sm">Project</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFavorite(project.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Heart className="w-5 h-5 fill-current text-red-500" />
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Status and Priority */}
                <div className="flex gap-2 mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Progress</span>
                    <span className="text-white text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Team and Deadline */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{project.team.length} members</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(project.deadline)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex-1 bg-[#1a1d23] hover:bg-gray-700 text-gray-300 py-2 px-3 rounded text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <button
                    onClick={() => removeFavorite(project.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-3 rounded text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}