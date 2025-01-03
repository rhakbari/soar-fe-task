import React from "react";
import {
  FaHome,
  FaExchangeAlt,
  FaUser,
  FaChartBar,
  FaCreditCard,
  FaTools,
  FaStar,
  FaCog,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { MdTask } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { icon: <FaHome size={20} />, label: "Dashboard", active: true },
    { icon: <FaExchangeAlt size={20} />, label: "Transactions" },
    { icon: <FaUser size={20} />, label: "Accounts" },
    { icon: <FaChartBar size={20} />, label: "Investments" },
    { icon: <FaCreditCard size={20} />, label: "Credit Cards" },
    { icon: <FaHandHoldingUsd size={20} />, label: "Loans" },
    { icon: <FaTools size={20} />, label: "Services" },
    { icon: <FaStar size={20} />, label: "My Privileges" },
    { icon: <FaCog size={20} />, label: "Setting" },
  ];
  return (
    <div className="w-64 bg-white border-r flex flex-col">
      {/* Logo area */}
      <div className="p-5 m-1 flex items-center gap-2">
        <div className="w-5 h-5 bg-black rounded">
          <MdTask size={20}/>
        </div>
        {/* <div className="text-[#404B7C] text-xl font-extrabold">Soar Task</div> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-2.5 mb-1 rounded-lg cursor-pointer hover:bg-gray-50 ${
              item.active ? "text-[#404B7C]" : "text-[#98A2B3]"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span
              className={`text-sm ${
                item.active ? "font-bold" : "font-semibold"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};
export default Sidebar;
