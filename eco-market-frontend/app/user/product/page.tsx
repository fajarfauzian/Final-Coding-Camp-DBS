"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertInfo } from "@/components/Alert";
import Search from "./search";
import ProductList from "./card";
import { FiSearch } from "react-icons/fi";
import useProductData from "./useProductData";

const categories = [
  { id: "ALL", label: "All" },
  { id: "FOOD", label: "Food" },
  { id: "DRINK", label: "Drinks" },
  { id: "ITEMS", label: "Items" },
];

const ProductPage: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const products = useProductData(search);

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      {/* Header with gradient border */}
      <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
        <div className="h-0.5 bg-gradient-to-r from-green-400 via-blue-500 to-blue-600"></div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Product Management</h1>
              <p className="text-xs text-gray-500">
                View, search, and manage your product catalog
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="mb-4 bg-white rounded-lg shadow-sm p-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-72 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <Search url="/user/product" search={search} />
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {products.length === 0 ? (
          <AlertInfo title="Information">No products available</AlertInfo>
        ) : (
          <ProductList search={search} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;