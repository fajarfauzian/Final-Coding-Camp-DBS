"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type ProductItemProps = {
  icon: ReactNode;
  label: string;
  path: string;
  active?: boolean; // Optional, karena kita akan menggunakan usePathname
};

const ProductItem = ({ icon, label, path }: ProductItemProps) => {
  const pathname = usePathname(); // Mendapatkan URL saat ini
  const isActive = pathname === path; // Membandingkan URL saat ini dengan path item

  return (
    <Link href={path}>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
          isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <div className="w-5 h-5">{icon}</div>
        <span className="flex-1">{label}</span>
      </div>
    </Link>
  );
};

export default ProductItem;