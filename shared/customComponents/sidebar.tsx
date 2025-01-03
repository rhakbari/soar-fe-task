import React from "react";
import { 
  LayoutDashboard, ArrowLeftRight, User, BarChart3, 
  CreditCard, Banknote, Settings, Star, Wrench 
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ArrowLeftRight, label: "Transactions" },
    { icon: User, label: "Accounts" },
    { icon: BarChart3, label: "Investments" },
    { icon: CreditCard, label: "Credit Cards" },
    { icon: Banknote, label: "Loans" },
    { icon: Wrench, label: "Services" },
    { icon: Star, label: "My Privileges" },
    { icon: Settings, label: "Setting" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white z-50 transition-all duration-300 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:w-64 w-64 shadow-xl`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#404B7C] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-[#404B7C] font-bold text-xl">Soar Task</span>
        </div>

        <nav className="px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center px-4 py-3 rounded-xl cursor-pointer mb-2
                  ${item.active 
                    ? 'bg-[#F8F9FD] text-[#404B7C]' 
                    : 'text-gray-400 hover:bg-gray-50'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;