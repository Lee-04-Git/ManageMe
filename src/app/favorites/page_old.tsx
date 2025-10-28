"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Heart, Star, Bookmark, MoreVertical, Calendar, Users, ExternalLink, CheckCircle, Eye, Trash2 } from "lucide-react"
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

  const favoriteResources = [
    {
      id: 1,
      name: "React Documentation",
      type: "Resource",
      url: "https://react.dev",
      category: "Documentation",
      addedDate: "Oct 15, 2024",
      icon: "📚"
    },
    {
      id: 2,
      name: "Figma Design System",
      type: "Resource",
      url: "https://figma.com",
      category: "Design",
      addedDate: "Oct 20, 2024",
      icon: "🎨"
    },
    {
      id: 3,
      name: "GitHub Repository",
      type: "Resource",
      url: "https://github.com",
      category: "Code",
      addedDate: "Oct 22, 2024",
      icon: "💻"
    }
  ]

  const favoriteTeamMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      type: "Team Member",
      role: "Senior Developer",
      projects: 5,
      rating: 5,
      avatar: "AT",
      status: "online"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      type: "Team Member",
      role: "UI/UX Designer",
      projects: 3,
      rating: 4,
      avatar: "SW",
      status: "away"
    },
    {
      id: 3,
      name: "Michael Chen",
      type: "Team Member",
      role: "Project Manager",
      projects: 7,
      rating: 5,
      avatar: "MC",
      status: "online"
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    )
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
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white text-sm font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-[#ff6b6b] h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Last updated: {project.lastUpdated}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Clients */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#ff6b6b]" />
            <h2 className="text-xl font-semibold text-white">Favorite Clients</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteClients.map((client) => (
              <div key={client.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{client.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{client.name}</h3>
                      <span className="text-[#ff6b6b] text-sm">{client.type}</span>
                    </div>
                  </div>
                  {renderStars(client.rating)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Projects</span>
                    <p className="text-white font-semibold">{client.projects}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Revenue</span>
                    <p className="text-white font-semibold">{client.revenue}</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  Last contact: {client.lastContact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Resources */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-5 h-5 text-[#ff6b6b]" />
            <h2 className="text-xl font-semibold text-white">Favorite Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteResources.map((resource) => (
              <div key={resource.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{resource.name}</h3>
                      <span className="text-[#ff6b6b] text-xs">{resource.category}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-400">
                  Added: {resource.addedDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Team Members */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#ff6b6b]" />
            <h2 className="text-xl font-semibold text-white">Favorite Team Members</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteTeamMembers.map((member) => (
              <div key={member.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2a2d35] ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">Projects: {member.projects}</span>
                  {renderStars(member.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}