"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import ProductItem from "./productItem";
import Logo from "../../public/image/foslogo.jpg";
import { useRouter, usePathname } from "next/navigation";
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const name = getCookies("name");
    if (name) {
      setUserName(name);
    }
    
    // Check for saved sidebar state in localStorage
    const savedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (savedSidebarState) {
      setIsDesktopSidebarCollapsed(savedSidebarState === "true");
    }
  }, []);

  // Save sidebar state whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isDesktopSidebarCollapsed.toString());
  }, [isDesktopSidebarCollapsed]);

  // Close mobile sidebar on pathname change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const router = useRouter();

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("id");
    removeCookies("name");
    removeCookies("role");
    removeCookies("cart");
    router.replace(`/login`);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Section - Desktop & Mobile */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0A1929] flex flex-col z-30 transition-all duration-300 ease-in-out rounded-r-xl
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isDesktopSidebarCollapsed ? "md:w-16" : "md:w-64"}
          md:translate-x-0 shadow-xl`}
      >
        {/* Logo and Collapse Button Section */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/image/eco-market-logo-1.png"
              alt="Dollar Icon"
              width={24}
              height={24}
              className="text-green-400 rounded-full"
            />
            <h2 
              className={`text-lg font-bold text-white transition-opacity duration-300 ${
                isDesktopSidebarCollapsed ? "md:opacity-0 md:hidden" : "md:opacity-100"
              }`}
            >
              Eco Market
            </h2>
          </div>
          
          {/* Modern toggle button for desktop */}
          <button 
            onClick={toggleDesktopSidebar}
            className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-green-400 text-[#0A1929] hover:bg-green-500 transition-all absolute ${
              isDesktopSidebarCollapsed ? "right-0 translate-x-1/2" : "right-4"
            }`}
          >
            {isDesktopSidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Search Section */}
        <div className={`px-3 py-3 ${
          isDesktopSidebarCollapsed ? "md:hidden" : ""
        }`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#162A3F] text-sm text-white border-none focus:outline-none focus:ring-1 focus:ring-green-400 transition-all placeholder-gray-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Menu Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 mt-4">
          {productList.length > 0 && (
            <>
              {productList.map((product, index) => (
                <div key={`keyProduct${index}`} className={isDesktopSidebarCollapsed ? "md:flex md:justify-center" : ""}>
                  <ProductItem
                    icon={product.icon}
                    label={product.label}
                    path={product.path}
                    active={pathname === product.path}
                    collapsed={isDesktopSidebarCollapsed}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Profile Section (at bottom) */}
        <div className={`px-3 py-4 mt-auto ${isDesktopSidebarCollapsed ? "md:flex md:justify-center" : ""}`}>
          <div 
            onClick={() => !isDesktopSidebarCollapsed && setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#162A3F] transition-all ${
              isDesktopSidebarCollapsed ? "md:justify-center" : ""
            }`}
          >
            <div className="relative">
              <Image
                src={`${BASE_IMAGE_PROFILE}/${user?.profile_picture || "default.jpg"}`}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-green-400"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0A1929]"></div>
            </div>
            
            <div className={`flex-1 transition-opacity duration-300 ${
              isDesktopSidebarCollapsed ? "md:hidden md:opacity-0" : "opacity-100"
            }`}>
              <p className="font-medium text-white">{userName || "User"}</p>
              <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          
          {/* Profile Dropdown */}
          {isDropdownOpen && !isDesktopSidebarCollapsed && (
            <div className="absolute left-3 right-3 bottom-20 bg-[#162A3F] rounded-lg shadow-md py-2 z-10">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#233D56] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Profile
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#233D56] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
              <hr className="my-1 border-[#233D56]" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-[#233D56] hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button - Moved to top */}
      <div className="fixed top-4 right-4 md:hidden z-40">
        <button
          onClick={toggleMobileSidebar}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0A1929] text-white shadow-lg"
        >
          {isMobileSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div 
        className={`flex-1 p-4 transition-all duration-300 ${
          isDesktopSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;