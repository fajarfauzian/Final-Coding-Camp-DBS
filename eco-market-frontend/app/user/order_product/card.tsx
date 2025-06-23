import type React from "react";
import Image from "next/image";
import { BASE_IMAGE_PRODUCT } from "@/global";
import type { ICart, IProduct } from "../../types";
import Button from "./button";
import { FaBowlRice } from "react-icons/fa6";

interface CardComponentProps {
  data: IProduct;
  itemInCart: ICart | null;
  handleAddToCart: (productItem: IProduct) => void;
  handleRemoveFromCart: (productItem: IProduct) => void;
}

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

const CardComponent: React.FC<CardComponentProps> = ({
  data,
  itemInCart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  // Ensure data has required fields
  if (!data?.id || !data?.name) {
    console.warn("Invalid product data:", data);
    return null; // Skip rendering if data is invalid
  }

  // Format price to remove .00 for whole numbers
  const formatPrice = (price: number) => {
    // Check if the price is a whole number
    if (Number.isInteger(price)) {
      return price.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    // For non-whole numbers, show up to 2 decimal places
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full w-full max-w-[300px] sm:max-w-[320px] mx-auto min-h-[400px] sm:min-h-[420px]">
      {/* Product Image */}
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
        {data.picture ? (
          <Image
            src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
            fill
            sizes="(max-width: 320px) 100vw, 320px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            alt={data.name || "Product image"}
            priority={false}
            onError={(e) => {
              console.error(
                `Failed to load image for ${data.name}: ${BASE_IMAGE_PRODUCT}/${data.picture}`
              );
              e.currentTarget.style.display = "none"; // Hide broken image
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <FaBowlRice size={80} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        {/* Product Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="font-bold text-lg sm:text-xl text-gray-900 truncate"
              title={data.name}
            >
              {data.name}
            </h3>
            <CategoryBadge category={data.category || "UNKNOWN"} />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
            {data.description || "No description available"}
          </p>
        </div>

        {/* Price and Controls */}
        <div className="mt-auto">
          <p className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
            Rp {formatPrice(data.price || 0)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {itemInCart && itemInCart.quantity > 0 && (
              <>
                <Button
                  variant="add"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white shadow-md transition-all duration-200"
                  onClick={() => handleRemoveFromCart(data)}
                >
                  -
                </Button>
                <span className="w-5 sm:w-6 text-center font-medium text-gray-700 text-sm sm:text-base">
                  {itemInCart.quantity}
                </span>
              </>
            )}
            <Button
              variant="add"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white shadow-md transition-all duration-200"
              onClick={() => handleAddToCart(data)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;