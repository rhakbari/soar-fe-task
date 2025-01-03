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
} from 'chart.js'
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyActivityChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<any>(null);
  const NUMBER_CFG = {count: 7, min: -100, max: 100};

  useEffect(() => {
    // Generate random heights only on client side
    const randomHeights: any = [30, 60, 40, 70, 30, 50, 60].map((height) => ({
      deposit: height,
      withdraw: Math.floor(Math.random() * 100),
    }));

    setChartData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Label days of the week
      datasets: [
        {
          label: "Deposits",
          data: randomHeights.map((item: any) => item.deposit),
          backgroundColor: "rgba(0, 0, 0, 1)", 
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: "Withdrawals",
          data: randomHeights.map((item: any) => item.withdraw),
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
    // Show a loading state or placeholder chart if data isn't ready
    return (
      <div className="h-full flex items-center justify-center">
        <span>Loading Chart...</span>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <Bar
        ref={chartRef}
        data={chartData}
        options={{
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
        }}
      />
    </div>
  );
};

export default WeeklyActivityChart;
