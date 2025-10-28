"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Plus, Search, Filter, MoreVertical, Calendar, Users, Clock, CheckCircle, Grid3X3, List, Eye, Edit, Trash2, Play, Pause, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useClickOutside } from "@/hooks/useClickOutside"

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('project-favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      status: "In Progress",
      progress: 50, // 2 out of 4 subtasks completed
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      deadline: "2024-12-15",
      priority: "High",
      color: "bg-blue-500",
      createdAt: new Date().toISOString(),
      estimatedHours: 200,
      budget: "$25,000",
      subtasks: [
        { id: 1, name: "Setup project structure", completed: true, assignee: "John Doe" },
        { id: 2, name: "Design database schema", completed: true, assignee: "Mike Johnson" },
        { id: 3, name: "Implement authentication", completed: false, assignee: "John Doe" },
        { id: 4, name: "Create product catalog", completed: false, assignee: "Jane Smith" }
      ]
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      status: "Review",
      progress: 50, // 1 out of 2 subtasks completed
      team: ["Sarah Wilson", "Alex Thompson"],
      deadline: "2024-11-30",
      priority: "Critical",
      color: "bg-red-500",
      createdAt: new Date().toISOString(),
      estimatedHours: 300,
      budget: "$40,000",
      subtasks: [
        { id: 1, name: "Security audit", completed: true, assignee: "Sarah Wilson" },
        { id: 2, name: "Performance testing", completed: false, assignee: "Alex Thompson" }
      ]
    }
  ])
  
  // New project form state
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "Medium",
    deadline: "",
    estimatedHours: "",
    budget: "",
    color: "bg-blue-500",
    subtasks: [] as Array<{id: number, name: string, completed: boolean, assignee: string}>
  })
  
  const [showSubtaskInput, setShowSubtaskInput] = useState(false)
  const [newSubtask, setNewSubtask] = useState("")
  
  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setActiveDropdown(null))

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNewProjectModal(false)
        setActiveDropdown(null)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Sync favorite projects with localStorage whenever projects or favorites change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allFavoriteProjects = projects.filter(p => favorites.includes(p.id))
      localStorage.setItem('favorite-projects', JSON.stringify(allFavoriteProjects))
    }
  }, [projects, favorites])



  // Utility functions
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No deadline'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const calculateProgress = (subtasks: any[]) => {
    if (!subtasks || subtasks.length === 0) return 0
    const completed = subtasks.filter(task => task.completed).length
    return Math.round((completed / subtasks.length) * 100)
  }

  // Project creation and management functions
  const resetNewProjectForm = () => {
    setNewProject({
      name: "",
      description: "",
      priority: "Medium",
      deadline: "",
      estimatedHours: "",
      budget: "",
      color: "bg-blue-500",
      subtasks: []
    })
    setShowSubtaskInput(false)
    setNewSubtask("")
  }

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setNewProject(prev => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          {
            id: Date.now(),
            name: newSubtask.trim(),
            completed: false,
            assignee: ""
          }
        ]
      }))
      setNewSubtask("")
    }
  }

  const removeSubtask = (subtaskId: number) => {
    setNewProject(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(task => task.id !== subtaskId)
    }))
  }

  const createProject = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newProject.name.trim()) {
      alert("Project name is required")
      return
    }

    const project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      status: "Planning" as const,
      progress: calculateProgress(newProject.subtasks),
      team: [], // Will be populated when team members are added
      deadline: newProject.deadline,
      priority: newProject.priority,
      color: newProject.color,
      createdAt: new Date().toISOString(),
      estimatedHours: parseInt(newProject.estimatedHours) || 0,
      budget: newProject.budget,
      subtasks: newProject.subtasks
    }

    setProjects(prev => [project, ...prev])
    resetNewProjectForm()
    setShowNewProjectModal(false)
  }

  const deleteProject = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(prev => prev.filter(p => p.id !== projectId))
    }
  }

  const updateProjectStatus = (projectId: number, newStatus: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, status: newStatus as any }
        : p
    ))
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

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || project.status === filterStatus
    const matchesPriority = filterPriority === "All" || project.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Favorites management
  const toggleFavorite = (projectId: number) => {
    const newFavorites = favorites.includes(projectId)
      ? favorites.filter(id => id !== projectId)
      : [...favorites, projectId]
    
    setFavorites(newFavorites)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('project-favorites', JSON.stringify(newFavorites))
      
      // Also save to a global favorites list for the favorites page
      const allFavoriteProjects = projects.filter(p => newFavorites.includes(p.id))
      localStorage.setItem('favorite-projects', JSON.stringify(allFavoriteProjects))
    }
  }

  const isFavorite = (projectId: number) => favorites.includes(projectId)

  const handleProjectAction = (action: string, projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    
    switch (action) {
      case "view":
        // Navigate to project detail page
        window.location.href = `/projects/${projectId}`
        break
      case "edit":
        // Could open edit modal or navigate to edit page
        console.log("Edit project", projectId)
        break
      case "pause":
        if (project?.status === "In Progress") {
          updateProjectStatus(projectId, "Paused")
        } else {
          updateProjectStatus(projectId, "In Progress")
        }
        break
      case "delete":
        deleteProject(projectId)
        break
      case "favorite":
        toggleFavorite(projectId)
        break
      default:
        console.log(`${action} project ${projectId}`)
    }
    setActiveDropdown(null)
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <Header />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage and track all your projects ({filteredProjects.length} of {projects.length})</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-[#2a2d35] rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid" ? "bg-[#ff6b6b] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list" ? "bg-[#ff6b6b] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setShowNewProjectModal(true)}
              className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-[#2a2d35] text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#2a2d35] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Testing">Testing</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#2a2d35] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
          >
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || filterStatus !== "All" || filterPriority !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setFilterStatus("All")
                setFilterPriority("All")
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2a2d35] p-6 rounded-lg hover:bg-[#3a3d45] transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-white">{filteredProjects.length}</p>
            <p className="text-xs text-gray-500 mt-1">of {projects.length} total</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg hover:bg-[#3a3d45] transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-blue-400">
              {filteredProjects.filter(p => p.status === "In Progress").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">active projects</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg hover:bg-[#3a3d45] transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-400">
              {filteredProjects.filter(p => p.status === "Completed").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">finished projects</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg hover:bg-[#3a3d45] transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Avg Progress</h3>
            <p className="text-3xl font-bold text-purple-400">
              {filteredProjects.length > 0 ? Math.round(filteredProjects.reduce((acc, p) => acc + p.progress, 0) / filteredProjects.length) : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">completion rate</p>
          </div>
        </div>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No projects found</div>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => setShowNewProjectModal(true)}
              className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create First Project
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(project.id)
                      }}
                      className={`p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                        isFavorite(project.id) 
                          ? 'text-red-500 opacity-100' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDropdown(activeDropdown === project.id ? null : project.id)
                      }}
                      className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeDropdown === project.id && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[160px]"
                      >
                        <button 
                          onClick={() => handleProjectAction("view", project.id)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button 
                          onClick={() => handleProjectAction("edit", project.id)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Project
                        </button>
                        <button 
                          onClick={() => handleProjectAction("pause", project.id)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                        >
                          {project.status === "In Progress" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          {project.status === "In Progress" ? "Pause" : "Resume"}
                        </button>
                        <button 
                          onClick={() => handleProjectAction("favorite", project.id)}
                          className={`w-full text-left px-3 py-2 hover:bg-[#2a2d35] text-sm flex items-center gap-2 ${
                            isFavorite(project.id) ? 'text-red-400' : 'text-gray-300'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                          {isFavorite(project.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        <hr className="my-1 border-gray-600" />
                        <button 
                          onClick={() => handleProjectAction("delete", project.id)}
                          className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Project
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <Link href={`/projects/${project.id}`}>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#ff6b6b] transition-colors">{project.name}</h3>
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

                  {/* Team, Tasks and Deadline */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{project.team.length} members</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>{project.subtasks ? project.subtasks.filter(t => t.completed).length : 0}/{project.subtasks ? project.subtasks.length : 0} tasks</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(project.deadline)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${project.color}`}></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(project.id)
                        }}
                        className={`p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                          isFavorite(project.id) 
                            ? 'text-red-500 opacity-100' 
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="text-white font-semibold text-lg group-hover:text-[#ff6b6b] transition-colors">{project.name}</h3>
                        <p className="text-gray-400 text-sm">{project.description}</p>
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {/* Status */}
                      <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      
                      {/* Priority */}
                      <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                      
                      {/* Progress */}
                      <div className="w-24">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Team */}
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{project.team.length}</span>
                      </div>
                      
                      {/* Tasks */}
                      <div className="flex items-center text-gray-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{project.subtasks ? project.subtasks.filter(t => t.completed).length : 0}/{project.subtasks ? project.subtasks.length : 0}</span>
                      </div>
                      
                      {/* Deadline */}
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{formatDate(project.deadline)}</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === project.id ? null : project.id)}
                          className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {activeDropdown === project.id && (
                          <div 
                            ref={dropdownRef}
                            className="absolute right-0 top-6 bg-[#1a1d23] rounded-lg shadow-lg py-2 z-10 min-w-[160px]"
                          >
                            <button 
                              onClick={() => handleProjectAction("view", project.id)}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button 
                              onClick={() => handleProjectAction("edit", project.id)}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Project
                            </button>
                            <button 
                              onClick={() => handleProjectAction("pause", project.id)}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                            >
                              {project.status === "In Progress" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              {project.status === "In Progress" ? "Pause" : "Resume"}
                            </button>
                            <button 
                              onClick={() => handleProjectAction("favorite", project.id)}
                              className={`w-full text-left px-3 py-2 hover:bg-[#2a2d35] text-sm flex items-center gap-2 ${
                                isFavorite(project.id) ? 'text-red-400' : 'text-gray-300'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                              {isFavorite(project.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                            <hr className="my-1 border-gray-600" />
                            <button 
                              onClick={() => handleProjectAction("delete", project.id)}
                              className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#2a2d35] text-sm flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Project
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-white font-semibold text-xl mb-6">Create New Project</h3>
              <form onSubmit={createProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Project Name *</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter project name"
                      className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Color Theme</label>
                    <div className="flex gap-2">
                      {["bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewProject(prev => ({ ...prev, color }))}
                          className={`w-8 h-8 rounded-full ${color} ${newProject.color === color ? 'ring-2 ring-white' : ''} hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project goals and requirements"
                    rows={3}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Priority</label>
                    <select 
                      value={newProject.priority}
                      onChange={(e) => setNewProject(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Deadline</label>
                    <input
                      type="date"
                      value={newProject.deadline}
                      onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Est. Hours</label>
                    <input
                      type="number"
                      value={newProject.estimatedHours}
                      onChange={(e) => setNewProject(prev => ({ ...prev, estimatedHours: e.target.value }))}
                      placeholder="40"
                      min="1"
                      className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Budget (Optional)</label>
                  <input
                    type="text"
                    value={newProject.budget}
                    onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="$10,000"
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                  />
                </div>

                {/* Subtasks Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-gray-400 text-sm font-medium">Subtasks</label>
                    <button
                      type="button"
                      onClick={() => setShowSubtaskInput(!showSubtaskInput)}
                      className="text-[#ff6b6b] hover:text-[#ff5252] text-sm flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Subtask
                    </button>
                  </div>

                  {showSubtaskInput && (
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        placeholder="Enter subtask name"
                        className="flex-1 bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                      />
                      <button
                        type="button"
                        onClick={addSubtask}
                        className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {newProject.subtasks.length > 0 && (
                    <div className="space-y-2">
                      {newProject.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center justify-between bg-[#1a1d23] px-4 py-3 rounded-lg">
                          <span className="text-white">{subtask.name}</span>
                          <button
                            type="button"
                            onClick={() => removeSubtask(subtask.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-600">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewProjectModal(false)
                      resetNewProjectForm()
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}