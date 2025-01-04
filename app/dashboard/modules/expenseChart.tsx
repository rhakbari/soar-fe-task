'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const [data, setData] = useState<any>(null); // Use a state to store the fetched data

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/expense-data`);
        const data = await response.json();
        setData(data); 
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenseData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
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
      {/* Ensures the chart dynamically fits the parent container */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
