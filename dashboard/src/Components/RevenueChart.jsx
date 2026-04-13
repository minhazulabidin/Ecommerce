import React, { useEffect, useRef } from 'react'
import Chart from "chart.js/auto";

export const RevenueChart = () => {
 const chartRef = useRef(null);

 useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [25000, 32000, 28000, 35000, 42000, 48000],
            borderColor: "#1e40af",
            backgroundColor: "rgba(30, 64, 175, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#1e40af",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280" },
          },
          y: {
            beginAtZero: true,
            grid: { color: "#f3f4f6" },
            ticks: {
              color: "#6b7280",
              callback: function (value) {
                return "$" + value.toLocaleString();
              },
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 8,
          },
        },
      },
    });

    return () => chart.destroy(); // cleanup (important)
  }, []);
  return (
    <canvas ref={chartRef} />
  )
}
