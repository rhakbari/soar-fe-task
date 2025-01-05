"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  selectExpenseData,
  selectExpenseStatus,
  selectExpenseError,
  fetchExpenseData,
} from "@/store/dashboard/expenseChart";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectExpenseData);
  const status = useSelector(selectExpenseStatus);
  const error = useSelector(selectExpenseError);

  React.useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error || "Unknown error occurred"}</div>;
  }

  if (!data) {
    return null;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
