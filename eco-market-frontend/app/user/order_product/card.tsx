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
  switch (category) {
    case "FOOD":
      return (
        <span className="bg-yellow-200 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          Food
        </span>
      );
    case "ITEMS":
      return (
        <span className="bg-orange-200 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          Items
        </span>
      );
    default:
      return (
        <span className="bg-amber-300 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          Drink
        </span>
      );
  }
};

const CardComponent: React.FC<CardComponentProps> = ({
  data,
  itemInCart,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  return (
    <div className="bg-red-50 rounded-2xl p-4 transition-transform hover:scale-[1.02] flex flex-col h-full">
      {/* Product PICTURE */}
      <div className="relative aspect-square mb-3">
        {data.picture ? (
          <Image
            src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
            layout="fill"
            className="object-cover rounded-xl"
            alt={data.name}
          />
        ) : (
          <div className="items-center grid justify-items-center w-full h-full rounded-xl">
            <FaBowlRice size={180} />
            {/* <div className="font-semibold text-black rounded-b-lg">No Image</div> */}
          </div>
        )}
      </div>
      

      <div className="flex-grow flex flex-col">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg text-red-telkom-hover">{data.name}</h3>
            <CategoryBadge category={data.category} />
          </div>
          <p className="text-sm text-red-telkom line-clamp-2">
            {data.description}
          </p>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <p className="font-bold text-red-telkom-hover mb-2">
            Rp.
            {data.price.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          {/* Quantity controls */}
          <div className="flex items-center justify-end gap-2">
            {itemInCart && itemInCart.quantity > 0 && (
              <>
                <Button
                  variant="add"
                  className="w-6 h-6 rounded-full p-0 text-sm bg-red-500 hover:bg-red-600"
                  onClick={() => handleRemoveFromCart(data)}
                >
                  -
                </Button>
                <span className="w-4 text-center">{itemInCart.quantity}</span>
              </>
            )}
            <Button
              variant="add"
              className="w-6 h-6 rounded-full p-0 text-sm"
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

//old code before refactor to new code above this line
// import React from "react";
// import Image from "next/image";
// import { BASE_IMAGE_MENU } from "@/global";
// import { ICart, IMenu } from "@/app/types";

// interface CardComponentProps {
//   data: IMenu;
//   itemInCart: ICart | null;
//   handleAddToCart: (menuItem: IMenu) => void;
//   handleRemoveFromCart: (menuItem: IMenu) => void;
//   renderCategory: (cat: string) => React.ReactNode;
// }

// const CardComponent: React.FC<CardComponentProps> = ({
//   data,
//   itemInCart,
//   handleAddToCart,
//   handleRemoveFromCart,
//   renderCategory,
// }) => {
//   return (
//     <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
//       <div className="flex justify-center mb-4">
//         <Image
//           width={400}
//           height={300}
//           src={`${BASE_IMAGE_MENU}/${data.picture}`}
//           className="rounded-sm overflow-hidden w-full h-48 object-cover"
//           alt="Menu image"
//           unoptimized
//         />
//       </div>
//       <div className="mb-2 text-center">
//         <h5 className="text-xl font-semibold text-blue-800">{data.name}</h5>
//         <p className="text-gray-600">{data.description}</p>
//       </div>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-lg font-semibold text-red-600">Rp{data.price}</span>
//         <div className="flex gap-1">
//           <button
//             className="bg-green-500 text-white p-2 rounded-full"
//             onClick={() => handleAddToCart(data)}
//           >
//             +
//           </button>
//           <span className="text-blue-700">{itemInCart ? itemInCart.quantity : 0}</span>
//           <button
//             className="bg-red-500 text-white p-2 rounded-full"
//             onClick={() => handleRemoveFromCart(data)}
//           >
//             -
//           </button>
//         </div>
//       </div>
//       <div className="flex justify-center">{renderCategory(data.category)}</div>
//     </div>
//   );
// };

// export default CardComponent;
