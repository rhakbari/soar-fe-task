"use client";

import React, { useEffect} from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { selectBalanceHistoryData, selectBalanceHistoryStatus, selectBalanceHistoryError, fetchBalanceHistory } from "@/store/dashboard/balanceHistory";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BalanceHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectBalanceHistoryData);
  const status = useSelector(selectBalanceHistoryStatus);
  const error = useSelector(selectBalanceHistoryError);

  useEffect(() => {
    dispatch(fetchBalanceHistory());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return null;
  }


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default BalanceHistory;
