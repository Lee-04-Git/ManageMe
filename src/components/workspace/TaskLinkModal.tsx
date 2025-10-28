"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Link2, User, Calendar, CheckCircle2 } from "lucide-react";
import { Channel, Task, mockWorkspaces, mockUsers } from "@/data/workspaceData";

interface TaskLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: Channel;
  onLinkTasks: (taskIds: string[]) => void;
}

export default function TaskLinkModal({
  isOpen,
  onClose,
  channel,
  onLinkTasks,
}: TaskLinkModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Get all tasks from all workspaces (simulating Projects page tasks)
  const allTasks = mockWorkspaces.flatMap((workspace) =>
    workspace.channels.flatMap((ch) => ch.tasks)
  );

  // Filter out tasks already linked to this channel
  const currentChannelTaskIds = channel.tasks.map((t) => t.id);
  const availableTasks = allTasks.filter(
    (task) => !currentChannelTaskIds.includes(task.id)
  );

  // Filter tasks based on search query
  const filteredTasks = availableTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleLinkTasks = () => {
    if (selectedTaskIds.length > 0) {
      onLinkTasks(selectedTaskIds);
      setSelectedTaskIds([]);
      setSearchQuery("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[80vh] bg-[#1e2128] rounded-xl shadow-2xl border border-gray-800 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-xl">
                  Link Tasks to #{channel.name}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Select tasks from your projects to link to this channel
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-[#2a2d35] hover:bg-[#323541] flex items-center justify-center transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2a2d35] text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-lg text-sm border border-transparent focus:border-[#ff6b6b] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tasks List */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTasks.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a2d35] to-[#1a1d23] flex items-center justify-center mx-auto mb-4">
                    <Link2 className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {searchQuery ? "No tasks found" : "All tasks are linked"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {searchQuery
                      ? "Try a different search term"
                      : "All available tasks are already linked to this channel"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isSelected={selectedTaskIds.includes(task.id)}
                    onToggle={() => toggleTaskSelection(task.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {selectedTaskIds.length > 0 ? (
                <span>
                  {selectedTaskIds.length} task
                  {selectedTaskIds.length !== 1 ? "s" : ""} selected
                </span>
              ) : (
                <span>Select tasks to link</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#2a2d35] hover:bg-[#323541] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkTasks}
                disabled={selectedTaskIds.length === 0}
                className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Link {selectedTaskIds.length > 0
                  ? selectedTaskIds.length
                  : ""}{" "}
                Task
                {selectedTaskIds.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function TaskItem({
  task,
  isSelected,
  onToggle,
}: {
  task: Task;
  isSelected: boolean;
  onToggle: () => void;
}) {
  const statusColors = {
    todo: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    "in-progress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    done: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  const assignedUsers = mockUsers.filter((u) => task.assignedTo.includes(u.id));

  // Get workspace and channel info
  const workspace = mockWorkspaces.find((w) => w.id === task.workspaceId);
  const channel = workspace?.channels.find((c) => c.id === task.channelId);

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full bg-[#2a2d35] border-2 rounded-lg p-4 text-left transition-all ${
        isSelected
          ? "border-[#ff6b6b] shadow-lg shadow-[#ff6b6b]/20"
          : "border-transparent hover:border-gray-700"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div
          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            isSelected ? "bg-[#ff6b6b] border-[#ff6b6b]" : "border-gray-600"
          }`}
        >
          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">{task.title}</h4>
              <p className="text-gray-400 text-sm line-clamp-2">
                {task.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                statusColors[task.status]
              }`}
            >
              {statusLabels[task.status]}
            </span>
          </div>

          {/* Task Metadata */}
          <div className="flex items-center gap-4 mt-3">
            {/* Source */}
            {workspace && channel && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>{workspace.icon}</span>
                <span>{workspace.name}</span>
                <span>/</span>
                <span>#{channel.name}</span>
              </div>
            )}

            {/* Assigned Users */}
            {assignedUsers.length > 0 && (
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-gray-500" />
                <div className="flex -space-x-1.5">
                  {assignedUsers.slice(0, 2).map((user) => (
                    <div
                      key={user.id}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-white text-xs font-semibold border-2 border-[#2a2d35]"
                      title={user.name}
                    >
                      {user.avatar}
                    </div>
                  ))}
                  {assignedUsers.length > 2 && (
                    <div className="w-6 h-6 rounded-full bg-[#1a1d23] flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-[#2a2d35]">
                      +{assignedUsers.length - 2}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
