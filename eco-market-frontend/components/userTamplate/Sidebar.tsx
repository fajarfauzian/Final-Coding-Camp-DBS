"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import ProductItem from "./productItem";
import Logo from "../../public/image/foslogo.jpg"; // Sesuaikan dengan logo yang digunakan
import { useRouter } from "next/navigation";
import { getCookies, removeCookies } from "@/lib/client-cookie";
import { IUser } from "@/app/types";
import { BASE_IMAGE_PROFILE } from "@/global";

type ProductType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type SidebarProps = {
  children: ReactNode;
  title: string;
  user: IUser | null;
  productList: ProductType[];
};

const Sidebar = ({ children, productList, user }: SidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const name = getCookies("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("id");
    removeCookies("name");
    removeCookies("role");
    removeCookies("cart");
    router.replace(`/login`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-30">
        {/* Logo Section */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-200">
          <Image
            src={Logo}
            alt="Eco Market Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="text-lg font-bold text-gray-800">Eco Market</h2>
        </div>

        {/* Menu Section */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Menu Group */}
          {productList.length > 0 && (
            <>
              <div className="mt-2 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Menu
                </span>
              </div>
              {productList.map((product, index) => (
                <ProductItem
                  icon={product.icon}
                  label={product.label}
                  path={product.path}
                  key={`keyProduct${index}`}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 ml-64">
        {/* Header Section */}
        <header className="flex justify-between items-center px-6 py-2 bg-white shadow-md sticky top-0 z-20">
          {/* Search Bar */}
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <Image
                src={`${BASE_IMAGE_PROFILE}/${user?.profile_picture || "default.jpg"}`}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-semibold text-gray-800">{userName || "User"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 text-gray-500 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 transition-all duration-200 ease-out">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Section */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;