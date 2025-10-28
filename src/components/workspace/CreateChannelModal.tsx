"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hash, Lock, Globe } from "lucide-react";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (data: {
    name: string;
    description: string;
    type: "public" | "private";
  }) => void;
}

export default function CreateChannelModal({
  isOpen,
  onClose,
  onCreateChannel,
}: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { name?: string; description?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Channel name is required";
    } else if (!/^[a-z0-9-]+$/.test(name.trim())) {
      newErrors.name = "Channel name can only contain lowercase letters, numbers, and hyphens";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create channel
    onCreateChannel({
      name: name.trim().toLowerCase(),
      description: description.trim(),
      type,
    });

    // Reset form
    setName("");
    setDescription("");
    setType("public");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setType("public");
    setErrors({});
    onClose();
  };

  const handleNameChange = (value: string) => {
    // Auto-format: lowercase and replace spaces with hyphens
    const formatted = value.toLowerCase().replace(/\s+/g, "-");
    setName(formatted);
    if (errors.name) setErrors({ ...errors, name: undefined });
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
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-xl">
                      Create Channel
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Add a new channel to your workspace
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
              {/* Channel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Channel Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("public")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      type === "public"
                        ? "border-[#ff6b6b] bg-[#ff6b6b]/10"
                        : "border-gray-700 bg-[#2a2d35] hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          type === "public"
                            ? "bg-[#ff6b6b]"
                            : "bg-[#1a1d23]"
                        }`}
                      >
                        <Globe
                          className={`w-5 h-5 ${
                            type === "public" ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-semibold ${
                          type === "public" ? "text-white" : "text-gray-300"
                        }`}
                      >
                        Public
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Anyone in the workspace can join
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("private")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      type === "private"
                        ? "border-[#ff6b6b] bg-[#ff6b6b]/10"
                        : "border-gray-700 bg-[#2a2d35] hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          type === "private"
                            ? "bg-[#ff6b6b]"
                            : "bg-[#1a1d23]"
                        }`}
                      >
                        <Lock
                          className={`w-5 h-5 ${
                            type === "private" ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-semibold ${
                          type === "private" ? "text-white" : "text-gray-300"
                        }`}
                      >
                        Private
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Only invited members can access
                    </p>
                  </button>
                </div>
              </div>

              {/* Channel Name */}
              <div>
                <label
                  htmlFor="channel-name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Channel Name <span className="text-[#ff6b6b]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    #
                  </span>
                  <input
                    id="channel-name"
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., general, announcements, random"
                    className={`w-full bg-[#2a2d35] text-white placeholder-gray-500 pl-8 pr-4 py-3 rounded-lg text-sm border transition-colors focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-transparent focus:border-[#ff6b6b]"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Use lowercase letters, numbers, and hyphens only
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="channel-description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description <span className="text-[#ff6b6b]">*</span>
                </label>
                <textarea
                  id="channel-description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description)
                      setErrors({ ...errors, description: undefined });
                  }}
                  placeholder="What's this channel for?"
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
                <Hash className="w-4 h-4" />
                Create Channel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
