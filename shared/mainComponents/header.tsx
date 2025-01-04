"use client";

import React, { useState } from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname() || "/dashboard";
  const formattedSegments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const currentTitle =
    formattedSegments.length === 0 ||
    formattedSegments[formattedSegments.length - 1].toLowerCase() ===
      "dashboard"
      ? "Overview"
      : formattedSegments[formattedSegments.length - 1];
  const router = useRouter();
  return (
    <>
      <header className="bg-white border-b px-6 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
          <h1 className="text-lg font-semibold">{currentTitle}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-[#F8F9FD] rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for something"
              className="ml-2 bg-transparent outline-none w-64"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="lg:block hidden p-2 hover:bg-gray-50 rounded-lg"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
            <button className="lg:block hidden p-2 hover:bg-gray-50 rounded-lg">
              <Bell className="h-5 w-5 text-gray-400" />
            </button>
            <button
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5 text-gray-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/pfp_pic.jpeg"
                alt="Profile"
                className="w-full h-full object-cover object-top"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden p-4 bg-white border-b">
          <div className="flex items-center bg-[#F8F9FD] rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for something"
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
