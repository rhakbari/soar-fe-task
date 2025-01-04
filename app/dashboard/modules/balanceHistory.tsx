import React from "react";
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
  const data = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Balance",
        data: [0, 190, 300, 500, 440, 800, 600, 550],
        fill: true,
        tension: 0.4,
        borderColor: "#1814F3",
        backgroundColor: "rgba(24, 20, 243, 0.2)",
        shadowColor: "rgba(24, 20, 243, 0.5)",
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 5,
        borderWidth: 4,
      },
    ],
  };

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
