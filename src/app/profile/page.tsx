"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Settings,
  Shield,
  Bell,
  Calendar,
} from "lucide-react";
import { auth } from "@/lib/firebase"; // <-- ensure this path matches your setup
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Redirect unauthorized users to Sign-In
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else router.push("/auth/signin");
    });

    return unsubscribe;
  }, [router]);

  const handleSignOut = () => {
    signOut(auth);
    router.push("/auth/signin");
  };

  // Hardcoded user profile (replace with Firebase info later if needed)
  const userProfile = {
    name: currentUser?.displayName || "John Doe",
    role: "Senior Project Manager",
    email: currentUser?.email || "john.doe@manageme.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: currentUser?.displayName
      ? currentUser.displayName.charAt(0).toUpperCase()
      : "JD",
    joinDate: "January 2023",
    projectsCompleted: 24,
    activeProjects: 5,
    clientSatisfaction: 4.8,
  };

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

      <main className="flex-1 p-8 overflow-auto">
        <Header />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
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

                <button
                  className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                  onClick={handleSignOut}
                >
                  <Edit className="w-4 h-4" />
                  Sign Out
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
            {/* Achievements */}
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-6">
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex items-center gap-3 p-4 bg-[#1a1d23] rounded-lg"
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div>
                      <h4 className="text-white font-medium">{ach.title}</h4>
                      <p className="text-gray-400 text-sm">{ach.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Earned {ach.earned}
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

            {/* Quick Settings */}
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
      </main>
    </div>
  );
}
