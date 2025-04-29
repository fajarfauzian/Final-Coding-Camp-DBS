'use client';
import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaStar } from 'react-icons/fa';
import { FaBellConcierge, FaClockRotateLeft } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import Profile from '../../../public/image/foslogo.jpg';
import { BASE_API_URL } from '@/global';
import { getCookies } from '@/lib/client-cookie';
import { get } from '@/lib/api-bridge';

const getProductCount = async () => {
  try {
    const TOKEN = getCookies('token') ?? '';
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
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      const count = await getProductCount();
      setProductCount(count);
    };

    fetchProductCount();
  }, []);

  return (
    <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <Image
          src={Profile}
          width={50}
          height={50}
          alt="Profile"
          className="rounded-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
            <FaClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Product</p>
            <p className="text-lg font-semibold text-gray-700">{productCount}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 bg-green-500 text-white rounded-full">
            <FaStar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Product favourite</p>
            <p className="text-lg font-semibold text-gray-700">{0}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 bg-yellow-500 text-white rounded-full">
            <FaBellConcierge size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pesan makanan</p>
            <p className="text-lg font-semibold text-gray-700">0</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
          <div className="p-3 mr-4 bg-red-500 text-white rounded-full">
            <FaClockRotateLeft size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">History</p>
            <p className="text-lg font-semibold text-gray-700">0</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
        <div className="flex space-x-4 mt-4">
          <Link
            href="/user/product"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            <FaClipboardList className="mr-2" />
            Product
          </Link>
          <Link
            href="/user/product_favorite"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <FaStar className="mr-2" />
            product favourite
          </Link>
          <Link
            href="/user/order_product"
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          >
            <FaBellConcierge className="mr-2" />
            pesan barang
          </Link>
          <Link
            href="/user/history"
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            <FaClockRotateLeft className="mr-2" />
            history pemesana
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;