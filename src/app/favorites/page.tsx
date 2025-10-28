"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Heart,
  Star,
  Bookmark,
  MoreVertical,
  Calendar,
  Users,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Favorites() {
  const favoriteProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      type: "Project",
      description: "Modern e-commerce solution with React and Node.js",
      status: "In Progress",
      progress: 75,
      lastUpdated: "2 hours ago",
      icon: "📱",
      color: "bg-blue-500",
      priority: "High",
      deadline: "2024-12-15",
    },
    {
      id: 2,
      name: "AI Analytics Tool",
      type: "Project",
      description:
        "Machine learning analytics platform for business intelligence",
      status: "Completed",
      progress: 100,
      lastUpdated: "1 day ago",
      icon: "🤖",
      color: "bg-purple-500",
      priority: "Medium",
      deadline: "2024-10-15",
    },
  ];

  const favoriteClients = [
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "Client",
      projects: 3,
      revenue: "$45,000",
      lastContact: "Yesterday",
      rating: 5,
      icon: "🏢",
    },
    {
      id: 2,
      name: "StartupXYZ",
      type: "Client",
      projects: 2,
      revenue: "$28,500",
      lastContact: "3 days ago",
      rating: 4,
      icon: "🚀",
    },
  ];

  const favoriteResources = [
    {
      id: 1,
      name: "React Documentation",
      type: "Resource",
      url: "https://react.dev",
      category: "Documentation",
      addedDate: "Oct 15, 2024",
      icon: "📚",
    },
    {
      id: 2,
      name: "Figma Design System",
      type: "Resource",
      url: "https://figma.com",
      category: "Design",
      addedDate: "Oct 20, 2024",
      icon: "🎨",
    },
    {
      id: 3,
      name: "GitHub Repository",
      type: "Resource",
      url: "https://github.com",
      category: "Code",
      addedDate: "Oct 22, 2024",
      icon: "💻",
    },
  ];

  const favoriteTeamMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      type: "Team Member",
      role: "Senior Developer",
      projects: 5,
      rating: 5,
      avatar: "AT",
      status: "online",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      type: "Team Member",
      role: "UI/UX Designer",
      projects: 3,
      rating: 4,
      avatar: "SW",
      status: "away",
    },
    {
      id: 3,
      name: "Michael Chen",
      type: "Team Member",
      role: "Project Manager",
      projects: 7,
      rating: 5,
      avatar: "MC",
      status: "online",
    },
  ];

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
      case "Critical":
        return "bg-red-500/20 text-red-400";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "Low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const removeFavorite = (id: number) => {
    console.log(`Removing favorite ${id}`);
    // Implement actual removal logic here
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Favorites</h1>
          <p className="text-gray-400">
            Your bookmarked projects, clients, resources, and team members
          </p>
        </div>

        {/* Favorite Projects */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-5 h-5 text-[#ff6b6b]" />
            <h2 className="text-xl font-semibold text-white">
              Favorite Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${project.color}`}></div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {project.name}
                      </h3>
                      <span className="text-[#ff6b6b] text-sm">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFavorite(project.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Heart className="w-5 h-5 fill-current text-red-500" />
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#ff6b6b] h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Last updated: {project.lastUpdated}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      project.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
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
            <h2 className="text-xl font-semibold text-white">
              Favorite Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteClients.map((client) => (
              <div
                key={client.id}
                className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{client.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">
                        {client.name}
                      </h3>
                      <span className="text-[#ff6b6b] text-sm">
                        {client.type}
                      </span>
                    </div>
                  </div>
                  {renderStars(client.rating)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Projects</span>
                    <p className="text-white font-semibold">
                      {client.projects}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Revenue</span>
                    <p className="text-white font-semibold">
                      {client.revenue}
                    </p>
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
            <h2 className="text-xl font-semibold text-white">
              Favorite Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm">
                        {resource.name}
                      </h3>
                      <span className="text-[#ff6b6b] text-xs">
                        {resource.category}
                      </span>
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
            <h2 className="text-xl font-semibold text-white">
              Favorite Team Members
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteTeamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#2a2d35] rounded-lg p-6 hover:bg-[#3a3d45] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2a2d35] ${
                        member.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <span className="text-gray-400 text-sm">{member.role}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">
                    Projects: {member.projects}
                  </span>
                  {renderStars(member.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
