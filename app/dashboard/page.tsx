"use client";
import React, { Suspense, lazy } from "react";
import Loader from "@/shared/customComponents/loader";
import Transaction from "@/shared/customComponents/transaction";
import CardSection from "@/shared/customComponents/customCard";
import { useRouter } from "next/navigation";

// Lazy load components
const CreditCard = lazy(() => import("@/shared/customComponents/creditCard"));
const WeeklyActivity = lazy(
  () => import("@/shared/customComponents/weeklyActivity")
);

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cards Section */}
      <Suspense
        fallback={
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </section>
        }
      >
        <CardSection
          title={"My Cards"}
          backgroundColor="bg-transparent"
          onSeeAllClick={() => router.push("/creditCards")}
        >
          <CreditCard color={"black"} />
          <CreditCard color={"transparent"} />
        </CardSection>
      </Suspense>

      {/* Recent Transactions */}
      <Suspense
        fallback={
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </section>
        }
      >
        <CardSection title={"My Cards"}>
          <Transaction />
        </CardSection>
      </Suspense>

      {/* Weekly Activity Chart */}
      <Suspense
        fallback={
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </section>
        }
      >
        <CardSection title={"Weekly Activity"}>
          <div className="w-full">
            <WeeklyActivity />
          </div>
        </CardSection>
      </Suspense>

      {/* Quick Transfer */}
      {/*   <Suspense
              fallback={
                <section className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                </section>
              }
            >
              <QuickTransferSection />
            </Suspense> */}
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
