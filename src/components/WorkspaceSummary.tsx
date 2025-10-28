"use client";

import { mockChannels, mockInvites, currentUser } from "@/data/workspaceData";
import {
  Users,
  UserPlus,
  Activity,
  Hash,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorkspaceSummary() {
  // Calculate stats
  const userChannels = mockChannels.filter((c) =>
    c.members.includes(currentUser.id)
  );
  const activeChannels = userChannels.length;
  const pendingInvites = mockInvites.filter(
    (i) => i.status === "pending"
  ).length;

  // Get recent activity (messages from last 24 hours)
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentMessages = userChannels
    .flatMap((channel) =>
      channel.messages
        .filter((msg) => msg.timestamp > oneDayAgo)
        .map((msg) => ({
          ...msg,
          channelName: channel.name,
          channelId: channel.id,
        }))
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3);

  return (
    <div className="bg-[#2a2d35] p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff6b6b]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#ff6b6b]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Workspace</h3>
            <p className="text-gray-400 text-sm">Collaboration hub</p>
          </div>
        </div>

        <Link
          href="/workspace"
          className="text-[#ff6b6b] hover:text-[#ff5252] text-sm font-medium flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="bg-[#1a1d23] p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400 text-xs">Active Channels</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeChannels}</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1d23] p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-xs">Pending Invites</span>
          </div>
          <p className="text-2xl font-bold text-white">{pendingInvites}</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1d23] p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400 text-xs">Today's Activity</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {recentMessages.length}
          </p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-white font-medium mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {recentMessages.length > 0 ? (
            recentMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                className="flex items-start gap-3 p-3 bg-[#1a1d23] rounded-lg hover:bg-[#0f1117] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#ff6b6b] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs">
                    {msg.userAvatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">
                      {msg.userName}
                    </span>
                    <span className="text-gray-500 text-xs">
                      in #{msg.channelName}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">
                    {msg.content}
                  </p>
                  <span className="text-gray-600 text-xs">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Activity className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/workspace"
            className="px-4 py-3 bg-[#1a1d23] hover:bg-[#0f1117] rounded-lg text-center transition-colors"
          >
            <Hash className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <span className="text-white text-sm font-medium block">
              Browse Channels
            </span>
          </Link>
          <Link
            href="/workspace"
            className="px-4 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] rounded-lg text-center transition-colors"
          >
            <UserPlus className="w-5 h-5 text-white mx-auto mb-1" />
            <span className="text-white text-sm font-medium block">
              Invite Members
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
