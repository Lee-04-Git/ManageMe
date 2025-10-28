"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase } from "lucide-react";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace: (data: {
    name: string;
    description: string;
    icon: string;
  }) => void;
}

const emojiOptions = [
  "💼", "🚀", "🎯", "💡", "🏢", "🌟", "⚡", "🔥",
  "🎨", "📊", "🛠️", "🎮", "📱", "💻", "🌍", "🏆"
];

export default function CreateWorkspaceModal({
  isOpen,
  onClose,
  onCreateWorkspace,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💼");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

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

    // Create workspace
    onCreateWorkspace({
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
    });

    // Reset form
    setName("");
    setDescription("");
    setSelectedIcon("💼");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setSelectedIcon("💼");
    setErrors({});
    onClose();
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
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#1e2128] rounded-xl shadow-2xl border border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-xl">
                      Create Workspace
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Set up a new collaborative workspace
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
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
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
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                        selectedIcon === emoji
                          ? "bg-[#ff6b6b] shadow-lg shadow-[#ff6b6b]/20 scale-110"
                          : "bg-[#2a2d35] hover:bg-[#323541]"
                      }`}
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
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g., Marketing Team, Design Squad"
                  className={`w-full bg-[#2a2d35] text-white placeholder-gray-500 px-4 py-3 rounded-lg text-sm border transition-colors focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#ff6b6b]"
                  }`}
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
                  placeholder="What's this workspace for?"
                  rows={3}
                  className={`w-full bg-[#2a2d35] text-white placeholder-gray-500 px-4 py-3 rounded-lg text-sm border transition-colors focus:outline-none resize-none ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-[#ff6b6b]"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-[#2a2d35] hover:bg-[#323541] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Create Workspace
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
