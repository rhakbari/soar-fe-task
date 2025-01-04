"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartData,
  ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define interfaces for your data structure
interface ActivityData {
  deposit: number;
  withdraw: number;
}

const WeeklyActivityChart = () => {
  const [chartData, setChartData] = useState<ChartData<'bar', number[], string> | null>(null);
  const chartRef = useRef<ChartJS<'bar'>>(null);

  useEffect(() => {
    // Generate random heights only on client side
    const randomHeights: ActivityData[] = [30, 60, 40, 70, 30, 50, 60].map((height) => ({
      deposit: height,
      withdraw: Math.floor(Math.random() * 100),
    }));

    setChartData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Deposits",
          data: randomHeights.map((item) => item.deposit),
          backgroundColor: "rgba(0, 0, 0, 1)", 
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: "Withdrawals",
          data: randomHeights.map((item) => item.withdraw),
          backgroundColor: "#396AFF", 
          borderColor: "#396AFF",
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
      ],
    });
  }, []);

  if (!chartData) {
    return (
      <div className="h-full flex items-center justify-center">
        <span>Loading Chart...</span>
      </div>
    );
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Activity",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
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
    <div className="h-full p-4">
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default WeeklyActivityChart;