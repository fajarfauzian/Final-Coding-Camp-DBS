"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

const TransaksiPage = () => {
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // Destroy previous chart instance to prevent memory leaks
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
                data: [1200, 1900, 3000, 2500, 4000, 3200, 5000], // More realistic data
                backgroundColor: "rgba(59, 130, 246, 0.2)", // Tailwind blue-500
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: "easeInOutQuad",
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Sales ($)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) => `$${context.parsed.y.toLocaleString()}`,
                },
              },
            },
          },
        });
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate total and average sales (example with static data)
  const salesData = [1200, 1900, 3000, 2500, 4000, 3200, 5000];
  const totalSales = salesData.reduce((sum, value) => sum + value, 0);
  const averageSales = totalSales / salesData.length;
  const salesTrend =
    salesData[salesData.length - 1] > salesData[0] ? "Growth" : "Decline";

  return (
    <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Sales</h2>
      <p className="text-sm text-gray-600 mb-6">
        View and analyze the monthly sales data for your business.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Summary */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Sales Summary
            </h3>
            <p className="text-sm text-gray-600">
              Total Sales:{" "}
              <span className="font-medium">
                ${totalSales.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Average Sales per Month:{" "}
              <span className="font-medium">${averageSales.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">
              Sales Trend: <span className="font-medium">{salesTrend}</span>
            </p>
          </div>

          <Link
            href="/manager/user"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="View user management page"
          >
            View Users
          </Link>
        </div>

        {/* Chart */}
        <div className="h-80">
          <canvas
            id="myChart"
            ref={canvasRef}
            className="w-full h-full"
            aria-label="Monthly sales bar chart"
          ></canvas>
        </div>
      </div>

      {/* Shop Section */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Shop</h3>
        <p className="text-sm text-gray-600 mb-4">
          Visit our store to browse and manage product inventory.
        </p>
        <Link
          href="/admin/product"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="View product management page"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
};

export default TransaksiPage;
