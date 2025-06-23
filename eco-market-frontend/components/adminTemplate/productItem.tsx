"use client";
import Link from "next/link";
import { ReactNode } from "react";

type ProductItemProps = {
  icon: ReactNode;
  label: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
};

const ProductItem = ({ 
  icon, 
  label, 
  path, 
  active = false, 
  onClick,
  collapsed = false
}: ProductItemProps) => {
  return (
    <Link href={path}>
      <div
        className={`flex items-center gap-3 p-3 my-1 rounded-lg text-sm transition-all duration-200
          ${active 
            ? "bg-[#162A3F] text-green-400 font-medium" 
            : "text-gray-300 hover:bg-[#162A3F] hover:text-white"
          }
          ${collapsed ? "md:justify-center md:w-10 md:mx-auto md:p-3" : ""}
        `}
      >
        <div className={`${collapsed ? "md:w-5 md:h-5" : "w-5 h-5"} flex-shrink-0 ${active ? "text-green-400" : "text-gray-400"}`}>
          {icon}
        </div>
        
        <span className={`flex-1 transition-opacity duration-300 ${
          collapsed ? "md:hidden md:opacity-0" : "opacity-100"
        }`}>
          {label}
        </span>
        
        {active && !collapsed && (
          <div className="w-1 h-5 rounded-full bg-green-400"></div>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;