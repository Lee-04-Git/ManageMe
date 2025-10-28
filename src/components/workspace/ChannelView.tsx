"use client";

import { Channel, Message, Task, currentUser } from "@/data/workspaceData";
import {
  Hash,
  Lock,
  UserPlus,
  MoreVertical,
  Send,
  Paperclip,
  CheckSquare,
  Circle,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ChannelViewProps {
  channel: Channel;
  onInvite: () => void;
  hideHeader?: boolean;
}

export default function ChannelView({
  channel,
  onInvite,
  hideHeader = false,
}: ChannelViewProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Would send message in real app
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <motion.div
      className="flex-1 flex flex-col bg-[#1e2128] h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Channel Header - conditionally rendered */}
      {!hideHeader && (
        <>
          <div className="h-16 border-b border-gray-700 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {channel.type === "public" ? (
                <Hash className="w-5 h-5 text-gray-400" />
              ) : (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <h2 className="text-white font-semibold">{channel.name}</h2>
                <p className="text-gray-400 text-xs">{channel.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onInvite}
                className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Invite</span>
              </button>
              <button className="w-10 h-10 rounded-lg hover:bg-[#2a2d35] flex items-center justify-center transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700 px-6">
            <div className="flex gap-6">
              <button className="py-3 px-1 border-b-2 border-[#ff6b6b] text-white">
                <span className="font-medium">Messages</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Messages Content */}
      <MessagesTab
        messages={channel.messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSend={handleSendMessage}
      />
    </motion.div>
  );
}

interface MessagesTabProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (value: string) => void;
  onSend: () => void;
}

function MessagesTab({
  messages,
  newMessage,
  setNewMessage,
  onSend,
}: MessagesTabProps) {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2a2d35] flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 text-base mb-2">No messages yet</p>
              <p className="text-gray-500 text-sm">
                Start the conversation with your team
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-[#1a1d23]">
        <div className="flex items-end gap-3">
          <button className="w-10 h-10 rounded-lg hover:bg-[#2a2d35] flex items-center justify-center transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="w-full bg-[#2a2d35] text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent focus:outline-none resize-none"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          <button
            onClick={onSend}
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-lg bg-[#ff6b6b] hover:bg-[#ff5252] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const isCurrentUser = message.userId === currentUser.id;

  return (
    <motion.div
      className={`flex gap-3 group ${isCurrentUser ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center flex-shrink-0 shadow-lg">
        <span className="text-white font-bold text-sm">
          {message.userAvatar}
        </span>
      </div>

      <div className={`flex-1 max-w-2xl ${isCurrentUser ? "text-right" : ""}`}>
        <div
          className={`flex items-center gap-2 mb-1 ${isCurrentUser ? "justify-end" : ""}`}
        >
          <span
            className={`text-white font-semibold ${isCurrentUser ? "text-[#ff6b6b]" : ""}`}
          >
            {message.userName}
            {isCurrentUser && " (You)"}
          </span>
          <span className="text-gray-500 text-xs">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {message.edited && (
            <span className="text-gray-500 text-xs italic">(edited)</span>
          )}
        </div>
        <div
          className={`inline-block ${isCurrentUser ? "bg-[#ff6b6b] text-white" : "bg-[#2a2d35] text-gray-300"} px-4 py-2.5 rounded-lg leading-relaxed`}
        >
          <p className="text-sm">{message.content}</p>
        </div>

        {/* Message Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          <div
            className={`flex gap-2 text-xs ${isCurrentUser ? "justify-end" : ""}`}
          >
            <button className="text-gray-500 hover:text-white transition-colors">
              Reply
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              React
            </button>
            {isCurrentUser && (
              <>
                <button className="text-gray-500 hover:text-white transition-colors">
                  Edit
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface TasksTabProps {
  tasks: Task[];
}

function TasksTab({ tasks }: TasksTabProps) {
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "in-progress":
        return <Circle className="w-5 h-5 text-blue-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "bg-green-500/10 text-green-400";
      case "in-progress":
        return "bg-blue-500/10 text-blue-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <motion.div
      className="flex-1 overflow-y-auto p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="bg-[#2a2d35] rounded-lg p-4 hover:bg-[#323541] transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3 mb-3">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{task.title}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                Assigned to {task.assignedTo.length} member
                {task.assignedTo.length > 1 ? "s" : ""}
              </span>
              {task.dueDate && (
                <span>Due {task.dueDate.toLocaleDateString()}</span>
              )}
            </div>
          </motion.div>
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-400">No tasks yet</p>
            <p className="text-gray-500 text-sm">
              Create tasks to organize your work
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
