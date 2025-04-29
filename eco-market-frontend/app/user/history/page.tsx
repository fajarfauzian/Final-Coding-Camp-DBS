"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

const TransaksiPage = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
            datasets: [
              {
                label: "Monthly Sales",
                data: [1, 2, 3, 4, 5, 6, 7],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: {
              duration: 2000,
              easing: "easeInOutBounce",
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Sales",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
      <div className="rounded-lg bg-white p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Transaction Dashboard
        </h2>

        {/* Monthly Sales Section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Monthly Sales Overview
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Here is the monthly sales data.
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Total Sales:</span> $0
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Average Sales per Month:</span> $0
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Sales Trend:</span> Growth
            </p>
          </div>
          <Link
            href="/admin/user"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
          >
            View Users
          </Link>
        </div>

        {/* Chart Section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Sales Chart
          </h3>
          <div className="w-full">
            <canvas id="myChart" className="max-h-96"></canvas>
          </div>
        </div>

        {/* Shop Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Shop</h3>
          <p className="text-sm text-gray-600 mb-4">
            Visit our store to explore and purchase our products.
          </p>
          <Link
            href="/admin/product"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
          >
            Go to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPage;
