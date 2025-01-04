"use client";
import React, { Suspense, lazy, useEffect, useState } from "react";
import Transaction from "@/app/dashboard/modules/transaction";
import CardSection from "@/shared/customComponents/customCard";
import { useRouter } from "next/navigation";
import ExpenseChart from "@/app/dashboard/modules/expenseChart";
import QuickTransfer from "./modules/quickTransfer";
import BalanceHistory from "./modules/balanceHistory";

const CreditCard = lazy(() => import("@/app/dashboard/modules/creditCard"));
const WeeklyActivity = lazy(
  () => import("@/app/dashboard/modules/weeklyActivity")
);

const LoadingSkeleton = () => (
  <section className="bg-white rounded-xl p-6 h-full animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="h-48 bg-gray-200 rounded"></div>
  </section>
);

interface CreditCardData {
  cardNumber: string;
  expiry: string;
  balance: string;
  cardHolder: string;
  color: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState<CreditCardData[]>([]); 

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/credit-card`
        );
        const data = await response.json();
        setCardData(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching credit card data:", error);
      }
    };

    fetchCardData();
  }, []);

  // If the data is not yet fetched, render a loading state
  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-[#F5F7FD] rounded-xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: My Cards + Recent Transactions */}
        <div className="col-span-12 lg:col-span-8">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection
              title="My Cards"
              backgroundColor="bg-transparent"
              onSeeAllClick={() => router.push("/creditCards")}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {cardData.map((item: CreditCardData, id: number) => (
                  <div key={id} className="w-full sm:w-1/2">
                    <CreditCard
                      cardNumber={item.cardNumber}
                      expiry={item.expiry}
                      balance={item.balance}
                      cardHolder={item.cardHolder}
                      color={item.color}
                    />
                  </div>
                ))}
              </div>
            </CardSection>
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection title="Recent Transactions">
              <Transaction />
            </CardSection>
          </Suspense>
        </div>

        {/* Row 2: Weekly Activity + Expense Statistics */}
        <div className="col-span-12 lg:col-span-8">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection title="Weekly Activity">
              <div className="h-80">
                <WeeklyActivity />
              </div>
            </CardSection>
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection title="Expense Statistics">
              <div className="h-80">
                <ExpenseChart />
              </div>
            </CardSection>
          </Suspense>
        </div>

        {/* Row 3: Quick Transfer + Balance History */}
        <div className="col-span-12 lg:col-span-4">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection title="Quick Transfer">
              <div className="justify-center items-center w-full">
                <QuickTransfer />
              </div>
            </CardSection>
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Suspense fallback={<LoadingSkeleton />}>
            <CardSection title="Balance History">
              <div className="h-44">
                <BalanceHistory />
              </div>
            </CardSection>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
