'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const data = {
    labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
    datasets: [{
      data: [30, 15, 20, 35],
      backgroundColor: [
        '#2A3267',
        '#FF7518',
        '#4169E1',
        '#1C1C1C'
      ],
      hoverOffset: 30
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        font: {
          size: 18
        }
      }
    }
  };

  return (
    <div className="w-96 h-96">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;