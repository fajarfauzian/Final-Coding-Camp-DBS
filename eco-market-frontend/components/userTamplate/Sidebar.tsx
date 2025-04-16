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
  id: string;
  title: string;
  user: IUser | null;
  productList: ProductType[];
};

const Sidebar = ({ children, id, title, productList, user }: SidebarProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
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
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-green-600 shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsShow(!isShow)}
            className="p-2 rounded-lg hover:bg-green-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
          <h1 className="font-bold text-xl text-white">{title}</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Image
              src={`${BASE_IMAGE_PROFILE}/${user?.profile_picture || "default.jpg"}`}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold">{userName || "User"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-5 h-5 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Section */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white transform transition-transform duration-300 ease-in-out z-30 ${
          isShow ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsShow(false)}
          className="p-4 flex justify-end"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6 px-4">
          <Image
            src={Logo}
            alt="Eco Market Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold ml-3">Eco Market</h2>
        </div>

        {/* User Section */}
        <div className="px-4 py-3 bg-green-800 flex items-center gap-3 mb-6">
          <Image
            src={`${BASE_IMAGE_PROFILE}/${user?.profile_picture || "default.jpg"}`}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{userName || "User"}</p>
            <p className="text-xs text-green-200">{user?.role || "Role"}</p>
          </div>
        </div>

        {/* Product Section */}
        <div className="px-4 overflow-y-auto">
          {productList.map((product, index) => (
            <ProductItem
              icon={product.icon}
              label={product.label}
              path={product.path}
              active={product.id === id}
              key={`keyProduct${index}`}
            />
          ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsShow(false)}
        />
      )}

      {/* Content Section */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Sidebar;