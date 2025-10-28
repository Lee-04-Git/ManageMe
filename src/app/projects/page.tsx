"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Users,
  Clock,
  CheckCircle,
<<<<<<< HEAD
  Trash2,
  Star,
=======
  Folder,
>>>>>>> c25b8dd647bf7c96b303bc25364cd45f3c3685f6
} from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
<<<<<<< HEAD
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    deadline: "",
    budget: "",
    color: "bg-blue-500",
    subtasks: [] as { id: number; name: string; completed: boolean }[]
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('project-favorites');
=======
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("project-favorites");
>>>>>>> c25b8dd647bf7c96b303bc25364cd45f3c3685f6
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
<<<<<<< HEAD
=======

>>>>>>> c25b8dd647bf7c96b303bc25364cd45f3c3685f6
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
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication",
      status: "Review",
      progress: 50, // 1 out of 2 subtasks completed
      team: ["Sarah Wilson", "Alex Thompson"],
      deadline: "2024-11-30",
      priority: "Critical",
      color: "bg-red-500",
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
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "AI Analytics Tool",
      description:
        "Machine learning analytics platform for business intelligence",
      status: "Completed",
      progress: 100,
      team: ["David Lee", "Emma Davis"],
      deadline: "Oct 15, 2024",
      priority: "Low",
      color: "bg-purple-500",
    },
    {
      id: 5,
      name: "Social Media App",
      description:
        "Next-generation social media platform with real-time features",
      status: "In Progress",
      progress: 60,
      team: ["Kevin Zhang", "Sophia Martinez", "Ryan Taylor"],
      deadline: "Feb 28, 2025",
      priority: "High",
      color: "bg-pink-500",
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
      color: "bg-indigo-500",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Review":
        return "bg-yellow-500";
      case "Testing":
        return "bg-purple-500";
      case "Planning":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-400 bg-red-400/10";
      case "High":
        return "text-orange-400 bg-orange-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Low":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || project.status === filterStatus;
    const matchesPriority =
      filterPriority === "All" || project.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Favorites management
  const toggleFavorite = (projectId: number) => {
    const newFavorites = favorites.includes(projectId)
      ? favorites.filter((id) => id !== projectId)
      : [...favorites, projectId];

    setFavorites(newFavorites);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("project-favorites", JSON.stringify(newFavorites));

      // Also save to a global favorites list for the favorites page
      const allFavoriteProjects = projects.filter((p) =>
        newFavorites.includes(p.id)
      );
      localStorage.setItem(
        "favorite-projects",
        JSON.stringify(allFavoriteProjects)
      );
    }
  };

  const isFavorite = (projectId: number) => favorites.includes(projectId);

  const updateProjectStatus = (projectId: number, newStatus: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const deleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  // Helper functions for project management
  const updateProjectStatus = (projectId: number, newStatus: string) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, status: newStatus } : p
      )
    )
  }

  const deleteProject = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId))
    }
  }

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setNewProject(prev => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          { id: Date.now(), name: newSubtask, completed: false }
        ]
      }))
      setNewSubtask("")
      setShowSubtaskInput(false)
    }
  }

  const removeSubtask = (subtaskId: number) => {
    setNewProject(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st.id !== subtaskId)
    }))
  }

  const resetNewProjectForm = () => {
    setNewProject({
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      deadline: "",
      budget: "",
      color: "bg-blue-500",
      subtasks: []
    })
    setNewSubtask("")
    setShowSubtaskInput(false)
  }

  const handleProjectAction = (action: string, projectId: number) => {
    const project = projects.find((p) => p.id === projectId);

    switch (action) {
      case "view":
        // Navigate to project detail page
        window.location.href = `/projects/${projectId}`;
        break;
      case "edit":
        // Could open edit modal or navigate to edit page
        console.log("Edit project", projectId);
        break;
      case "pause":
        if (project?.status === "In Progress") {
          updateProjectStatus(projectId, "Paused");
        } else {
          updateProjectStatus(projectId, "In Progress");
        }
        break;
      case "delete":
        deleteProject(projectId);
        break;
      case "favorite":
        toggleFavorite(projectId);
        break;
      default:
        console.log(`${action} project ${projectId}`);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />

      <motion.main
        className="flex-1 p-8 overflow-auto"
        initial={{ opacity: 0.98 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05 }}
      >
        <Header />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">
              Manage and track all your projects ({filteredProjects.length} of{" "}
              {projects.length})
            </p>
          </div>

          <button
            onClick={() => setShowNewProjectModal(true)}
            className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
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

          <button className="bg-[#2a2d35] hover:bg-[#3a3d45] text-gray-300 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Total Projects
            </h3>
            <p className="text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-blue-400">
              {projects.filter((p) => p.status === "In Progress").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">active projects</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-400">
              {projects.filter((p) => p.status === "Completed").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">finished projects</p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Avg Progress
            </h3>
            <p className="text-3xl font-bold text-purple-400">
              {Math.round(
                projects.reduce((acc, p) => acc + p.progress, 0) /
                  projects.length
              )}
              %
            </p>
            <p className="text-xs text-gray-500 mt-1">completion rate</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === project.id ? null : project.id
                      )
                    }
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {activeDropdown === project.id && (
                    <div className="absolute right-0 top-8 bg-[#3a3d45] rounded-lg shadow-lg py-2 min-w-[150px] z-10">
                      <button
                        onClick={() => handleProjectAction("view", project.id)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#4a4d55] hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleProjectAction("edit", project.id)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#4a4d55] hover:text-white transition-colors"
                      >
                        Edit Project
                      </button>
                      <button
                        onClick={() =>
                          handleProjectAction("favorite", project.id)
                        }
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#4a4d55] hover:text-white transition-colors"
                      >
                        {isFavorite(project.id)
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </button>
                      <button
                        onClick={() =>
                          handleProjectAction("delete", project.id)
                        }
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#4a4d55] hover:text-red-300 transition-colors"
                      >
                        Delete Project
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Status and Priority */}
              <div className="flex gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}
                >
                  {project.priority}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#ff6b6b] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Deadline */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.deadline).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={() => window.location.href = `/projects/${project.id}`}
                  className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => toggleFavorite(project.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite(project.id)
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-gray-700 text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isFavorite(project.id) ? 'fill-current' : ''}`} />
                </button>
=======
              {/* Team and Deadline */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">
                    {project.team.length} members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{project.deadline}</span>
                </div>
>>>>>>> c25b8dd647bf7c96b303bc25364cd45f3c3685f6
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
}
