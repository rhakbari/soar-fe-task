import React from "react";
import CreditCard from "@/shared/customComponents/creditCard";
import CreditCard2 from "@/shared/customComponents/creditCard2";
import Header from "@/shared/customComponents/header";
import Sidebar from "@/shared/customComponents/sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex space-x-6">
            {/* <CardSection title={"My Cards"}> */}
              <CreditCard />
              <CreditCard2 />
            {/* </CardSection> */}
            {/* <CardSection title={"Recent Transactions"}> */}
            {/* </CardSection> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
