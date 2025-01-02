import React from "react";
import { CreditCard, DollarSign, User } from "lucide-react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/app/components/ui/card";

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
    // <Card className="w-80">
    //   <CardHeader>
    //     <CardTitle className="text-lg font-medium">
    //       Recent Transaction
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${transaction.bgColor}`}>
                {/* <transaction.icon className="w-5 h-5" /> */}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
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
    //   </CardContent>
    // </Card>
  );
};

export default TransactionList;
