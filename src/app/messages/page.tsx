"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Messages() {
  const conversations = [
    {
      id: 1,
      name: "Alex Thompson",
      lastMessage: "The project timeline looks good!",
      time: "2m ago",
      unread: 2,
      avatar: "AT",
      online: true,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      time: "15m ago",
      unread: 0,
      avatar: "SW",
      online: true,
    },
    {
      id: 3,
      name: "Development Team",
      lastMessage: "Bug fixes completed for v2.1",
      time: "1h ago",
      unread: 5,
      avatar: "DT",
      online: false,
    },
    {
      id: 4,
      name: "Michael Chen",
      lastMessage: "Great work on the presentation!",
      time: "3h ago",
      unread: 0,
      avatar: "MC",
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Alex Thompson",
      content:
        "Hey! I've reviewed the project timeline and it looks great. When can we start implementing phase 2?",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Thanks Alex! We can start phase 2 next Monday. I'll send you the detailed breakdown by end of day.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Alex Thompson",
      content: "Perfect! That gives us enough time to prepare the resources.",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "The project timeline looks good!",
      time: "10:38 AM",
      isOwn: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />

      <motion.main
        className="flex-1 flex overflow-hidden"
        initial={{ opacity: 0.98 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05 }}
      >
        {/* Conversations List */}
        <div className="w-80 bg-[#1a1d23] border-r border-gray-800 flex flex-col">
          <div className="p-6">
            <Header />
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-[#2a2d35] text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-6">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center p-4 rounded-lg mb-2 cursor-pointer transition-colors ${
                  conversation.id === 1
                    ? "bg-[#ff6b6b]/10 border border-[#ff6b6b]/20"
                    : "hover:bg-[#2a2d35]"
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1d23]"></div>
                  )}
                </div>

                <div className="flex-1 ml-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">
                      {conversation.name}
                    </h3>
                    <span className="text-gray-400 text-xs">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {conversation.unread}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#1e2128]">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                  AT
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e2128]"></div>
              </div>
              <div className="ml-3">
                <h2 className="text-white font-semibold">Alex Thompson</h2>
                <p className="text-green-400 text-sm">Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.isOwn
                        ? "bg-[#ff6b6b] text-white"
                        : "bg-[#2a2d35] text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${message.isOwn ? "text-red-100" : "text-gray-400"}`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-[#2a2d35] text-white placeholder-gray-400 px-4 py-3 pr-12 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white p-3 rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
