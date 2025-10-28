"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Trash2, Users as UsersIcon, Crown } from "lucide-react";
import { Workspace, mockUsers, currentUser } from "@/data/workspaceData";

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: Workspace;
  onUpdateWorkspace: (data: {
    name: string;
    description: string;
    icon: string;
  }) => void;
  onDeleteWorkspace?: () => void;
}

const emojiOptions = [
  "💼",
  "🚀",
  "🎯",
  "💡",
  "🏢",
  "🌟",
  "⚡",
  "🔥",
  "🎨",
  "📊",
  "🛠️",
  "🎮",
  "📱",
  "💻",
  "🌍",
  "🏆",
];

type TabType = "general" | "members" | "danger";

export default function WorkspaceSettingsModal({
  isOpen,
  onClose,
  workspace,
  onUpdateWorkspace,
  onDeleteWorkspace,
}: WorkspaceSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description);
  const [selectedIcon, setSelectedIcon] = useState(workspace.icon || "💼");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Check if current user is the owner
  const isOwner = workspace.owner === currentUser.id;

  // Update form when workspace changes
  useEffect(() => {
    setName(workspace.name);
    setDescription(workspace.description);
    setSelectedIcon(workspace.icon || "💼");
    setHasChanges(false);
  }, [workspace]);

  // Track changes
  useEffect(() => {
    const changed =
      name !== workspace.name ||
      description !== workspace.description ||
      selectedIcon !== (workspace.icon || "💼");
    setHasChanges(changed);
  }, [name, description, selectedIcon, workspace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { name?: string; description?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Workspace name is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update workspace
    onUpdateWorkspace({
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
    });

    setErrors({});
    setHasChanges(false);
  };

  const handleClose = () => {
    // Reset to original values
    setName(workspace.name);
    setDescription(workspace.description);
    setSelectedIcon(workspace.icon || "💼");
    setErrors({});
    setHasChanges(false);
    setActiveTab("general");
    onClose();
  };

  const handleDeleteWorkspace = () => {
    if (onDeleteWorkspace) {
      const confirmed = confirm(
        `Are you sure you want to delete "${workspace.name}"? This action cannot be undone.`
      );
      if (confirmed) {
        onDeleteWorkspace();
        onClose();
      }
    }
  };

  const workspaceMembers = mockUsers.filter((u) =>
    workspace.members.includes(u.id)
  );

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
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#1e2128] rounded-xl shadow-2xl border border-gray-800 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-xl">
                    Workspace Settings
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Manage {workspace.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-lg bg-[#2a2d35] hover:bg-[#323541] flex items-center justify-center transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-4 border-b border-gray-800/50">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                  activeTab === "general"
                    ? "border-[#ff6b6b] text-white"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                General
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("members")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                  activeTab === "members"
                    ? "border-[#ff6b6b] text-white"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                Members
              </button>
              {isOwner && (
                <button
                  type="button"
                  onClick={() => setActiveTab("danger")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                    activeTab === "danger"
                      ? "border-red-500 text-white"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Danger Zone
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "general" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Icon Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Workspace Icon
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedIcon(emoji)}
                        disabled={!isOwner}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                          selectedIcon === emoji
                            ? "bg-[#ff6b6b] shadow-lg shadow-[#ff6b6b]/20 scale-110"
                            : "bg-[#2a2d35] hover:bg-[#323541]"
                        } ${!isOwner && "opacity-50 cursor-not-allowed"}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workspace Name */}
                <div>
                  <label
                    htmlFor="workspace-name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Workspace Name <span className="text-[#ff6b6b]">*</span>
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors({ ...errors, name: undefined });
                    }}
                    disabled={!isOwner}
                    placeholder="e.g., Marketing Team, Design Squad"
                    className={`w-full bg-[#2a2d35] text-white placeholder-gray-500 px-4 py-3 rounded-lg text-sm border transition-colors focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-transparent focus:border-[#ff6b6b]"
                    } ${!isOwner && "opacity-50 cursor-not-allowed"}`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="workspace-description"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Description <span className="text-[#ff6b6b]">*</span>
                  </label>
                  <textarea
                    id="workspace-description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description)
                        setErrors({ ...errors, description: undefined });
                    }}
                    disabled={!isOwner}
                    placeholder="What's this workspace for?"
                    rows={3}
                    className={`w-full bg-[#2a2d35] text-white placeholder-gray-500 px-4 py-3 rounded-lg text-sm border transition-colors focus:outline-none resize-none ${
                      errors.description
                        ? "border-red-500 focus:border-red-500"
                        : "border-transparent focus:border-[#ff6b6b]"
                    } ${!isOwner && "opacity-50 cursor-not-allowed"}`}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Workspace Info */}
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">
                    Workspace Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created</span>
                      <span className="text-gray-300">
                        {new Date(workspace.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Workspace ID</span>
                      <span className="text-gray-300 font-mono text-xs">
                        {workspace.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Members</span>
                      <span className="text-gray-300">
                        {workspace.members.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Channels</span>
                      <span className="text-gray-300">
                        {workspace.channels.length}
                      </span>
                    </div>
                  </div>
                </div>

                {!isOwner && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      Only the workspace owner can edit these settings.
                    </p>
                  </div>
                )}
              </form>
            )}

            {activeTab === "members" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">
                    Workspace Members ({workspaceMembers.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {workspaceMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-[#2a2d35] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium">
                              {member.name}
                            </h4>
                            {member.id === workspace.owner && (
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                                <Crown className="w-3 h-3" />
                                Owner
                              </div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "danger" && isOwner && (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">
                        Delete Workspace
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Once you delete this workspace, there is no going back.
                        This will permanently delete all channels, messages, and
                        tasks associated with this workspace.
                      </p>
                      <button
                        type="button"
                        onClick={handleDeleteWorkspace}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Workspace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {activeTab === "general" && (
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-[#2a2d35] hover:bg-[#323541] text-white rounded-lg font-medium transition-colors"
              >
                {hasChanges ? "Cancel" : "Close"}
              </button>
              {isOwner && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!hasChanges}
                  className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Settings className="w-4 h-4" />
                  Save Changes
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
