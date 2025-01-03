import React from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";

const Header = ({ isOpen, setIsOpen }: any) => {
  return (
    <header className="bg-white border-b px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
        >
          <Menu className="h-5 w-5 text-gray-500" />
        </button>
        <h1 className="text-lg font-semibold">Overview</h1>
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
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;