import React from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  User,
  BarChart3,
  CreditCard,
  Banknote,
  Settings,
  Star,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: '/dashboard' },
    { icon: ArrowLeftRight, label: "Transactions", path: '/transactions' },
    { icon: User, label: "Accounts", path: '/accounts' },
    { icon: BarChart3, label: "Investments", path: '/investments' },
    { icon: CreditCard, label: "Credit Cards", path: '/creditCards' },
    { icon: Banknote, label: "Loans", path: '/loans' },
    { icon: Wrench, label: "Services", path: '/services' },
    { icon: Star, label: "My Privileges", path: '/privilages' },
    { icon: Settings, label: "Settings", path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the given path
    if (isOpen) {
      setIsOpen(false); // Close the sidebar when a menu item is clicked (on mobile)
    }
  };

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
      <aside
        className={`fixed left-0 top-0 h-full bg-white z-50 transition-all duration-300 
          transform lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 shadow-xl`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#404B7C] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-[#404B7C] font-bold text-xl">S-T</span>
        </div>
        <div
          className={`fixed left-0 top-0 h-full bg-white z-50 transition-all duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:w-64 w-64 shadow-xl`}
        >
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#404B7C] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-[#404B7C] font-bold text-xl">S-T</span>
          </div>

          <nav className="px-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center px-4 py-3 rounded-xl cursor-pointer mb-2
                  ${pathname === item.path ? "bg-[#F8F9FD] text-[#404B7C]" : "text-gray-400 hover:bg-gray-50"}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="ml-3 font-medium">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
