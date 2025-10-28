"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />

      <motion.main
        className="flex-1 p-8 overflow-auto"
        initial={{ opacity: 0.98 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05 }}
      >
        <Header />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-[#ff6b6b]" />
              <h2 className="text-xl font-semibold text-white">General</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-[#ff6b6b] text-white px-4 py-2 rounded-lg">
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                  <button className="flex items-center gap-2 bg-[#1a1d23] text-gray-400 px-4 py-2 rounded-lg border border-gray-600">
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Language
                </label>
                <select className="w-full bg-[#1a1d23] text-white border border-gray-600 rounded-lg px-4 py-2">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Timezone
                </label>
                <select className="w-full bg-[#1a1d23] text-white border border-gray-600 rounded-lg px-4 py-2">
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-[#ff6b6b]" />
              <h2 className="text-xl font-semibold text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">
                    Email Notifications
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive project updates via email
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Push Notifications</h3>
                  <p className="text-gray-400 text-sm">
                    Get instant notifications in browser
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Team Updates</h3>
                  <p className="text-gray-400 text-sm">
                    Notifications from team members
                  </p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Client Messages</h3>
                  <p className="text-gray-400 text-sm">
                    Direct messages from clients
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#ff6b6b]" />
              <h2 className="text-xl font-semibold text-white">
                Privacy & Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg text-sm">
                  Enable
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Profile Visibility</h3>
                  <p className="text-gray-400 text-sm">
                    Who can see your profile
                  </p>
                </div>
                <select className="bg-[#1a1d23] text-white border border-gray-600 rounded px-3 py-1 text-sm">
                  <option>Team Only</option>
                  <option>Organization</option>
                  <option>Public</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Data Export</h3>
                  <p className="text-gray-400 text-sm">Download your data</p>
                </div>
                <button className="bg-[#1a1d23] text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-[#ff6b6b]" />
              <h2 className="text-xl font-semibold text-white">
                Data & Storage
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Storage Used</span>
                  <span className="text-gray-400">2.4 GB / 5 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#ff6b6b] h-2 rounded-full"
                    style={{ width: "48%" }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Auto-backup</h3>
                  <p className="text-gray-400 text-sm">
                    Automatically backup project data
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Clear Cache</h3>
                  <p className="text-gray-400 text-sm">
                    Free up space by clearing cache
                  </p>
                </div>
                <button className="bg-[#1a1d23] text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-8 py-3 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </motion.main>
    </div>
  );
}
