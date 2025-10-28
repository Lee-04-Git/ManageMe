"use client";

import { Channel } from "@/data/workspaceData";
import { X, UserPlus, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: Channel;
}

export default function InviteModal({
  isOpen,
  onClose,
  channel,
}: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage(`Invitation sent to ${email}!`);
      setEmail("");
      setMessage("");
      setIsSubmitting(false);

      // Auto close after success
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#2a2d35] rounded-xl w-full max-w-md shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ff6b6b]/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[#ff6b6b]" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">
                      Invite to Channel
                    </h2>
                    <p className="text-gray-400 text-sm">#{channel.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-[#1a1d23] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
                  >
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <CheckIcon />
                      {successMessage}
                    </p>
                  </motion.div>
                )}

                {/* Email Input */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="colleague@company.com"
                      className="w-full bg-[#1a1d23] text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent outline-none transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    They'll receive an email invitation to join this channel
                  </p>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal note..."
                    rows={3}
                    className="w-full bg-[#1a1d23] text-white placeholder-gray-500 px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent outline-none resize-none transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Channel Info */}
                <div className="bg-[#1a1d23] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Channel Type</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        channel.type === "public"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {channel.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      Current Members
                    </span>
                    <span className="text-white text-sm font-medium">
                      {channel.members.length}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-[#1a1d23] hover:bg-[#0f1117] text-gray-300 rounded-lg font-medium transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        Sending...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Send Invite
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
