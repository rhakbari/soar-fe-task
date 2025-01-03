import React from "react";
import CreditCard from "@/shared/customComponents/creditCard";
import Header from "@/shared/customComponents/header";
import Sidebar from "@/shared/customComponents/sidebar";
import CardSection from "@/shared/customComponents/customCard";
import { Card } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex space-x-6">
            <CardSection title={"My Cards"}>
              <CreditCard color="black"/>
              <CreditCard color="white" />
            </CardSection>
            <CardSection title={"Recent Transactions"}>
              <Card>
                {" "}
                <>hi</>
              </Card>
            </CardSection>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
