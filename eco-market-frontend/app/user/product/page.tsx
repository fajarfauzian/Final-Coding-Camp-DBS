// "use client";
// import React, { useState } from "react";
// import { IProduct } from "@/app/types";
// // import { getCookies } from "@/lib/server-cookies";
// import { AlertInfo } from "@/components/Alert";
// import Search from "./search";
// import ProductList from "./card";
// import useProductData from "./useProductData";
// import { useSearchParams } from "next/navigation";

// const ProductPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search") || "";
//   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

//   const product = useProductData(search);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
//         <h4 className="text-xl font-bold mb-2 text-gray-900">Product data</h4>
//         <p className="text-sm text-secondary mb-4 text-gray-900">
//           This page displays product data, allowing managers to view details,
//           search, and manage product accounts by adding, editing, or deleting them.
//         </p>
//         <div className="flex justify-between items-center mb-4">
//           {/* Search Bar */}
//           <div className="flex items-center w-full max-w-md flex-grow text-black">
//             <Search url={`/user/product`} search={search} />
//           </div>
//           {/* Add product Button */}
//           <div className="ml-4">{/* <AddProduct /> */}</div>

//           {/* Category Filter */}
//           <div className="flex items-center">
//             <button
//               onClick={() => handleCategoryChange("ALL")}
//               className={`category-button ${
//                 selectedCategory === "ALL" ? "active" : ""
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => handleCategoryChange("FOOD")}
//               className={`category-button ${
//                 selectedCategory === "FOOD" ? "active" : ""
//               }`}
//             >
//               Food
//             </button>
//             <button
//               onClick={() => handleCategoryChange("DRINK")}
//               className={`category-button ${
//                 selectedCategory === "DRINK" ? "active" : ""
//               }`}
//             >
//               Drink
//             </button>
//             <button
//               onClick={() => handleCategoryChange("iTEMS")}
//               className={`category-button ${
//                 selectedCategory === "ITEMS" ? "active" : ""
//               }`}
//             >
//               Snack
//             </button>
//           </div>
//         </div>
//         {product.length === 0 ? (
//           <AlertInfo title="Information">No data Available</AlertInfo>
//         ) : (
//           <div className="m-2">
//             <ProductList search={search} selectedCategory={selectedCategory} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

//ini benarrrrrrrrr
// "use client";
// import React, { useState } from 'react';
// import { IMenu } from "@/app/types";
// import { getCookies } from "@/lib/server-cookies";
// import { AlertInfo } from "@/components/alert";
// import Search from "./search";
// import MenuList from './card';
// import useMenuData from './useMenuData';

// const MenuPage: React.FC<{ searchParams: { [key: string]: string | string[] | undefined } }> = ({ searchParams }) => {
//   const search = searchParams.search ? searchParams.search.toString() : ``;
//   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

//   const menu = useMenuData(search);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
//         <h4 className="text-xl font-bold mb-2 text-gray-900">Menu data</h4>
//         <p className="text-sm text-secondary mb-4 text-gray-900">
//           This page displays menu data, allowing managers to view details, search, and manage menu accounts by adding, editing, or deleting them.
//         </p>
//         <div className="flex justify-between items-center mb-4">
//           {/* Search Bar */}
//           <div className="flex items-center w-full max-w-md flex-grow text-black">
//             <Search url={`/cashier/menu`} search={search} />
//           </div>
//           {/* Add menu Button */}
//           <div className="ml-4">
//             {/* <AddMenu /> */}
//           </div>
//           {/* Category Filter */}
//           <div className="flex items-center">
//             <button onClick={() => handleCategoryChange("ALL")} className="category-button ">All</button>
//             <button onClick={() => handleCategoryChange("FOOD")} className="category-button">Food</button>
//             <button onClick={() => handleCategoryChange("DRINK")} className="category-button">Drink</button>
//             <button onClick={() => handleCategoryChange("SNACK")} className="category-button">Snack</button>
//           </div>
//         </div>
//         {menu.length === 0 ? (
//           <AlertInfo title="Information">
//             No data Available
//           </AlertInfo>
//         ) : (
//           <div className="m-2">
//             <MenuList search={search} selectedCategory={selectedCategory} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuPage;

// import React from 'react';
// import { IMenu } from "@/app/types";
// import { getCookies } from "@/lib/server-cookies";
// import { BASE_API_URL } from "@/global";
// import { get } from "@/lib/api-bridge";
// import { AlertInfo } from "@/components/alert";
// import Search from "./search";
// import MenuList from './card';

// const getMenu = async (search: string): Promise<IMenu[]> => {
//   try {
//     const TOKEN = await getCookies("token");
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

// const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
//   const search = searchParams.search ? searchParams.search.toString() : ``;
//   const menu = await getMenu(search);

//   return (
//     <div>
//       <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
//         <h4 className="text-xl font-bold mb-2 text-gray-900">Menuss</h4>
//         {/* <p className="text-sm text-secondary mb-4 text-gray-900">
//           This page displays menu data, allowing managers to view details, search, and manage menu accounts by adding, editing, or deleting them.
//         </p> */}
//         <div className="flex justify-between items-center mb-4">
//           {/* Search Bar */}
//           <div className="flex items-center w-full max-w-md flex-grow text-black">
//             <Search url={`/cashier/menu`} search={search} />
//           </div>
//           {/* Add menu Button */}
//           <div className="ml-4">
//             {/* <AddMenu /> */}
//           </div>
//         </div>
//         {menu.length === 0 ? (
//           <AlertInfo title="Information">
//             No data Available
//           </AlertInfo>
//         ) : (
//           <div className="m-2">
//             <MenuList search={search} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuPage;


// "use client";
// import React, { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { AlertInfo } from "@/components/Alert";
// import Search from "./search";
// import ProductList from "./card"; // Assuming this is the card/list component
// import useProductData from "./useProductData";

// const ProductPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search") || "";
//   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

//   const products = useProductData(search);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white rounded-lg p-6 border-t-4 border-t-blue-500 shadow-lg">
//         <div className="mb-6">
//           <h4 className="text-2xl font-semibold text-gray-900">Product Data</h4>
//           <p className="mt-2 text-sm text-gray-600">
//             Manage product details, search, and handle accounts by adding, editing, or deleting products.
//           </p>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="w-full sm:w-auto flex-grow max-w-lg">
//             <Search url="/user/product" search={search} />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {["ALL", "FOOD", "DRINK", "ITEMS"].map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   selectedCategory === category
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category === "ITEMS" ? "Snack" : category.charAt(0) + category.slice(1).toLowerCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//         {products.length === 0 ? (
//           <AlertInfo title="Information">No data available</AlertInfo>
//         ) : (
//           <ProductList search={search} selectedCategory={selectedCategory} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


"use client";
import React, { useState } from "react";
import { AlertInfo } from "@/components/Alert";
import Search from "./search";
import ProductList from "./card";
import useProductData from "./useProductData";
import { useSearchParams } from "next/navigation";

const ProductPage: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const product = useProductData(search);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg p-6 border-t-4 border-red-telkom-hover shadow-md">
        <h4 className="text-2xl font-bold mb-3 text-red-telkom-hover">Product Data</h4>
        <p className="text-sm text-gray-600 mb-5">
          This page displays product data, allowing managers to view details,
          search, and manage product accounts by adding, editing, or deleting them.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow max-w-md">
            <Search url={`/user/product`} search={search} />
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "FOOD", "DRINK", "ITEMS"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-red-telkom-hover text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "ALL" ? "All" : category.charAt(0) + category.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        {product.length === 0 ? (
          <AlertInfo title="Information">No data available</AlertInfo>
        ) : (
          <ProductList search={search} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;