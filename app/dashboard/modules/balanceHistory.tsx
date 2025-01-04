"use client";

import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CurveLineChart = () => {
  const [data, setData] = useState<any>(null); 

  useEffect(() => {
    const fetchCurveLineData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/balance-history`
        );

        const data = await response.json();
        setData(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching curve line data:", error);
      }
    };

    fetchCurveLineData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
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

export default CurveLineChart;
