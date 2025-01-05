import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    {
      icon: "/icons/sidebar/dashboard.svg",
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: "/icons/sidebar/transactions.svg",
      label: "Transactions",
      path: "/transactions",
    },
    {
      icon: "/icons/sidebar/account.svg",
      label: "Accounts",
      path: "/accounts",
    },
    {
      icon: "/icons/sidebar/investment.svg",
      label: "Investments",
      path: "/investments",
    },
    {
      icon: "/icons/sidebar/credit-cards.svg",
      label: "Credit Cards",
      path: "/creditCards",
    },
    { icon: "/icons/sidebar/loans.svg", label: "Loans", path: "/loans" },
    {
      icon: "/icons/sidebar/services.svg",
      label: "Services",
      path: "/services",
    },
    {
      icon: "/icons/sidebar/privileges.svg",
      label: "My Privileges",
      path: "/privilages",
    },
    {
      icon: "/icons/sidebar/settings.svg",
      label: "Settings",
      path: "/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isOpen) {
      setIsOpen(false);
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
            <span className="text-white font-bold text-xl">Soar Task</span>
          </div>
          <span className="text-[#404B7C] font-bold text-xl">Soar Task</span>
        </div>
        <div
          className={`fixed left-0 top-0 h-full bg-white z-50 transition-all duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:w-64 w-64 shadow-xl`}
        >
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center">
              <Image
                src="/task-fill-icon.svg"
                alt="Soar-icon"
                className="w-full h-full object-cover object-top"
                width={30}
                height={30}
              />
            </div>
            <span className="text-[#404B7C] font-bold text-xl">Soar Task</span>
          </div>

          <nav className="px-4">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;

              return (
                <div
                  key={index}
                  className={`flex items-center px-4 py-3 rounded-xl cursor-pointer mb-2
                    ${
                      isActive
                        ? "bg-[#F8F9FD] text-[#404B7C]"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <img
                    src={item.icon}
                    width={20}
                    height={20}
                    alt={item.label}
                    className={isActive ? "filter invert" : "filter-none"} // Apply dark effect on active
                  />
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
