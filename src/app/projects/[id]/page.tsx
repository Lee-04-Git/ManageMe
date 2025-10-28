"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { ArrowLeft, Edit, Trash2, Users, Calendar, Clock, CheckCircle, Play, Pause, Plus, MessageSquare, FileText, Settings, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProjectDetailProps {
  params: { id: string }
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [newTaskData, setNewTaskData] = useState({
    name: "",
    assignee: "",
    priority: "Medium",
    date: ""
  })
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    email: "",
    role: ""
  })
  const [showUploadFileModal, setShowUploadFileModal] = useState(false)
  const [project, setProject] = useState({
    id: parseInt(params.id),
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with React and Node.js built for scalability and performance. This project includes features like user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
    status: "In Progress",
    progress: 40, // 2 out of 5 tasks completed = 40%
    team: [
      { id: 1, name: "John Doe", role: "Full Stack Developer", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Jane Smith", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=2" },
      { id: 3, name: "Mike Johnson", role: "Backend Developer", avatar: "https://i.pravatar.cc/150?img=3" }
    ],
    deadline: "Dec 15, 2024",
    priority: "High",
    color: "bg-blue-500",
    createdDate: "Oct 1, 2024",
    lastUpdated: "Oct 20, 2024",
    budget: "$25,000",
    spent: "$18,500",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    files: [
      { id: 1, name: "Project Requirements.pdf", size: "2.4 MB", uploadedAt: "2 days ago", type: "pdf" },
      { id: 2, name: "UI Mockups v2.sketch", size: "15.7 MB", uploadedAt: "1 day ago", type: "design" },
      { id: 3, name: "Database Schema.sql", size: "456 KB", uploadedAt: "3 hours ago", type: "code" }
    ],
    tasks: [
      { id: 1, name: "Project Setup", completed: true, date: "Oct 5, 2024", priority: "High", assignee: "John Doe" },
      { id: 2, name: "Database Design", completed: true, date: "Oct 12, 2024", priority: "High", assignee: "Mike Johnson" },
      { id: 3, name: "API Development", completed: false, date: "Nov 1, 2024", priority: "High", assignee: "Mike Johnson" },
      { id: 4, name: "Frontend Development", completed: false, date: "Nov 20, 2024", priority: "Medium", assignee: "Jane Smith" },
      { id: 5, name: "Testing & Deployment", completed: false, date: "Dec 10, 2024", priority: "Medium", assignee: "John Doe" }
    ],
    recentActivity: [
      { id: 1, user: "John Doe", action: "completed task", item: "User Authentication API", time: "2 hours ago" },
      { id: 2, user: "Jane Smith", action: "uploaded", item: "UI Mockups v2", time: "4 hours ago" },
      { id: 3, user: "Mike Johnson", action: "commented on", item: "Database Schema", time: "6 hours ago" }
    ]
  })

  // Handler functions
  const handleEditProject = () => {
    setShowEditModal(true)
  }

  const handleDeleteProject = () => {
    setShowDeleteModal(true)
  }

  const handleToggleTask = (taskId: number) => {
    setProject(prev => {
      const updatedTasks = prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      
      // Calculate new progress based on completed tasks
      const completedCount = updatedTasks.filter(t => t.completed).length
      const totalCount = updatedTasks.length
      const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      
      return {
        ...prev,
        tasks: updatedTasks,
        progress: newProgress
      }
    })
  }

  const handleAddTask = (taskData?: any) => {
    // If no task data provided, just open the modal
    if (!taskData) {
      setShowAddTaskModal(true)
      return
    }

    // Format the date to a readable string
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    // Add the task with the provided data
    const newTask = {
      id: Math.max(...project.tasks.map(t => t.id), 0) + 1,
      name: taskData.name,
      completed: false,
      date: formatDate(taskData.date),
      priority: taskData.priority,
      assignee: taskData.assignee
    }

    setProject(prev => {
      const updatedTasks = [...prev.tasks, newTask]
      
      // Recalculate progress based on completed tasks
      const completedCount = updatedTasks.filter(t => t.completed).length
      const totalCount = updatedTasks.length
      const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      
      return {
        ...prev,
        tasks: updatedTasks,
        progress: newProgress
      }
    })

    // Reset form and close modal
    setNewTaskData({
      name: "",
      assignee: "",
      priority: "Medium",
      date: ""
    })
    setShowAddTaskModal(false)
  }

  const handleTaskFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that required fields are filled
    if (!newTaskData.name.trim() || !newTaskData.assignee || !newTaskData.date) {
      alert("Please fill in all required fields")
      return
    }

    // Call handleAddTask with the form data
    handleAddTask(newTaskData)
  }

  const handleDeleteTask = (taskId: number) => {
    setProject(prev => {
      const updatedTasks = prev.tasks.filter(task => task.id !== taskId)
      
      // Recalculate progress based on remaining tasks
      const completedCount = updatedTasks.filter(t => t.completed).length
      const totalCount = updatedTasks.length
      const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
      
      return {
        ...prev,
        tasks: updatedTasks,
        progress: newProgress
      }
    })
  }

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that required fields are filled
    if (!newMemberData.name.trim() || !newMemberData.email.trim() || !newMemberData.role) {
      alert("Please fill in all required fields")
      return
    }

    // Add the new member
    const newMember = {
      id: Math.max(...project.team.map(m => m.id), 0) + 1,
      name: newMemberData.name,
      role: newMemberData.role,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    }

    setProject(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }))

    // Reset form and close modal
    setNewMemberData({
      name: "",
      email: "",
      role: ""
    })
    setShowAddMemberModal(false)
  }

  const handleRemoveMember = (memberId: number) => {
    if (project.team.length <= 1) {
      alert("Cannot remove the last team member")
      return
    }

    if (confirm("Are you sure you want to remove this team member?")) {
      setProject(prev => ({
        ...prev,
        team: prev.team.filter(member => member.id !== memberId)
      }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Get file extension and type
    const fileName = file.name
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''
    
    // Determine file type for icon
    let fileType = 'other'
    if (['pdf'].includes(fileExtension)) fileType = 'pdf'
    else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(fileExtension)) fileType = 'image'
    else if (['js', 'ts', 'jsx', 'tsx', 'sql', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(fileExtension)) fileType = 'code'
    else if (['sketch', 'fig', 'xd', 'psd'].includes(fileExtension)) fileType = 'design'

    // Convert file size to readable format
    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B'
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      else return (bytes / 1048576).toFixed(1) + ' MB'
    }

    const newFile = {
      id: Math.max(...project.files.map(f => f.id), 0) + 1,
      name: fileName,
      size: formatFileSize(file.size),
      uploadedAt: 'Just now',
      type: fileType
    }

    setProject(prev => ({
      ...prev,
      files: [...prev.files, newFile]
    }))

    setShowUploadFileModal(false)
    
    // Reset the input
    e.target.value = ''
  }

  const handleDeleteFile = (fileId: number) => {
    if (confirm("Are you sure you want to delete this file?")) {
      setProject(prev => ({
        ...prev,
        files: prev.files.filter(file => file.id !== fileId)
      }))
    }
  }

  const handleToggleStatus = () => {
    setProject(prev => ({
      ...prev,
      status: prev.status === "In Progress" ? "Paused" : "In Progress"
    }))
  }

  const handleChatOpen = () => {
    setShowChatModal(true)
  }

  const handleAddMember = () => {
    setShowAddMemberModal(true)
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

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <Header />
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
            Projects
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-white">{project.name}</span>
        </div>

        {/* Project Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-4">
            <Link 
              href="/projects"
              className="mt-2 p-2 text-gray-400 hover:text-white hover:bg-[#2a2d35] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${project.color}`}></div>
                <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              </div>
              <p className="text-gray-400 max-w-2xl">{project.description}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium text-white ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority} Priority
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleChatOpen}
              className="bg-[#2a2d35] hover:bg-[#3a3d45] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button 
              onClick={handleEditProject}
              className="bg-[#2a2d35] hover:bg-[#3a3d45] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button 
              onClick={handleToggleStatus}
              className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {project.status === "In Progress" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {project.status === "In Progress" ? "Pause" : "Resume"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex gap-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "tasks", label: "Tasks" },
              { id: "team", label: "Team" },
              { id: "files", label: "Files" },
              { id: "activity", label: "Activity" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#ff6b6b] text-[#ff6b6b]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Progress</p>
                    <p className="text-2xl font-bold text-white">{project.progress}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tasks</p>
                    <p className="text-2xl font-bold text-white">{project.tasks.filter(t => t.completed).length}/{project.tasks.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-green-400 text-sm mt-1">
                  {project.tasks.filter(t => !t.completed).length} pending
                </p>
              </div>

              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Team</p>
                    <p className="text-2xl font-bold text-white">{project.team.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-gray-400 text-sm mt-1">members</p>
              </div>

              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Budget</p>
                    <p className="text-2xl font-bold text-white">{project.spent}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-gray-400 text-sm mt-1">of {project.budget}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#2a2d35] p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-4">Project Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Created Date</p>
                      <p className="text-white">{project.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Updated</p>
                      <p className="text-white">{project.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Deadline</p>
                      <p className="text-white">{project.deadline}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <p className="text-white">{project.status}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2a2d35] p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-[#1a1d23] text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#2a2d35] p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold text-lg">Tasks</h3>
                    <button 
                      onClick={() => setShowAddTaskModal(true)}
                      className="text-gray-400 hover:text-[#ff6b6b] text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Task
                    </button>
                  </div>
                  <div className="space-y-3">
                    {project.tasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-3 bg-[#1a1d23] rounded-lg hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className="flex-shrink-0"
                          >
                            <CheckCircle className={`w-5 h-5 ${task.completed ? 'text-green-400' : 'text-gray-400 hover:text-green-400'} transition-colors`} />
                          </button>
                          <div className="flex-1">
                            <span className={`block ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                              {task.name}
                            </span>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-gray-500 text-xs">{task.assignee}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">{task.date}</span>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team and Activity */}
              <div className="space-y-6">
                <div className="bg-[#2a2d35] p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-4">Team Members</h3>
                  <div className="space-y-3">
                    {project.team.map((member) => (
                      <button 
                        key={member.id} 
                        onClick={() => setActiveTab("team")}
                        className="w-full flex items-center gap-3 p-2 hover:bg-[#1a1d23] rounded-lg transition-colors text-left"
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full ring-2 ring-transparent hover:ring-[#ff6b6b] transition-all"
                        />
                        <div>
                          <p className="text-white font-medium group-hover:text-[#ff6b6b] transition-colors">{member.name}</p>
                          <p className="text-gray-400 text-sm">{member.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={handleAddMember}
                    className="w-full mt-4 bg-[#1a1d23] hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                <div className="bg-[#2a2d35] p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {project.recentActivity.map((activity) => (
                      <div key={activity.id} className="text-sm">
                        <p className="text-white">
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-gray-400"> {activity.action} </span>
                          <span className="text-[#ff6b6b]">{activity.item}</span>
                        </p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">Project Tasks</h3>
              <button 
                onClick={() => setShowAddTaskModal(true)}
                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do */}
              <div className="bg-[#2a2d35] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  To Do ({project.tasks.filter(t => !t.completed).length})
                </h4>
                <div className="space-y-3">
                  {project.tasks.filter(t => !t.completed).map((task) => (
                    <div key={task.id} className="bg-[#1a1d23] p-4 rounded-lg hover:bg-gray-700 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium flex-1">{task.name}</h5>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            title="Mark as complete"
                          >
                            <CheckCircle className="w-4 h-4 text-gray-400 hover:text-green-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Due: {task.date}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-400 text-xs">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                  {project.tasks.filter(t => !t.completed).length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">No pending tasks</p>
                  )}
                </div>
              </div>

              {/* In Progress (same as To Do for now - you can add status field later) */}
              <div className="bg-[#2a2d35] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  All Tasks ({project.tasks.length})
                </h4>
                <div className="space-y-3">
                  {project.tasks.map((task) => (
                    <div key={task.id} className="bg-[#1a1d23] p-4 rounded-lg hover:bg-gray-700 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className={`font-medium flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {task.name}
                        </h5>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleToggleTask(task.id)}
                            title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                          >
                            <CheckCircle className={`w-4 h-4 ${task.completed ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">Due: {task.date}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-400 text-xs">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed */}
              <div className="bg-[#2a2d35] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Completed ({project.tasks.filter(t => t.completed).length})
                </h4>
                <div className="space-y-3">
                  {project.tasks.filter(t => t.completed).map((task) => (
                    <div key={task.id} className="bg-[#1a1d23] p-4 rounded-lg opacity-75 hover:opacity-100 transition-opacity group">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-gray-400 line-through font-medium flex-1">{task.name}</h5>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">Completed: {task.date}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-500 text-xs">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                  {project.tasks.filter(t => t.completed).length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">No completed tasks</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">Team Members</h3>
              <button 
                onClick={handleAddMember}
                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.team.map((member) => (
                <div key={member.id} className="bg-[#2a2d35] p-6 rounded-lg relative group">
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                    title="Remove member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{member.name}</h4>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasks Assigned</span>
                      <span className="text-white">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasks Completed</span>
                      <span className="text-green-400">6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Completion Rate</span>
                      <span className="text-white">75%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#1a1d23] hover:bg-gray-700 text-gray-300 py-2 px-3 rounded text-sm transition-colors">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Message
                    </button>
                    <button className="bg-[#1a1d23] hover:bg-gray-700 text-gray-300 p-2 rounded transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Team Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{project.team.length}</p>
                  <p className="text-gray-400 text-sm">Total Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">18</p>
                  <p className="text-gray-400 text-sm">Tasks Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">4</p>
                  <p className="text-gray-400 text-sm">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">75%</p>
                  <p className="text-gray-400 text-sm">Avg Performance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">Project Files</h3>
              <button 
                onClick={() => setShowUploadFileModal(true)}
                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Upload File
              </button>
            </div>

            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <div className="space-y-4">
                {project.files.map((file) => {
                  // Determine icon color based on file type
                  const getFileColor = (type: string) => {
                    switch (type) {
                      case 'pdf': return 'text-blue-400'
                      case 'image': return 'text-green-400'
                      case 'code': return 'text-purple-400'
                      case 'design': return 'text-pink-400'
                      default: return 'text-gray-400'
                    }
                  }

                  return (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-[#1a1d23] rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <FileText className={`w-8 h-8 ${getFileColor(file.type)}`} />
                        <div>
                          <h4 className="text-white font-medium">{file.name}</h4>
                          <p className="text-gray-400 text-sm">{file.size} • Uploaded {file.uploadedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-white p-1" title="View file">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-white p-1" title="Edit file">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-gray-400 hover:text-red-400 p-1" 
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
                {project.files.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No files uploaded yet. Click "Upload File" to add files to your project.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <h4 className="text-white font-semibold mb-4">Storage Usage</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Used Storage</span>
                      <span className="text-white">{project.files.length} files uploaded</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-[#ff6b6b] h-2 rounded-full w-1/12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a2d35] p-6 rounded-lg">
                <h4 className="text-white font-semibold mb-4">File Types</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">PDFs</span>
                    <span className="text-white">{project.files.filter(f => f.type === 'pdf').length} files</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Images</span>
                    <span className="text-white">{project.files.filter(f => f.type === 'image').length} files</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Code Files</span>
                    <span className="text-white">{project.files.filter(f => f.type === 'code').length} files</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Design Files</span>
                    <span className="text-white">{project.files.filter(f => f.type === 'design').length} files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Activity Timeline</h3>
            
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=1" alt="John" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">John Doe</h4>
                      <span className="text-gray-500 text-sm">completed task</span>
                      <span className="text-[#ff6b6b] font-medium">User Authentication API</span>
                    </div>
                    <p className="text-gray-400 text-sm">Successfully implemented JWT authentication with refresh tokens</p>
                    <p className="text-gray-500 text-xs mt-2">2 hours ago</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                </div>

                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=2" alt="Jane" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">Jane Smith</h4>
                      <span className="text-gray-500 text-sm">uploaded</span>
                      <span className="text-[#ff6b6b] font-medium">UI Mockups v2.sketch</span>
                    </div>
                    <p className="text-gray-400 text-sm">Updated product catalog and checkout flow designs</p>
                    <p className="text-gray-500 text-xs mt-2">4 hours ago</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-500 mt-1" />
                </div>

                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=3" alt="Mike" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">Mike Johnson</h4>
                      <span className="text-gray-500 text-sm">commented on</span>
                      <span className="text-[#ff6b6b] font-medium">Database Schema</span>
                    </div>
                    <p className="text-gray-400 text-sm">"Looking good! Should we add indexing for the product search queries?"</p>
                    <p className="text-gray-500 text-xs mt-2">6 hours ago</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-purple-500 mt-1" />
                </div>

                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=1" alt="John" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">John Doe</h4>
                      <span className="text-gray-500 text-sm">started task</span>
                      <span className="text-[#ff6b6b] font-medium">Payment Integration</span>
                    </div>
                    <p className="text-gray-400 text-sm">Beginning Stripe payment gateway integration</p>
                    <p className="text-gray-500 text-xs mt-2">1 day ago</p>
                  </div>
                  <Play className="w-5 h-5 text-yellow-500 mt-1" />
                </div>

                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=2" alt="Jane" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">Jane Smith</h4>
                      <span className="text-gray-500 text-sm">created milestone</span>
                      <span className="text-[#ff6b6b] font-medium">Frontend Development</span>
                    </div>
                    <p className="text-gray-400 text-sm">Set up milestone for frontend development phase</p>
                    <p className="text-gray-500 text-xs mt-2">2 days ago</p>
                  </div>
                  <Calendar className="w-5 h-5 text-indigo-500 mt-1" />
                </div>

                <div className="flex items-start gap-4">
                  <img src="https://i.pravatar.cc/150?img=3" alt="Mike" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">Mike Johnson</h4>
                      <span className="text-gray-500 text-sm">joined project</span>
                    </div>
                    <p className="text-gray-400 text-sm">Added as Backend Developer</p>
                    <p className="text-gray-500 text-xs mt-2">3 days ago</p>
                  </div>
                  <Users className="w-5 h-5 text-green-500 mt-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-white font-semibold text-lg mb-4">Edit Project</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Project Name</label>
                  <input
                    type="text"
                    defaultValue={project.name}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea
                    defaultValue={project.description}
                    rows={4}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select 
                      defaultValue={project.status}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Testing">Testing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Priority</label>
                    <select 
                      defaultValue={project.priority}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Deadline</label>
                    <input
                      type="date"
                      defaultValue="2024-12-15"
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Budget</label>
                    <input
                      type="text"
                      defaultValue={project.budget}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowEditModal(false)
                      // Handle form submission here
                    }}
                    className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-3 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Project Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-md">
              <h3 className="text-white font-semibold text-lg mb-4">Delete Project</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete "{project.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    // Handle delete here - redirect to projects page
                    window.location.href = '/projects'
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Member Modal */}
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-md">
              <h3 className="text-white font-semibold text-lg mb-4">Add Team Member</h3>
              <form className="space-y-4" onSubmit={handleAddMemberSubmit}>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Member Name *</label>
                  <input
                    type="text"
                    placeholder="Enter member name"
                    value={newMemberData.name}
                    onChange={(e) => setNewMemberData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="member@example.com"
                    value={newMemberData.email}
                    onChange={(e) => setNewMemberData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role *</label>
                  <select 
                    value={newMemberData.role}
                    onChange={(e) => setNewMemberData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddMemberModal(false)
                      setNewMemberData({
                        name: "",
                        email: "",
                        role: ""
                      })
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-3 rounded-lg transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-md">
              <h3 className="text-white font-semibold text-lg mb-4">Add New Task</h3>
              <form className="space-y-4" onSubmit={handleTaskFormSubmit}>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Task Title *</label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTaskData.name}
                    onChange={(e) => setNewTaskData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Assignee *</label>
                    <select 
                      value={newTaskData.assignee}
                      onChange={(e) => setNewTaskData(prev => ({ ...prev, assignee: e.target.value }))}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                      required
                    >
                      <option value="">Select assignee</option>
                      {project.team.map((member) => (
                        <option key={member.id} value={member.name}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Priority</label>
                    <select 
                      value={newTaskData.priority}
                      onChange={(e) => setNewTaskData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={newTaskData.date}
                    onChange={(e) => setNewTaskData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTaskModal(false)
                      setNewTaskData({
                        name: "",
                        assignee: "",
                        priority: "Medium",
                        date: ""
                      })
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-3 rounded-lg transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold text-lg">Project Chat - {project.name}</h3>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img src="https://i.pravatar.cc/150?img=1" alt="John" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-gray-300 text-sm">John Doe</p>
                      <p className="text-white">Hey team! The API development is going well. Should have it done by tomorrow.</p>
                      <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img src="https://i.pravatar.cc/150?img=2" alt="Jane" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-gray-300 text-sm">Jane Smith</p>
                      <p className="text-white">Great! I've updated the UI designs. Can someone review them?</p>
                      <p className="text-gray-500 text-xs mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                  />
                  <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload File Modal */}
        {showUploadFileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2d35] rounded-lg p-6 w-full max-w-md">
              <h3 className="text-white font-semibold text-lg mb-4">Upload File</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Select File</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.svg,.webp,.js,.ts,.jsx,.tsx,.sql,.py,.java,.cpp,.c,.html,.css,.sketch,.fig,.xd,.psd"
                      className="w-full bg-[#1a1d23] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#ff6b6b] file:text-white hover:file:bg-[#ff5252] file:cursor-pointer"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Supported formats: PDF, Images (JPG, PNG, GIF, SVG), Code files (JS, TS, SQL, Python, etc.), Design files (Sketch, Figma, XD)
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadFileModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}