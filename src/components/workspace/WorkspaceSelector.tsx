"use client";

import { Workspace, currentUser } from "@/data/workspaceData";
import { ChevronDown, Plus, Check, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  selectedWorkspaceId?: string;
  onSelectWorkspace: (workspaceId: string) => void;
  onCreateWorkspace: () => void;
}

export default function WorkspaceSelector({
  workspaces,
  selectedWorkspaceId,
  onSelectWorkspace,
  onCreateWorkspace,
}: WorkspaceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedWorkspace = workspaces.find(
    (w) => w.id === selectedWorkspaceId
  );
  const userWorkspaces = workspaces.filter((w) =>
    w.members.includes(currentUser.id)
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-[#2a2d35] hover:bg-[#323541] rounded-lg transition-all w-full group"
      >
        {/* Workspace Icon */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-xl flex-shrink-0">
          {selectedWorkspace?.icon || "💼"}
        </div>

        {/* Workspace Info */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {selectedWorkspace?.name || "Select Workspace"}
          </p>
          <p className="text-gray-400 text-xs truncate">
            {selectedWorkspace
              ? `${selectedWorkspace.members.length} members`
              : "No workspace selected"}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#2a2d35] rounded-lg shadow-2xl border border-gray-800 z-50 overflow-hidden"
            >
              {/* Workspaces List */}
              <div className="py-2 max-h-96 overflow-y-auto">
                <div className="px-3 py-2">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Your Workspaces
                  </p>
                </div>

                {userWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => {
                      onSelectWorkspace(workspace.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-[#323541] transition-colors ${
                      selectedWorkspaceId === workspace.id ? "bg-[#323541]" : ""
                    }`}
                  >
                    {/* Workspace Icon */}
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-base flex-shrink-0">
                      {workspace.icon}
                    </div>

                    {/* Workspace Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {workspace.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {workspace.members.length} members •{" "}
                        {workspace.channels.length} channels
                      </p>
                    </div>

                    {/* Selected Check */}
                    {selectedWorkspaceId === workspace.id && (
                      <Check className="w-4 h-4 text-[#ff6b6b] flex-shrink-0" />
                    )}
                  </button>
                ))}

                {userWorkspaces.length === 0 && (
                  <div className="px-3 py-8 text-center">
                    <p className="text-gray-400 text-sm">No workspaces yet</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-800"></div>

              {/* Actions */}
              <div className="py-2">
                <button
                  onClick={() => {
                    onCreateWorkspace();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-[#323541] transition-colors text-[#ff6b6b] hover:text-[#ff5252]"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium text-sm">Create Workspace</span>
                </button>

                {selectedWorkspace && (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-[#323541] transition-colors text-gray-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      Workspace Settings
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
