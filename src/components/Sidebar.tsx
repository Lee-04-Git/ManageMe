"use client";

import {
  BarChart3,
  MessageSquare,
  Folder,
  Heart,
  Star,
  User,
  Users,
  Calendar,
} from "lucide-react";
import { usePathname } from "next/navigation";
import InstantLink from "./InstantLink";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: BarChart3, href: "/", label: "Dashboard" },
    { icon: Users, href: "/workspace", label: "Workspace" },
    { icon: MessageSquare, href: "/messages", label: "Messages" },
    { icon: Folder, href: "/projects", label: "Projects" },
    { icon: Calendar, href: "/calendar", label: "Calendar" },
    { icon: Heart, href: "/favorites", label: "Favorites" },
    { icon: Star, href: "/reviews", label: "Reviews" },
    { icon: User, href: "/profile", label: "Profile" },
  ];

  return (
    <div className="w-20 bg-[#1a1d23] flex flex-col items-center py-8 gap-8 rounded-l-3xl">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12L9 17L20 6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <span className="text-white text-xs font-semibold">
          check<span className="font-normal">mark</span>
        </span>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-6 mt-4">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;

          return (
            <InstantLink key={index} href={item.href} title={item.label}>
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? "bg-[#ff6b6b]" : "hover:bg-[#ff6b6b]/20"
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                />
              </div>
            </InstantLink>
          );
        })}
      </div>
    </div>
  );
}
