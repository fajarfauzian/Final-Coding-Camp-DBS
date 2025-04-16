// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "@/global";
// import { IProduct } from "@/app/types";
// import { get } from "@/lib/api-bridge";
// import { getCookies } from "@/lib/client-cookie";
// import useProductData from "./useProductData";

// const getMenu = async (search: string): Promise<IProduct[]> => {
//   try {
//     const TOKEN = await getCookies("token") || "";
//     const url = `${BASE_API_URL}/menu?search=${search}`;
//     const { data } = await get(url, TOKEN);
//     let result: IProduct[] = [];
//     if (data?.status) result = [...data.data];
//     return result;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// interface ProductCardProps {
//   product: IProduct;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const [quantity, setQuantity] = useState(0);

//   const incrementQty = () => setQuantity(quantity + 1);
//   const decrementQty = () => {
//     if (quantity > 0) setQuantity(quantity - 1);
//   };

//   return (
//     <div className="product-card flex flex-col items-center">
//       <div className="image-container w-full">
//         {product.picture ? (
//           <Image
//             width={240}
//             height={240}
//             src={`${BASE_IMAGE_PRODUCT}/${product.picture}`}
//             className="rounded-sm overflow-hidden"
//             alt="preview"
//             unoptimized
//             onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
//           />
//         ) : (
//           <span>No image</span>
//         )}
//       </div>
//       <div className="text-container text-center font-semibold mb-2">
//         {product.name}
//       </div>
//       <div className="text-container text-center text-gray-600 mb-2">
//         {product.description}
//       </div>
//       <div className="text-center mb-2">{product.price}</div>
//       <div className="text-center mb-2 ml-2">
//         <CategoryBadge category={product.category} />
//       </div>
//       {/* <div className="qty-buttons flex justify-center items-center border border-gray-300 rounded px-2 py-1">
//         <button onClick={decrementQty}>-</button>
//         <span className="mx-2">{quantity}</span>
//         <button  onClick={incrementQty}>+</button>
//       </div> */}
//     </div>
//   );
// };

// interface CategoryBadgeProps {
//   category: string;
// }

// const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
//   if (category === "FOOD") {
//     return (
//       <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-white">
//         Food
//       </span>
//     );
//   }
//   if (category === "SNACK") {
//     return (
//       <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-white">
//         Snack
//       </span>
//     );
//   }

//   return (
//     <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-white">
//       Drink
//     </span>
//   );
// };

// interface ProductListProps {
//   search: string;
//   selectedCategory: string;
// }

// const ProductList: React.FC<ProductListProps> = ({
//   search,
//   selectedCategory,
// }) => {
//   const productData: IProduct[] = useProductData(search);

//   const filteredProductData =
//     selectedCategory === "ALL"
//       ? productData
//       : productData.filter((product) => product.category === selectedCategory);

//   return (
//     <div className="product-list flex flex-wrap justify-start">
//       {filteredProductData.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { BASE_API_URL, BASE_IMAGE_MENU } from '@/global';
// import { IMenu } from '@/app/types';
// import { get } from '@/lib/api-bridge';
// import { getCookie } from "@/lib/client-cookie";

// const getMenu = async (search: string): Promise<IMenu[]> => {
//   try {
//     const TOKEN = await getCookie("token") || "";
//     const url = `${BASE_API_URL}/menu?search=${search}`;
//     const { data } = await get(url, TOKEN);
//     let result: IMenu[] = [];
//     if (data?.status) result = [...data.data];
//     return result;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// interface MenuCardProps {
//   menu: IMenu;
// }

// const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
//   const [quantity, setQuantity] = useState(0);

//   const incrementQty = () => setQuantity(quantity + 1);
//   const decrementQty = () => {
//     if (quantity > 0) setQuantity(quantity - 1);
//   };

//   return (
//     <div className="menu-card flex flex-col items-center">
//       <div className="image-container w-full">
//         {menu.picture ? (
//           <Image
//             width={240}
//             height={240}
//             src={`${BASE_IMAGE_MENU}/${menu.picture}`}
//             className="rounded-sm overflow-hidden"
//             alt="preview"
//             unoptimized
//             onError={(e) => (e.currentTarget.src = '/fallback-image.png')}
//           />
//         ) : (
//           <span>No image</span>
//         )}
//       </div>
//       <div className="text-container text-center font-semibold mb-2">
//         {menu.name}
//       </div>
//       <div className="text-container text-center text-gray-600 mb-2">
//         {menu.description}
//       </div>
//       <div className="text-center mb-2">
//         {menu.price}
//       </div>
//       <div className="text-center mb-2 ml-2">
//         <CategoryBadge category={menu.category} />
//       </div>
//       <div className="qty-buttons flex justify-center items-center border border-gray-300 rounded px-2 py-1">
//         <button onClick={decrementQty}>-</button>
//         <span className="mx-2">{quantity}</span>
//         <button onClick={incrementQty}>+</button>
//       </div>
//     </div>
//   );
// };

// interface CategoryBadgeProps {
//   category: string;
// }

// const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
//   if (category === "FOOD") {
//     return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-white">Food</span>;
//   }
//   if (category === "SNACK") {
//     return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-white">Snack</span>;
//   }
//   return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-white">Drink</span>;
// };

// const MenuList: React.FC<{ search: string }> = ({ search }) => {
//   const [menuData, setMenuData] = useState<IMenu[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getMenu(search);
//       setMenuData(data);
//     };

//     fetchData();
//   }, [search]);

//   return (
//     <div className="menu-list flex flex-wrap justify-start">
//       {menuData.map((menu) => (
//         <MenuCard key={menu.id} menu={menu} />
//       ))}
//     </div>
//   );
// };

// export default MenuList;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BASE_IMAGE_PRODUCT } from "@/global";
import { IProduct } from "@/app/types";
import useProductData from "./useProductData";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQty = () => setQuantity(quantity + 1);
  const decrementQty = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-md p-4 m-4 w-64 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <div className="image-container w-full h-48 relative mb-4">
        {product.picture ? (
          <Image
            width={240}
            height={240}
            src={`${BASE_IMAGE_PRODUCT}/${product.picture}`}
            className="rounded-md object-cover w-full h-full border border-gray-200"
            alt={product.name}
            unoptimized
            onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
      <div className="text-container text-center">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="text-lg font-medium text-green-600 mb-3">
          ${product.price.toFixed(2)}
        </div>
        <div className="mb-3">
          <CategoryBadge category={product.category} />
        </div>
        {/* Uncomment if you want to re-enable quantity buttons */}
        {/* <div className="qty-buttons flex justify-center items-center border border-gray-300 rounded-full px-3 py-1">
          <button onClick={decrementQty} className="text-gray-600 font-bold">-</button>
          <span className="mx-3 text-gray-800">{quantity}</span>
          <button onClick={incrementQty} className="text-gray-600 font-bold">+</button>
        </div> */}
      </div>
    </div>
  );
};

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const badgeStyles = {
    FOOD: "bg-blue-100 text-blue-800",
    ITEMS: "bg-yellow-100 text-yellow-800",
    DRINK: "bg-purple-100 text-purple-800",
  };

  const categoryText = category === "FOOD" ? "Food" : category === "ITEMS" ? "Items" : "Drink";

  return (
    <span
      className={`text-sm font-medium px-3 py-1 rounded-full ${
        badgeStyles[category as keyof typeof badgeStyles] || badgeStyles.DRINK
      }`}
    >
      {categoryText}
    </span>
  );
};

interface ProductListProps {
  search: string;
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({
  search,
  selectedCategory,
}) => {
  const productData: IProduct[] = useProductData(search);

  const filteredProductData =
    selectedCategory === "ALL"
      ? productData
      : productData.filter((product) => product.category === selectedCategory);

  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
      {filteredProductData.length > 0 ? (
        filteredProductData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-8">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductList;