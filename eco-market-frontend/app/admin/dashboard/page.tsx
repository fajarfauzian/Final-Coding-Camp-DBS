'use client';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardList, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Profile from "../../../public/image/eco-market-logo-1.png";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";

const getUserCount = async () => {
  try {
    const TOKEN = getCookies("token") ?? ""; 
    const url = `${BASE_API_URL}/user`;
    const { data } = await get(url, TOKEN);
    if (data?.status) {
      return data.data.length;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 0;
  }
};

const getProductCount = async () => {
  try {
    const TOKEN = getCookies("token") ?? ""; 
    const url = `${BASE_API_URL}/product`;
    const { data } = await get(url, TOKEN);
    if (data?.status) {
      return data.data.length;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return 0;
  }
};

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };

    const fetchProductCount = async () => {
      const count = await getProductCount();
      setProductCount(count);
    };

    fetchUserCount();
    fetchProductCount();
  }, []);

  return (
          <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
            {/* <div className="px-6 py-6 sm:px-0"> */}
              {/* <div className="rounded-lg bg-white p-6 shadow-lg"> */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Overview
                  </h2>
                  <Image src={Profile} width={50} height={50} alt="Profile" className="rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                      <FaUsers size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Users</p>
                      <p className="text-lg font-semibold text-gray-700">{userCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div className="p-3 mr-4 bg-green-500 text-white rounded-full">
                      <FaClipboardList size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Product</p>
                      <p className="text-lg font-semibold text-gray-700">{productCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div className="p-3 mr-4 bg-yellow-500 text-white rounded-full">
                      <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Income</p>
                      <p className="text-lg font-semibold text-gray-700">$0</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div className="p-3 mr-4 bg-red-500 text-white rounded-full">
                      <FaChartLine size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Growth</p>
                      <p className="text-lg font-semibold text-gray-700">0%</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
                  <div className="flex space-x-4 mt-4">
                    <Link href="/admin/user" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                      <FaUsers className="mr-2" />
                      Manage Users
                    </Link>
                    <Link href="/admin/product" className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                      <FaClipboardList className="mr-2" />
                      View Product
                    </Link>
                    <Link href="/admin/transaksi" className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
                      <FaMoneyBillWave className="mr-2" />
                      Transaction
                    </Link>
                    <Link href="/admin/growth" className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
                      <FaChartLine className="mr-2" />
                      Track Growth
                    </Link>
                  </div>
                </div>
              {/* </div> */}
            {/* </div> */}
          </div>
 
  );
};

export default Dashboard;