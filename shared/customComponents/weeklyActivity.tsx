"use client";
import React, { useState, useEffect } from "react";

const WeeklyActivityChart = () => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights only on client side
    const randomHeights: any = [30, 60, 40, 70, 30, 50, 60].map((height) => ({
      deposit: height,
      withdraw: Math.floor(Math.random() * 100),
    }));
    setChartData(randomHeights);
  }, []);

  // Server-side render with fixed values
  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-end justify-between gap-2">
        {[30, 60, 40, 70, 30, 50, 60].map((height, index) => (
          <div key={index} className="w-1/8 flex gap-2">
            <div
              className="w-4 bg-blue-500 rounded-t"
              style={{ height: `${height}%` }}
            />
            <div
              className="w-4 bg-gray-200 rounded-t"
              style={{ height: "50%" }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Client-side render with dynamic values
  return (
    <div className="h-full flex items-end justify-between gap-2">
      {chartData.map((data: any, index) => (
        <div key={index} className="w-1/8 flex gap-2">
          <div
            className="w-4 bg-blue-500 rounded-t"
            style={{ height: `${data.deposit}%` }}
          />
          <div
            className="w-4 bg-gray-200 rounded-t"
            style={{ height: `${data.withdraw}%` }}
          />
        </div>
      ))}
    </div>
  );
};

export default WeeklyActivityChart;
