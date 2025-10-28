"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import WorkspaceSelector from "@/components/workspace/WorkspaceSelector";
import ChannelList from "@/components/workspace/ChannelList";
import ChannelView from "@/components/workspace/ChannelView";
import InviteModal from "@/components/workspace/InviteModal";
import TaskLinkModal from "@/components/workspace/TaskLinkModal";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";
import CreateChannelModal from "@/components/workspace/CreateChannelModal";
import {
  mockWorkspaces,
  currentUser,
  Channel,
  Task,
  mockUsers,
} from "@/data/workspaceData";
import { motion } from "framer-motion";
import { MessageSquare, Users, Settings, Plus, Search } from "lucide-react";

type ChannelTab = "messages" | "tasks";

export default function WorkspacePage() {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    string | undefined
  >(mockWorkspaces.find((w) => w.members.includes(currentUser.id))?.id);
  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >();
  const [activeTab, setActiveTab] = useState<ChannelTab>("messages");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [isTaskLinkModalOpen, setIsTaskLinkModalOpen] = useState(false);

  const selectedWorkspace = mockWorkspaces.find(
    (w) => w.id === selectedWorkspaceId
  );
  const workspaceChannels = selectedWorkspace?.channels || [];
  const selectedChannel = workspaceChannels.find(
    (c) => c.id === selectedChannelId
  );

  // Auto-select first channel when workspace changes
  const handleSelectWorkspace = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);
    const firstChannel = workspace?.channels.find((c) =>
      c.members.includes(currentUser.id)
    );
    setSelectedChannelId(firstChannel?.id);
    setActiveTab("messages"); // Reset to messages when changing workspace
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setActiveTab("messages"); // Reset to messages when changing channel
  };

  const handleCreateWorkspace = () => {
    setIsCreateWorkspaceOpen(true);
    console.log("Create workspace clicked");
  };

  const handleCreateChannel = () => {
    setIsCreateChannelOpen(true);
    console.log("Create channel clicked");
  };

  const handleInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleLinkTasks = (taskIds: string[]) => {
    // In a real app, this would update the backend
    // For now, we'll just log it
    console.log("Linking tasks to channel:", taskIds);
    // You would update the channel's tasks array here
  };

  const handleCreateWorkspaceSubmit = (data: {
    name: string;
    description: string;
    icon: string;
  }) => {
    // In a real app, this would call an API to create the workspace
    console.log("Creating workspace:", data);
    // Mock creating a new workspace
    const newWorkspace = {
      id: `workspace-${Date.now()}`,
      name: data.name,
      description: data.description,
      icon: data.icon,
      members: [currentUser.id],
      owner: currentUser.id,
      channels: [],
      createdAt: new Date(),
    };
    mockWorkspaces.push(newWorkspace);
    setSelectedWorkspaceId(newWorkspace.id);
    setSelectedChannelId(undefined);
  };

  const handleCreateChannelSubmit = (data: {
    name: string;
    description: string;
    type: "public" | "private";
  }) => {
    if (!selectedWorkspace) return;

    // In a real app, this would call an API to create the channel
    console.log("Creating channel:", data);
    // Mock creating a new channel
    const newChannel = {
      id: `channel-${Date.now()}`,
      name: data.name,
      description: data.description,
      type: data.type,
      members: [currentUser.id],
      messages: [],
      tasks: [],
      createdAt: new Date(),
      createdBy: currentUser.id,
      workspaceId: selectedWorkspace.id,
    };
    selectedWorkspace.channels.push(newChannel);
    setSelectedChannelId(newChannel.id);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      <Sidebar />

      <motion.main
        className="flex-1 flex flex-col overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Header */}
        <div className="h-16 bg-[#1a1d23] border-b border-gray-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Workspace Title */}
            <div className="flex items-center gap-3">
              {selectedWorkspace && (
                <>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-lg">
                    {selectedWorkspace.icon}
                  </div>
                  <div>
                    <h1 className="text-white font-semibold text-base">
                      {selectedWorkspace.name}
                    </h1>
                    <p className="text-gray-400 text-xs">
                      {selectedWorkspace.members.length} members
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:block ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-80 bg-[#2a2d35] text-white placeholder-gray-500 pl-10 pr-4 py-2 rounded-lg text-sm border border-transparent focus:border-[#ff6b6b] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            {selectedChannel && (
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">
                  Invite to Channel
                </span>
              </button>
            )}

            <button className="w-9 h-9 rounded-lg bg-[#2a2d35] hover:bg-[#323541] flex items-center justify-center transition-colors">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex overflow-hidden"
          >
            {/* Workspace Sidebar */}
            <div className="w-72 bg-[#1e2128] border-r border-gray-800 flex flex-col">
              {/* Workspace Selector */}
              <div className="p-4 border-b border-gray-800">
                <WorkspaceSelector
                  workspaces={mockWorkspaces}
                  selectedWorkspaceId={selectedWorkspaceId}
                  onSelectWorkspace={handleSelectWorkspace}
                  onCreateWorkspace={handleCreateWorkspace}
                />
              </div>

              {/* Channel List */}
              {selectedWorkspace && (
                <div className="flex-1 overflow-hidden">
                  <ChannelList
                    channels={workspaceChannels}
                    selectedChannelId={selectedChannelId}
                    onSelectChannel={handleSelectChannel}
                    onCreateChannel={handleCreateChannel}
                  />
                </div>
              )}
            </div>

            {/* Channel Content */}
            {selectedChannel ? (
              <div className="flex-1 flex flex-col bg-[#1a1d23]">
                {/* Channel Header */}
                <div className="bg-[#1e2128] border-b border-gray-800">
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {selectedChannel.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-lg">
                          #{selectedChannel.name}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {selectedChannel.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2d35] rounded-lg">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {selectedChannel.members.length}
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-[#2a2d35] rounded-lg">
                        <span
                          className={`text-sm font-medium ${
                            selectedChannel.type === "public"
                              ? "text-blue-400"
                              : "text-purple-400"
                          }`}
                        >
                          {selectedChannel.type === "public"
                            ? "Public"
                            : "Private"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="px-6 flex gap-1 border-t border-gray-800/50">
                    <button
                      onClick={() => setActiveTab("messages")}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                        activeTab === "messages"
                          ? "border-[#ff6b6b] text-white"
                          : "border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Messages
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("tasks")}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                        activeTab === "tasks"
                          ? "border-[#ff6b6b] text-white"
                          : "border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Tasks
                        {selectedChannel.tasks.length > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              activeTab === "tasks"
                                ? "bg-[#ff6b6b] text-white"
                                : "bg-[#2a2d35] text-gray-400"
                            }`}
                          >
                            {selectedChannel.tasks.length}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Channel View */}
                <div className="flex-1 overflow-hidden">
                  {activeTab === "messages" ? (
                    <ChannelView
                      channel={selectedChannel}
                      onInvite={handleInvite}
                      hideHeader={true}
                    />
                  ) : (
                    <LinkedTasksView
                      channel={selectedChannel}
                      onLinkTasks={() => setIsTaskLinkModalOpen(true)}
                    />
                  )}
                </div>
              </div>
            ) : (
              <EmptyChannelState
                workspaceName={selectedWorkspace?.name}
                onCreateChannel={handleCreateChannel}
              />
            )}
          </motion.div>
        </div>
      </motion.main>

      {/* Invite Modal */}
      {selectedChannel && (
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          channel={selectedChannel}
        />
      )}

      {/* Task Link Modal */}
      {selectedChannel && (
        <TaskLinkModal
          isOpen={isTaskLinkModalOpen}
          onClose={() => setIsTaskLinkModalOpen(false)}
          channel={selectedChannel}
          onLinkTasks={handleLinkTasks}
        />
      )}

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        isOpen={isCreateWorkspaceOpen}
        onClose={() => setIsCreateWorkspaceOpen(false)}
        onCreateWorkspace={handleCreateWorkspaceSubmit}
      />

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={isCreateChannelOpen}
        onClose={() => setIsCreateChannelOpen(false)}
        onCreateChannel={handleCreateChannelSubmit}
      />
    </div>
  );
}

function EmptyChannelState({
  workspaceName,
  onCreateChannel,
}: {
  workspaceName?: string;
  onCreateChannel: () => void;
}) {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center bg-[#1e2128]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2a2d35] to-[#1a1d23] flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-10 h-10 text-[#ff6b6b]" />
        </div>
        <h3 className="text-white font-semibold text-2xl mb-3">
          {workspaceName
            ? `Welcome to ${workspaceName}`
            : "No Channel Selected"}
        </h3>
        <p className="text-gray-400 text-base mb-6 leading-relaxed">
          Select a channel from the sidebar to start collaborating with your
          team, or create a new channel to get started.
        </p>
        <button
          onClick={onCreateChannel}
          className="px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create a Channel
        </button>
      </div>
    </motion.div>
  );
}

function LinkedTasksView({
  channel,
  onLinkTasks,
}: {
  channel: Channel;
  onLinkTasks: () => void;
}) {
  const channelTasks = channel.tasks || [];

  return (
    <div className="flex-1 flex flex-col bg-[#1a1d23] overflow-hidden">
      {channelTasks.length === 0 ? (
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2a2d35] to-[#1a1d23] flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-[#ff6b6b]" />
            </div>
            <h3 className="text-white font-semibold text-2xl mb-3">
              No Tasks Linked
            </h3>
            <p className="text-gray-400 text-base mb-6 leading-relaxed">
              Link tasks from your Projects page to keep track of work related
              to this channel.
            </p>
            <button
              onClick={onLinkTasks}
              className="px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Link Tasks
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg">Linked Tasks</h3>
              <p className="text-gray-400 text-sm">
                {channelTasks.length} task{channelTasks.length !== 1 ? "s" : ""}{" "}
                linked to this channel
              </p>
            </div>
            <button
              onClick={onLinkTasks}
              className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Link More Tasks
            </button>
          </div>

          {/* Tasks List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {channelTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e2128] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-medium mb-1">{task.title}</h4>
          <p className="text-gray-400 text-sm">{task.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            statusColors[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Assigned Users */}
          {assignedUsers.length > 0 && (
            <div className="flex -space-x-2">
              {assignedUsers.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-white text-xs font-semibold border-2 border-[#1e2128]"
                  title={user.name}
                >
                  {user.avatar}
                </div>
              ))}
              {assignedUsers.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-[#2a2d35] flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-[#1e2128]">
                  +{assignedUsers.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="text-xs text-gray-400">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
