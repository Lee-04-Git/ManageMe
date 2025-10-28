"use client";

import { Channel, currentUser } from "@/data/workspaceData";
import { Hash, Lock, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId?: string;
  onSelectChannel: (channelId: string) => void;
  onCreateChannel: () => void;
}

export default function ChannelList({
  channels,
  selectedChannelId,
  onSelectChannel,
  onCreateChannel,
}: ChannelListProps) {
  // Filter channels user has access to
  const userChannels = channels.filter((channel) =>
    channel.members.includes(currentUser.id)
  );

  const publicChannels = userChannels.filter((c) => c.type === "public");
  const privateChannels = userChannels.filter((c) => c.type === "private");

  return (
    <div className="flex-1 bg-[#1e2128] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Channels</h2>
          <button
            onClick={onCreateChannel}
            className="w-8 h-8 rounded-lg bg-[#ff6b6b] hover:bg-[#ff5252] flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-[#ff6b6b]/20"
            title="Create Channel"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2d35] rounded-lg">
          <Users className="w-4 h-4 text-gray-400" />
          <p className="text-gray-400 text-sm">
            {userChannels.length}{" "}
            {userChannels.length === 1 ? "channel" : "channels"}
          </p>
        </div>
      </div>

      {/* Channel Lists */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Public Channels */}
        {publicChannels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Hash className="w-3.5 h-3.5 text-gray-500" />
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Public Channels
              </h3>
            </div>
            <div className="space-y-1">
              {publicChannels.map((channel) => (
                <ChannelItem
                  key={channel.id}
                  channel={channel}
                  isSelected={selectedChannelId === channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Private Channels */}
        {privateChannels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Lock className="w-3.5 h-3.5 text-gray-500" />
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Private Channels
              </h3>
            </div>
            <div className="space-y-1">
              {privateChannels.map((channel) => (
                <ChannelItem
                  key={channel.id}
                  channel={channel}
                  isSelected={selectedChannelId === channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                />
              ))}
            </div>
          </div>
        )}

        {userChannels.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-[#2a2d35] flex items-center justify-center mx-auto mb-4">
              <Hash className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm mb-4">No channels yet</p>
            <button
              onClick={onCreateChannel}
              className="text-[#ff6b6b] hover:text-[#ff5252] text-sm font-medium transition-colors"
            >
              Create your first channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ChannelItemProps {
  channel: Channel;
  isSelected: boolean;
  onClick: () => void;
}

function ChannelItem({ channel, isSelected, onClick }: ChannelItemProps) {
  const unreadCount = 0; // Would track unread messages in real app
  const hasActivity = channel.messages.length > 0;

  return (
    <motion.button
      onClick={onClick}
      className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all relative overflow-hidden ${
        isSelected
          ? "bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/20"
          : "hover:bg-[#2a2d35] text-gray-300"
      }`}
      whileHover={{ scale: isSelected ? 1 : 1.02, x: isSelected ? 0 : 2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          layoutId="activeChannel"
          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      {/* Channel Icon */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSelected
            ? "bg-white/20"
            : channel.type === "public"
              ? "bg-blue-500/10"
              : "bg-purple-500/10"
        }`}
      >
        {channel.type === "public" ? (
          <Hash
            className={`w-4 h-4 ${isSelected ? "text-white" : "text-blue-400"}`}
          />
        ) : (
          <Lock
            className={`w-4 h-4 ${
              isSelected ? "text-white" : "text-purple-400"
            }`}
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="flex-1 text-left min-w-0">
        <p className="font-medium truncate text-sm">{channel.name}</p>
        <div className="flex items-center gap-2">
          <p
            className={`text-xs truncate ${
              isSelected ? "text-red-100" : "text-gray-500"
            }`}
          >
            {channel.members.length} members
          </p>
          {hasActivity && !isSelected && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          )}
        </div>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && !isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-[#ff6b6b] flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white text-xs font-bold">{unreadCount}</span>
        </motion.div>
      )}
    </motion.button>
  );
}
