"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BASE_IMAGE_PRODUCT, BASE_API_URL } from "@/global";
import { IProduct } from "@/app/types";
import useProductData from "./useProductData";
import { FaHeart, FaBowlRice } from "react-icons/fa6";
import { getCookies } from "@/lib/client-cookie";
import { post, get } from "@/lib/api-bridge";
import Swal from "sweetalert2";

interface ProductCardProps {
  product: IProduct;
  onLikeClick?: (product: IProduct) => void;
  isLiked?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const token = getCookies("token");
        if (!token) return;

        const response = await get<{data: number[]}>(`${BASE_API_URL}/favorite`, token);
        if (response.status && response.data) {
          setIsLiked(response.data.data.includes(product.id));
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfLiked();
  }, [product.id]);

  const handleToggleLike = async () => {
    try {
      const token = getCookies("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Please Login",
          text: "You need to login to add products to favorites",
          confirmButtonColor: "#f97316",
        });
        return;
      }

      const endpoint = `${BASE_API_URL}/favorite/${product.id}`;
      const response = await post(endpoint, {}, token);

      if (response.status) {
        setIsLiked(prev => !prev);
        Swal.fire({
          icon: "success",
          title: isLiked ? "Removed from favorites" : "Added to favorites",
          showConfirmButton: false,
          timer: 1500
        });
      } else if (response.status === false) {
        Swal.fire({
          icon: "error",
          title: "Operation Failed",
          text: response.message || "Failed to update favorites. Please try again.",
          confirmButtonColor: "#f97316",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Failed to update favorites. Please try again.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (!product?.id || !product?.name) {
    console.warn("Invalid product data:", product);
    return null;
  }

  const formatPrice = (price: number) => {
    const isWholeNumber = Number.isInteger(price);
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: isWholeNumber ? 0 : 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full w-full max-w-[300px] sm:max-w-[320px] mx-auto min-h-[400px] sm:min-h-[420px]">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 p-[2px]">
        {product.picture ? (
          <Image
            src={`${BASE_IMAGE_PRODUCT}/${product.picture}`}
            fill
            sizes="(max-width: 320px) 100vw, 320px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            alt={product.name || "Product image"}
            priority={false}
            onError={(e) => {
              console.error(`Failed to load image for ${product.name}: ${BASE_IMAGE_PRODUCT}/${product.picture}`);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <FaBowlRice size={80} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="font-bold text-lg sm:text-xl text-gray-900 truncate"
              title={product.name}
            >
              {product.name}
            </h3>
            <CategoryBadge category={product.category || "UNKNOWN"} />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
            {product.description || "No description available"}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Rp {formatPrice(product.price || 0)}
            </p>
            <button
              onClick={handleToggleLike}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                isLiked
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaHeart
                size={14}
                className={isLiked ? "fill-current" : "stroke-current"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const styles = {
    FOOD: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900",
    ITEMS: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900",
    DRINK: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900",
    UNKNOWN: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900",
  };

  const label =
    category === "FOOD"
      ? "Food"
      : category === "ITEMS"
      ? "Items"
      : category === "DRINK"
      ? "Drink"
      : "Unknown";

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-all duration-300 ${
        styles[category as keyof typeof styles] || styles.UNKNOWN
      }`}
    >
      {label}
    </span>
  );
};

interface ProductListProps {
  search: string;
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({ search, selectedCategory }) => {
  const productData: IProduct[] = useProductData(search);

  const filteredProductData =
    selectedCategory === "ALL"
      ? productData
      : productData.filter((product) => product.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProductData.length > 0 ? (
        filteredProductData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <svg
            className="w-12 h-12 text-gray-300 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h18v18H3zM12 8v8M8 12h8"
            />
          </svg>
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try changing your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;