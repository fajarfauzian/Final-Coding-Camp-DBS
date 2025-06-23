"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCookies } from "@/lib/client-cookie";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import { FaCalendarAlt, FaClock, FaShoppingBag } from "react-icons/fa";

interface Order {
  id: number;
  customer: string;
  idUser: number;
  createdAt: string;
  total_price: number; // Changed from total to total_price to match BE
  payment_method: string;
  status: string;
}

interface User {
  id: number; // Changed from idUser to id to match BE
}

const fetchUser = async (): Promise<User | null> => {
  try {
    const token = getCookies("token") ?? "";
    if (!token) return null;
    const response = await get(`${BASE_API_URL}/user/profile`, token); // Updated endpoint
    return response?.status && response?.data ? response.data : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const fetchOrders = async (userId: number): Promise<Order[]> => {
  try {
    const token = getCookies("token") ?? "";
    if (!token) return [];
    const response = await get(`${BASE_API_URL}/order`, token);

    if (!response?.status || !response?.data) {
      return [];
    }

    // Directly access data array from response
    const orders = response.data.data || [];
    return orders.filter((order: Order) => order.idUser === userId);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const TransactionPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await fetchUser();
        if (!user) {
          Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "Please log in to view transactions.",
            confirmButtonColor: "#10B981",
          });
          return;
        }

        const orderData = await fetchOrders(user.id);
        setOrders(orderData);
      } catch (error) {
        console.error("Error loading data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load transaction history.",
          confirmButtonColor: "#10B981",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Transaction History
        </h1>
        <p className="text-gray-600 mt-2">View your past orders and transaction details</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FaShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
          <p className="text-gray-600">No transaction history found</p>
          <p className="text-gray-400 text-sm mt-2">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-emerald-600 font-medium mt-1">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    {formatTime(order.createdAt)}
                  </div>
                  <div className="text-right md:text-left">
                    <span className="text-gray-600">Payment Method: </span>
                    <span className="font-medium text-gray-900">{order.payment_method}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-lg font-semibold text-emerald-600">
                      {formatCurrency(order.total_price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
