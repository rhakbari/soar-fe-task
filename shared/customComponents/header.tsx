import React from "react";
import { Search, Settings, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="text-[#404B7C] font-extrabold">Overview</div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for something"
            className="w-64 h-10 pl-10 pr-4 rounded-lg bg-[#F8F9FD] border-none text-sm font-semibold placeholder-[#98A2B3]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#98A2B3]" />
        </div>

        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <Settings className="h-5 w-5 text-[#98A2B3]" />
        </button>

        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <Bell className="h-5 w-5 text-[#98A2B3]" />
        </button>

        <button className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
export default Header;
