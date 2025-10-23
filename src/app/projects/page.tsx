import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { Plus, Search, Filter, MoreVertical, Calendar, Users, Clock, CheckCircle } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      status: "In Progress",
      progress: 75,
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      deadline: "Dec 15, 2024",
      priority: "High",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      status: "Review",
      progress: 90,
      team: ["Sarah Wilson", "Alex Thompson"],
      deadline: "Nov 30, 2024",
      priority: "Critical",
      color: "bg-red-500"
    },
    {
      id: 3,
      name: "CRM Dashboard",
      description: "Customer relationship management dashboard for sales teams",
      status: "Planning",
      progress: 25,
      team: ["Michael Chen", "Lisa Brown", "Tom Wilson"],
      deadline: "Jan 20, 2025",
      priority: "Medium",
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "AI Analytics Tool",
      description: "Machine learning analytics platform for business intelligence",
      status: "Completed",
      progress: 100,
      team: ["David Lee", "Emma Davis"],
      deadline: "Oct 15, 2024",
      priority: "Low",
      color: "bg-purple-500"
    },
    {
      id: 5,
      name: "Social Media App",
      description: "Next-generation social media platform with real-time features",
      status: "In Progress",
      progress: 60,
      team: ["Kevin Zhang", "Sophia Martinez", "Ryan Taylor"],
      deadline: "Feb 28, 2025",
      priority: "High",
      color: "bg-pink-500"
    },
    {
      id: 6,
      name: "Learning Management System",
      description: "Educational platform for online courses and assessments",
      status: "Testing",
      progress: 85,
      team: ["Anna Johnson", "Chris Anderson"],
      deadline: "Dec 10, 2024",
      priority: "Medium",
      color: "bg-indigo-500"
    }
  ]

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
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage and track all your projects</p>
          </div>
          
          <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-[#2a2d35] text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
            />
          </div>
          
          <button className="bg-[#2a2d35] hover:bg-[#3a3d45] text-gray-300 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-blue-400">
              {projects.filter(p => p.status === "In Progress").length}
            </p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-400">
              {projects.filter(p => p.status === "Completed").length}
            </p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Avg Progress</h3>
            <p className="text-3xl font-bold text-purple-400">
              {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{project.name}</h3>
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
                  <span>{project.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}