"use client";
import { useEffect, useState } from "react";
import { FaClipboardList, FaStar, FaBellConcierge, FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Profile from "../../../public/image/foslogo.jpg";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";

const getProductCount = async () => {
  try {
    const token = getCookies("token") ?? "";
    const { data } = await get(`${BASE_API_URL}/product`, token);
    return data?.status ? data.data.length : 0;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return 0;
  }
};

const getOrderStats = async () => {
  try {
    const token = getCookies("token") ?? "";
    const { data } = await get(`${BASE_API_URL}/order`, token);
    if (data?.status) {
      const orders = data.data;
      const totalOrders = orders.length;
      const historyOrders = orders.filter((order: any) => order.status === "DONE").length;
      return { totalOrders, historyOrders };
    }
    return { totalOrders: 0, historyOrders: 0 };
  } catch (error) {
    console.error("Error fetching order data:", error);
    return { totalOrders: 0, historyOrders: 0 };
  }
};

const getFavoriteCount = async () => {
  try {
    const token = getCookies("token") ?? "";
    const { data } = await get(`${BASE_API_URL}/favorite`, token);
    return data?.status ? data.data.length : 0;
  } catch (error) {
    console.error("Error fetching favorite data:", error);
    return 0;
  }
};

const Dashboard: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, historyOrders: 0 });
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setProductCount(await getProductCount());
      setOrderStats(await getOrderStats());
      setFavoriteCount(await getFavoriteCount());
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Products", icon: FaClipboardList, color: "from-indigo-500 to-blue-600", value: productCount },
    { label: "Favorites", icon: FaStar, color: "from-emerald-500 to-teal-600", value: favoriteCount },
    { label: "Orders", icon: FaBellConcierge, color: "from-amber-500 to-orange-600", value: orderStats.totalOrders },
    { label: "History", icon: FaClockRotateLeft, color: "from-rose-500 to-pink-600", value: orderStats.historyOrders },
  ];

  const quickLinks = [
    { href: "/user/product", label: "Products", icon: FaClipboardList, color: "from-indigo-500 to-blue-600" },
    { href: "/user/product_favorite", label: "Favorites", icon: FaStar, color: "from-emerald-500 to-teal-600" },
    { href: "/user/order_product", label: "Order", icon: FaBellConcierge, color: "from-amber-500 to-orange-600" },
    { href: "/user/history", label: "History", icon: FaClockRotateLeft, color: "from-rose-500 to-pink-600" },
  ];

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-1 text-gray-600">Here's what's happening with your store today.</p>
        </div>
        <div className="relative">
          <Image
            src={Profile}
            width={56}
            height={56}
            alt="Profile"
            className="rounded-full border-4 border-white shadow-md transition-transform hover:scale-105"
          />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-5 ${stat.color}"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-xl bg-gradient-to-r p-3 text-white ${stat.color}`}>
                <stat.icon size={28} />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
              <div className={`h-1 w-2/3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Access</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${link.color}`}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white opacity-10 transition-transform duration-300 group-hover:scale-150"></div>
              <link.icon className="mb-4" size={32} />
              <h3 className="text-lg font-semibold">{link.label}</h3>
              <p className="mt-1 text-sm opacity-80">View Details →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;