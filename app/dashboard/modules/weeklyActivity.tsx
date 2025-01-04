"use client";
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Loader from "@/shared/mainComponents/loader";
import {
  selectChartData,
  selectChartIsLoading,
  selectChartError,
  fetchWeeklyActivity,
} from "@/store/dashboard/weeklyActivity";
import { useAppDispatch, useAppSelector } from "@/store/hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyActivityChart = () => {
  const dispatch = useAppDispatch();
  const chartData = useAppSelector(selectChartData);
  const isLoading = useAppSelector(selectChartIsLoading);
  const error = useAppSelector(selectChartError);
  const chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(() => {
    dispatch(fetchWeeklyActivity());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="h-full flex items-center justify-center">
        No data available
      </div>
    );
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default WeeklyActivityChart;
