"use client";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartLine,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Profile from "../../../public/image/eco-market-logo-1.png";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";
import { motion } from "framer-motion";

// Custom hook for data fetching
const useDataFetch = (url: string) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TOKEN = getCookies("token") ?? "";
        const { data } = await get(url, TOKEN);
        if (data?.status) {
          setCount(data.data.length);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { count, loading };
};

const StatCard = ({ icon: Icon, title, value, change, color, loading }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex p-6 items-center">
      <div className="mr-4">
        <div className={`p-4 ${color.bg} ${color.text} rounded-2xl transition-all duration-300`}>
          <Icon size={28} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-baseline mt-2">
          {loading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {change && (
                <span className={`ml-2 text-xs font-medium ${change.color} ${change.bg} px-2 py-1 rounded-full`}>
                  {change.text}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <div className={`h-1.5 w-full ${color.gradient}`}></div>
  </motion.div>
);

const QuickAccessButton = ({ href, icon: Icon, text, gradient }: any) => (
  <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
    <Link
      href={href}
      className={`flex items-center p-5 ${gradient} text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300`}
    >
      <Icon className="mr-3" size={24} />
      <span className="font-semibold text-lg">{text}</span>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const { count: userCount, loading: userLoading } = useDataFetch(`${BASE_API_URL}/user`);
  const { count: productCount, loading: productLoading } = useDataFetch(`${BASE_API_URL}/product`);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin! 👋</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={userCount}
          loading={userLoading}
          change={{ text: "+12%", color: "text-green-500", bg: "bg-green-100" }}
          color={{
            bg: "bg-blue-100",
            text: "text-blue-600",
            gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
          }}
        />
        
        <StatCard
          icon={FaClipboardList}
          title="Total Products"
          value={productCount}
          loading={productLoading}
          change={{ text: "+5%", color: "text-green-500", bg: "bg-green-100" }}
          color={{
            bg: "bg-green-100",
            text: "text-green-600",
            gradient: "bg-gradient-to-r from-green-500 to-green-600"
          }}
        />

        <StatCard
          icon={FaMoneyBillWave}
          title="Total Income"
          value="$0"
          loading={false}
          change={{ text: "+0%", color: "text-yellow-500", bg: "bg-yellow-100" }}
          color={{
            bg: "bg-yellow-100",
            text: "text-yellow-600",
            gradient: "bg-gradient-to-r from-yellow-500 to-yellow-600"
          }}
        />

        <StatCard
          icon={FaChartLine}
          title="Growth Rate"
          value="0%"
          loading={false}
          change={{ text: "Stable", color: "text-gray-500", bg: "bg-gray-100" }}
          color={{
            bg: "bg-red-100",
            text: "text-red-600",
            gradient: "bg-gradient-to-r from-red-500 to-red-600"
          }}
        />
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAccessButton
            href="/admin/user"
            icon={FaUsers}
            text="Manage Users"
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          
          <QuickAccessButton
            href="/admin/product"
            icon={FaClipboardList}
            text="View Products"
            gradient="bg-gradient-to-r from-green-500 to-green-600"
          />
          
          <QuickAccessButton
            href="/admin/transaksi"
            icon={FaMoneyBillWave}
            text="Transactions"
            gradient="bg-gradient-to-r from-yellow-500 to-yellow-600"
          />
          
          <QuickAccessButton
            href="/admin/growth"
            icon={FaChartLine}
            text="Track Growth"
            gradient="bg-gradient-to-r from-red-500 to-red-600"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;