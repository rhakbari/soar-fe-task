"use client";
import React from "react";
import Image from "next/image";
interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  icon: string;
  bgColor: string;
}

const TransactionList = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      name: "Deposit from my Card",
      date: "28 January 2021",
      amount: -850,
      icon: "/icons/recentTransaction/creditcards_icon.svg",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      name: "Deposit Paypal",
      date: "25 January 2021",
      amount: 2500,
      icon: "/icons/recentTransaction/ipaypal_icon.svg",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      name: "Jemi Wilson",
      date: "21 January 2021",
      amount: 5400,
      icon: "/icons/recentTransaction/dollar_icon.svg",
      bgColor: "bg-cyan-50",
    },
  ];

  const renderIcon = (transaction: Transaction) => {
    if (typeof transaction.icon === "string") {
      return <Image src={transaction.icon} alt="" width={24} height={24} />;
    }
    return transaction.icon;
  };

  return (
    <div className="w-full p-3 space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 border-b pb-3 last:border-none"
        >
          <div
            className={`p-3 rounded-full ${transaction.bgColor} flex items-center justify-center`}
            aria-label={`${transaction.name} icon`}
          >
            {renderIcon(transaction)}
          </div>

          <div className="flex-1 mt-3 sm:mt-0">
            <p className="text-sm font-semibold text-gray-900">
              {transaction.name}
            </p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>
          <span
            className={`text-sm font-medium ${
              transaction.amount < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {transaction.amount < 0 ? "-" : "+"}$
            {Math.abs(transaction.amount).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
