import React from "react";
import { CreditCard, DollarSign, User } from "lucide-react";

const TransactionList = () => {
  const transactions = [
    {
      id: 1,
      name: "Deposit from my Card",
      date: "28 January 2021",
      amount: -850,
      icon: CreditCard,
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      name: "Deposit Paypal",
      date: "25 January 2021",
      amount: 2500,
      icon: <DollarSign />,
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      name: "Jemi Wilson",
      date: "21 January 2021",
      amount: 5400,
      icon: User,
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="w-full p-4 space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 border-b pb-3 last:border-none"
        >
          {/* Circular Icon */}
          <div
            className={`p-5 rounded-full ${transaction.bgColor}`}
            aria-label={`${transaction.name} icon`}
          ></div>

          {/* Transaction Details */}
          <div className="flex-1 mt-3 sm:mt-0">
            <p className="text-sm font-semibold text-gray-900">
              {transaction.name}
            </p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>

          {/* Transaction Amount */}
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
