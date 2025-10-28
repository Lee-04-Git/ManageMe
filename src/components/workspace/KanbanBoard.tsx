"use client";

import { Task, currentUser } from "@/data/workspaceData";
import {
  GripVertical,
  Plus,
  MoreVertical,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface KanbanBoardProps {
  tasks: Task[];
  channelId: string;
  onTaskUpdate?: (taskId: string, newStatus: Task["status"]) => void;
}

type Column = {
  id: Task["status"];
  title: string;
  color: string;
  bgColor: string;
  textColor: string;
};

const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-500",
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-400",
  },
];

export default function KanbanBoard({
  tasks,
  channelId,
  onTaskUpdate,
}: KanbanBoardProps) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<
    Task["status"] | null
  >(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent, columnId: Task["status"]) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (columnId: Task["status"]) => {
    if (draggedTask && draggedTask.status !== columnId) {
      const updatedTasks = localTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: columnId } : task
      );
      setLocalTasks(updatedTasks);
      onTaskUpdate?.(draggedTask.id, columnId);
    }
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return localTasks.filter((task) => task.status === status);
  };

  const getCompletionStats = () => {
    const total = localTasks.length;
    const done = localTasks.filter((t) => t.status === "done").length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percentage };
  };

  const stats = getCompletionStats();

  return (
    <div className="h-full flex flex-col bg-[#1a1d23]">
      {/* Kanban Stats Bar */}
      <div className="bg-[#1e2128] border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Tasks</p>
              <p className="text-white font-semibold text-lg">{stats.total}</p>
            </div>
            <div className="w-px h-10 bg-gray-800"></div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Completed</p>
              <p className="text-green-400 font-semibold text-lg">
                {stats.done}
              </p>
            </div>
            <div className="w-px h-10 bg-gray-800"></div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-[#2a2d35] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff5252]"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-white font-semibold text-sm">
                  {stats.percentage}%
                </span>
              </div>
            </div>
          </div>

          <button className="px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-[#ff6b6b]/20">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onDragStart={handleDragStart}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(column.id)}
              isDraggingOver={draggedOverColumn === column.id}
              isDragging={!!draggedTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: () => void;
  isDraggingOver: boolean;
  isDragging: boolean;
}

function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  isDraggingOver,
  isDragging,
}: KanbanColumnProps) {
  return (
    <motion.div
      className="flex flex-col h-full rounded-xl bg-[#1e2128] border border-gray-800 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: columns.findIndex((c) => c.id === column.id) * 0.1,
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className={`px-4 py-3 border-b border-gray-800 ${column.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
            <h4 className="text-white font-semibold text-sm">{column.title}</h4>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${column.bgColor} ${column.textColor}`}
            >
              {tasks.length}
            </span>
          </div>
          <button className="w-7 h-7 rounded-lg hover:bg-[#2a2d35] flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div
        className={`flex-1 overflow-y-auto p-3 space-y-3 transition-all ${
          isDraggingOver
            ? "bg-[#ff6b6b]/5 border-2 border-dashed border-[#ff6b6b]/50"
            : ""
        }`}
      >
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              index={index}
              columnColor={column.color}
            />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && !isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div
              className={`w-12 h-12 rounded-full ${column.bgColor} flex items-center justify-center mb-3`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 border-dashed ${column.color.replace("bg-", "border-")}`}
              ></div>
            </div>
            <p className="text-gray-500 text-sm">No tasks</p>
            <p className="text-gray-600 text-xs mt-1">Drag tasks here</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  index: number;
  columnColor: string;
}

function TaskCard({ task, onDragStart, index, columnColor }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const daysUntilDue = task.dueDate
    ? Math.ceil(
        (new Date(task.dueDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        layout: { duration: 0.3 },
      }}
      draggable
      onDragStart={() => onDragStart(task)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#2a2d35] rounded-lg border border-gray-800 hover:border-gray-700 cursor-grab active:cursor-grabbing transition-all group relative"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Drag Handle Indicator */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -left-2 top-1/2 -translate-y-1/2"
        >
          <GripVertical className="w-5 h-5 text-gray-600" />
        </motion.div>
      )}

      {/* Card Border Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${columnColor} rounded-t-lg`}
      ></div>

      <div className="p-4 pt-5">
        {/* Task Header */}
        <div className="flex items-start justify-between mb-3">
          <h5 className="text-white font-medium text-sm flex-1 pr-2 leading-snug">
            {task.title}
          </h5>
          <button className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-md hover:bg-[#1a1d23] flex items-center justify-center transition-all flex-shrink-0">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Task Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Assignees */}
          {task.assignedTo.length > 0 && (
            <div className="flex items-center -space-x-2">
              {task.assignedTo.slice(0, 3).map((userId, idx) => (
                <motion.div
                  key={userId}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] flex items-center justify-center text-white text-xs font-bold border-2 border-[#2a2d35] hover:z-10 transition-transform hover:scale-110"
                  title={userId}
                >
                  {userId.slice(-2).toUpperCase()}
                </motion.div>
              ))}
              {task.assignedTo.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-[#1a1d23] flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-[#2a2d35]">
                  +{task.assignedTo.length - 3}
                </div>
              )}
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isOverdue
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : daysUntilDue !== null && daysUntilDue <= 2
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "bg-[#1a1d23] text-gray-400 border border-gray-800"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {isOverdue && <span className="text-xs opacity-75">overdue</span>}
            </div>
          )}
        </div>

        {/* Task Priority Indicator (if task was created recently) */}
        {task.createdAt &&
          new Date().getTime() - new Date(task.createdAt).getTime() <
            24 * 60 * 60 * 1000 && (
            <div className="mt-3 pt-3 border-t border-gray-800">
              <div className="flex items-center gap-1.5 text-xs text-blue-400">
                <Clock className="w-3.5 h-3.5" />
                <span>New task</span>
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
}
