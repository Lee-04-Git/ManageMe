"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Settings,
  Shield,
  Bell,
  Calendar,
  Award,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const userProfile = {
    name: "John Doe",
    role: "Senior Project Manager",
    email: "john.doe@manageme.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "JD",
    joinDate: "January 2023",
    projectsCompleted: 24,
    activeProjects: 5,
    teamMembers: 12,
    clientSatisfaction: 4.8,
  };

  const teamMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Senior Developer",
      avatar: "AT",
      status: "online",
      projectsWithUser: 8,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "UI/UX Designer",
      avatar: "SW",
      status: "away",
      projectsWithUser: 6,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "DevOps Engineer",
      avatar: "MC",
      status: "online",
      projectsWithUser: 4,
    },
    {
      id: 4,
      name: "Lisa Brown",
      role: "QA Engineer",
      avatar: "LB",
      status: "offline",
      projectsWithUser: 7,
    },
    {
      id: 5,
      name: "David Lee",
      role: "Backend Developer",
      avatar: "DL",
      status: "online",
      projectsWithUser: 9,
    },
    {
      id: 6,
      name: "Emma Davis",
      role: "Frontend Developer",
      avatar: "ED",
      status: "away",
      projectsWithUser: 5,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Project Excellence",
      description: "Delivered 10+ projects with 5-star ratings",
      icon: "🏆",
      earned: "Sep 2024",
    },
    {
      id: 2,
      title: "Team Leader",
      description: "Successfully managed teams of 10+ members",
      icon: "👥",
      earned: "Aug 2024",
    },
    {
      id: 3,
      title: "Client Favorite",
      description: "Maintained 95%+ client satisfaction rate",
      icon: "⭐",
      earned: "Jul 2024",
    },
    {
      id: 4,
      title: "Innovation Award",
      description: "Implemented groundbreaking project solutions",
      icon: "💡",
      earned: "Jun 2024",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed project review for E-commerce Platform",
      time: "2 hours ago",
      type: "project",
    },
    {
      id: 2,
      action: "Added new team member Sarah Wilson to CRM Dashboard",
      time: "4 hours ago",
      type: "team",
    },
    {
      id: 3,
      action: "Client meeting scheduled for Mobile Banking App",
      time: "1 day ago",
      type: "meeting",
    },
    {
      id: 4,
      action: "Updated project timeline for AI Analytics Tool",
      time: "2 days ago",
      type: "project",
    },
    {
      id: 5,
      action: "Received 5-star review from TechCorp Solutions",
      time: "3 days ago",
      type: "review",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return "📋";
      case "team":
        return "👥";
      case "meeting":
        return "📅";
      case "review":
        return "⭐";
      default:
        return "📋";
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">
            Manage your account and team information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-[#2a2d35] p-6 rounded-lg mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {userProfile.avatar}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {userProfile.name}
                </h2>
                <p className="text-gray-400 mb-4">{userProfile.role}</p>

                <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-4">
                Quick Stats
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ff6b6b]">
                    {userProfile.projectsCompleted}
                  </p>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {userProfile.activeProjects}
                  </p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {userProfile.teamMembers}
                  </p>
                  <p className="text-gray-400 text-sm">Team Size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">
                    {userProfile.clientSatisfaction}
                  </p>
                  <p className="text-gray-400 text-sm">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Team Members */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold text-lg">Your Team</h3>
                <button className="text-[#ff6b6b] hover:text-[#ff5252] text-sm transition-colors">
                  Manage Team
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 bg-[#1a1d23] rounded-lg"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                        {member.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#1a1d23] ${getStatusColor(member.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">
                        {member.name}
                      </h4>
                      <p className="text-gray-400 text-xs">{member.role}</p>
                      <p className="text-gray-500 text-xs">
                        {member.projectsWithUser} shared projects
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-6">
                Achievements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-4 bg-[#1a1d23] rounded-lg"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="text-white font-medium">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {achievement.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Earned {achievement.earned}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-6">
                Recent Activity
              </h3>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-[#1a1d23] rounded-lg"
                  >
                    <span className="text-lg mt-1">
                      {getActivityIcon(activity.type)}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Quick Access */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-6">
                Quick Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 bg-[#1a1d23] rounded-lg hover:bg-[#2a2d35] transition-colors">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Account Settings</span>
                </button>

                <button className="flex items-center gap-3 p-4 bg-[#1a1d23] rounded-lg hover:bg-[#2a2d35] transition-colors">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Notifications</span>
                </button>

                <button className="flex items-center gap-3 p-4 bg-[#1a1d23] rounded-lg hover:bg-[#2a2d35] transition-colors">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Privacy & Security</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
