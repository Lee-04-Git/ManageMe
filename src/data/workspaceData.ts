export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: "todo" | "in-progress" | "done";
  dueDate?: Date;
  createdBy: string;
  createdAt: Date;
  channelId: string;
  workspaceId: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: "public" | "private";
  members: string[]; // user IDs
  messages: Message[];
  tasks: Task[];
  createdAt: Date;
  createdBy: string;
  workspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  icon?: string;
  members: string[]; // user IDs
  owner: string; // user ID
  channels: Channel[];
  createdAt: Date;
}

export interface Invite {
  id: string;
  channelId: string;
  channelName: string;
  workspaceId: string;
  invitedBy: string;
  invitedEmail: string;
  status: "pending" | "accepted" | "rejected";
  sentAt: Date;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@manageme.com",
    avatar: "JD",
  },
  {
    id: "user-2",
    name: "Alex Thompson",
    email: "alex.thompson@manageme.com",
    avatar: "AT",
  },
  {
    id: "user-3",
    name: "Sarah Wilson",
    email: "sarah.wilson@manageme.com",
    avatar: "SW",
  },
  {
    id: "user-4",
    name: "Michael Chen",
    email: "michael.chen@manageme.com",
    avatar: "MC",
  },
  {
    id: "user-5",
    name: "Emma Davis",
    email: "emma.davis@manageme.com",
    avatar: "ED",
  },
];

// Mock workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: "workspace-1",
    name: "ManageMe Team",
    description: "Main workspace for the ManageMe project",
    icon: "💼",
    members: ["user-1", "user-2", "user-3", "user-4", "user-5"],
    owner: "user-1",
    createdAt: new Date("2024-09-01"),
    channels: [
      {
        id: "channel-1",
        name: "general",
        description: "General chat for all team members",
        type: "public",
        members: ["user-1", "user-2", "user-3", "user-4", "user-5"],
        createdAt: new Date("2024-10-01"),
        createdBy: "user-1",
        workspaceId: "workspace-1",
        messages: [
          {
            id: "msg-1",
            userId: "user-2",
            userName: "Alex Thompson",
            userAvatar: "AT",
            content:
              "Hey team! Just wanted to share that the new project dashboard is looking great!",
            timestamp: new Date("2024-10-28T09:30:00"),
          },
          {
            id: "msg-2",
            userId: "user-3",
            userName: "Sarah Wilson",
            userAvatar: "SW",
            content:
              "Thanks Alex! I love the new design. The UI is much more intuitive now.",
            timestamp: new Date("2024-10-28T09:45:00"),
          },
          {
            id: "msg-3",
            userId: "user-1",
            userName: "John Doe",
            userAvatar: "JD",
            content:
              "Great work everyone! Let's aim to deploy this by end of week.",
            timestamp: new Date("2024-10-28T10:15:00"),
          },
        ],
        tasks: [
          {
            id: "task-1",
            title: "Review Q4 Goals",
            description: "Review and update quarterly objectives",
            assignedTo: ["user-1", "user-2"],
            status: "in-progress",
            dueDate: new Date("2024-11-01"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-25"),
            channelId: "channel-1",
            workspaceId: "workspace-1",
          },
        ],
      },
      {
        id: "channel-2",
        name: "development",
        description: "Development and technical discussions",
        type: "public",
        members: ["user-1", "user-2", "user-4"],
        createdAt: new Date("2024-10-10"),
        createdBy: "user-1",
        workspaceId: "workspace-1",
        messages: [
          {
            id: "msg-4",
            userId: "user-4",
            userName: "Michael Chen",
            userAvatar: "MC",
            content: "I've completed the API integration. Ready for testing.",
            timestamp: new Date("2024-10-28T11:00:00"),
          },
          {
            id: "msg-5",
            userId: "user-2",
            userName: "Alex Thompson",
            userAvatar: "AT",
            content: "Excellent! I'll start the QA process this afternoon.",
            timestamp: new Date("2024-10-28T11:30:00"),
          },
        ],
        tasks: [
          {
            id: "task-2",
            title: "API Integration",
            description: "Integrate third-party API for data sync",
            assignedTo: ["user-4"],
            status: "done",
            dueDate: new Date("2024-10-28"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-20"),
            channelId: "channel-2",
            workspaceId: "workspace-1",
          },
          {
            id: "task-3",
            title: "QA Testing",
            description: "Complete QA testing for API integration",
            assignedTo: ["user-2"],
            status: "in-progress",
            dueDate: new Date("2024-10-30"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-28"),
            channelId: "channel-2",
            workspaceId: "workspace-1",
          },
        ],
      },
      {
        id: "channel-3",
        name: "design",
        description: "UI/UX design collaboration",
        type: "public",
        members: ["user-1", "user-3", "user-5"],
        createdAt: new Date("2024-10-05"),
        createdBy: "user-3",
        workspaceId: "workspace-1",
        messages: [
          {
            id: "msg-6",
            userId: "user-3",
            userName: "Sarah Wilson",
            userAvatar: "SW",
            content: "New mockups are ready! Check the shared folder.",
            timestamp: new Date("2024-10-28T14:00:00"),
          },
          {
            id: "msg-7",
            userId: "user-5",
            userName: "Emma Davis",
            userAvatar: "ED",
            content: "These look amazing! Love the color scheme.",
            timestamp: new Date("2024-10-28T14:30:00"),
          },
        ],
        tasks: [
          {
            id: "task-4",
            title: "Create Homepage Mockups",
            description: "Design new homepage layout and components",
            assignedTo: ["user-3"],
            status: "done",
            dueDate: new Date("2024-10-28"),
            createdBy: "user-3",
            createdAt: new Date("2024-10-22"),
            channelId: "channel-3",
            workspaceId: "workspace-1",
          },
          {
            id: "task-5",
            title: "Design System Update",
            description: "Update component library with new tokens",
            assignedTo: ["user-5"],
            status: "todo",
            dueDate: new Date("2024-11-05"),
            createdBy: "user-3",
            createdAt: new Date("2024-10-26"),
            channelId: "channel-3",
            workspaceId: "workspace-1",
          },
        ],
      },
      {
        id: "channel-4",
        name: "my-tasks",
        description: "Personal workspace for individual tasks",
        type: "private",
        members: ["user-1"],
        createdAt: new Date("2024-10-15"),
        createdBy: "user-1",
        workspaceId: "workspace-1",
        messages: [],
        tasks: [
          {
            id: "task-6",
            title: "Review Documentation",
            description: "Review and update project documentation",
            assignedTo: ["user-1"],
            status: "todo",
            dueDate: new Date("2024-11-01"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-15"),
            channelId: "channel-4",
            workspaceId: "workspace-1",
          },
        ],
      },
    ],
  },
  {
    id: "workspace-2",
    name: "Personal Projects",
    description: "Personal workspace for side projects",
    icon: "🚀",
    members: ["user-1"],
    owner: "user-1",
    createdAt: new Date("2024-09-15"),
    channels: [
      {
        id: "channel-5",
        name: "general",
        description: "General notes and ideas",
        type: "public",
        members: ["user-1"],
        createdAt: new Date("2024-09-15"),
        createdBy: "user-1",
        workspaceId: "workspace-2",
        messages: [
          {
            id: "msg-9",
            userId: "user-1",
            userName: "John Doe",
            userAvatar: "JD",
            content: "Starting work on the portfolio redesign.",
            timestamp: new Date("2024-10-27T10:00:00"),
          },
        ],
        tasks: [
          {
            id: "task-7",
            title: "Portfolio Redesign",
            description: "Redesign personal portfolio website",
            assignedTo: ["user-1"],
            status: "in-progress",
            dueDate: new Date("2024-11-15"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-20"),
            channelId: "channel-5",
            workspaceId: "workspace-2",
          },
          {
            id: "task-8",
            title: "Learn Next.js 15",
            description: "Complete Next.js 15 tutorial and build sample app",
            assignedTo: ["user-1"],
            status: "todo",
            dueDate: new Date("2024-11-30"),
            createdBy: "user-1",
            createdAt: new Date("2024-10-26"),
            channelId: "channel-5",
            workspaceId: "workspace-2",
          },
        ],
      },
    ],
  },
];

// Legacy export for backward compatibility
export const mockChannels: Channel[] = mockWorkspaces.flatMap(
  (ws) => ws.channels
);

// Mock invites
export const mockInvites: Invite[] = [
  {
    id: "invite-1",
    channelId: "channel-2",
    channelName: "development",
    workspaceId: "workspace-1",
    invitedBy: "user-1",
    invitedEmail: "newuser@manageme.com",
    status: "pending",
    sentAt: new Date("2024-10-27"),
  },
];

// Current user (for demo purposes)
export const currentUser = mockUsers[0]; // John Doe
