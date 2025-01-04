"use client";
import React, { Suspense, lazy } from "react";
import Transaction from "@/app/dashboard/modules/transaction";
import CardSection from "@/shared/customComponents/customCard";
import { useRouter } from "next/navigation";
import ExpenseChart from "@/app/dashboard/modules/expenseChart";

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

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CardSection
            title="My Cards"
            backgroundColor="bg-transparent"
            onSeeAllClick={() => router.push("/creditCards")}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <CreditCard color="black" />
              </div>
              <div className="w-full sm:w-1/2">
                <CreditCard color="transparent" />
              </div>
            </div>
          </CardSection>
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <CardSection title="Recent Transactions">
            <div className="w-full">
              <Transaction />
            </div>
          </CardSection>
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <CardSection title="Weekly Activity">
            <div className="w-full h-80">
              <WeeklyActivity />
            </div>
          </CardSection>
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <CardSection title="Expense Statistics">
            <div className="w-full h-80">
              <ExpenseChart />
            </div>
          </CardSection>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
