"use client";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import Image from "next/image";

import { IProduct, ICart } from "../../types";
import { getCookies, storeCookie, removeCookies } from "@/lib/client-cookie";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/Alert/index";
import Button from "./button";
import CardComponent from "./card";
import Search from "./search";
import { FaBowlRice } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

const getProduct = async (search: string, token: string): Promise<IProduct[]> => {
  try {
    const url = `${BASE_API_URL}/product?search=${search}`;
    const { data } = await get(url, token);
    return data?.status ? data.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const categories = [
  { id: "ALL", label: "All", icon: "🕒" },
  { id: "FOOD", label: "Food", icon: "🍔" },
  { id: "DRINK", label: "Drinks", icon: "🥤" },
  { id: "ITEMS", label: "Items", icon: "🍿" },
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const ProductPage: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [product, setProduct] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const saveCartToCookies = useCallback((updatedCart: ICart[]) => {
    storeCookie("cart", JSON.stringify(updatedCart));
  }, []);

  useEffect(() => {
    const token = getCookies("token") || "";
    const fetchProduct = async () => {
      const data = await getProduct(search, token);
      setProduct(data);
    };
    fetchProduct();

    // store cart to cookies
    const savedCart = getCookies("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const calculatedTotal = parsedCart.reduce(
        (sum: number, item: ICart) => sum + item.price * item.quantity,
        0
      );
      setTotal(calculatedTotal);
    }

    // Check if the screen is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [search]);

  const updateCartAndCookies = useCallback(
    (newCart: ICart[]) => {
      setCart(newCart);
      const newTotal = newCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
      saveCartToCookies(newCart);
    },
    [saveCartToCookies]
  );

  const handleAddToCart = useCallback(
    (productItem: IProduct) => {
      const updatedCart = [...cart];
      const existingItem = updatedCart.find(
        (item) => item.productId === productItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({
          productId: productItem.id,
          name: productItem.name,
          price: productItem.price,
          quantity: 1,
          note: "",
          picture: productItem.picture,
        });
      }

      updateCartAndCookies(updatedCart);
    },
    [cart, updateCartAndCookies]
  );

  const handleRemoveFromCart = useCallback(
    (productItem: IProduct) => {
      const updatedCart = [...cart];
      const existingItem = updatedCart.find(
        (item) => item.productId === productItem.id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const index = updatedCart.indexOf(existingItem);
          updatedCart.splice(index, 1);
        }
      }

      updateCartAndCookies(updatedCart);
    },
    [cart, updateCartAndCookies]
  );

  const handleCheckout = useCallback(() => {
    alert(`Total: ${formatPrice(total)} - Proceeding to checkout...`);
    // Clear cart after checkout
    setCart([]);
    setTotal(0);
    removeCookies("cart");
  }, [total]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredProduct =
    selectedCategory === "ALL"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-md mb-4 sm:mb-0">
          <Search url={`/user/order_product`} search={search} />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-red-telkom-hover">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="category"
              onClick={() => handleCategoryChange(category.id)}
              className={`mb-2 ${
                selectedCategory === category.id ? "bg-white shadow-md" : ""
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid and Cart */}
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
        <div className={`${isMobile ? "w-full" : "flex-1"}`}>
          {product.length === 0 ? (
            <AlertInfo title="Information">No product items available</AlertInfo>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProduct.map((item, index) => (
                <CardComponent
                  key={`product-${index}`}
                  data={item}
                  itemInCart={
                    cart.find((cartItem) => cartItem.productId === item.id) || null
                  }
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Order Details */}
     <div className={`${isMobile ? "w-full" : "w-[380px] shrink-0"}`}>
  <div className="bg-white rounded-2xl p-6 shadow-sm border sticky top-[100px]">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-red-telkom-hover">Order Details:</h2>
    </div>

    <div className="space-y-4 mb-6">
      {cart.map((item) => (
        <div key={item.productId} className="flex items-center gap-3">
          {/* PICTURE */}
          <div className="relative aspect-square mb-3">
            {item.picture ? (
              <div className="w-16 h-16 bg-[#FFF5EE] rounded-xl overflow-hidden relative">
                <Image
                  fill
                  src={`${BASE_IMAGE_PRODUCT}/${item.picture}`}
                  alt={item.name}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="items-center grid justify-items-center w-full h-full rounded-xl">
                <FaBowlRice size={40} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className=" font-bold text-red-telkom">{item.name}</h3>
            <p className="text-red-telkom">{item.quantity}</p>
          </div>
          <p className="font-bold text-red-telkom">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>

    <div className="border-t pt-4">
      <div className="flex justify-between font-bold text-lg text-red-telkom">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button
        className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductPage;

//old code before refactoring to new code above this line
// "use client";
// import { useState, useEffect } from "react";
// import { IMenu, ICart } from "@/app/types";
// import { getCookie, storeCookie } from "@/lib/client-cookie";
// import { BASE_API_URL } from "@/global";
// import { get, post } from "@/lib/api-bridge"; // Assuming you have a post method for API requests
// import { AlertInfo } from "@/components/alert/index";
// import Search from "./search";
// import CardComponent from "./card";
// import { useSearchParams } from "next/navigation";

// const getMenu = async (search: string, token: string): Promise<IMenu[]> => {
//   try {
//     const url = `${BASE_API_URL}/menu?search=${search}`;
//     const { data } = await get(url, token);
//     return data?.status ? data.data : [];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// const saveCartToServer = async (cart: ICart[], token: string) => {
//   try {
//     const url = `${BASE_API_URL}/cart`;
//     const formData = new FormData();
//     formData.append("cart", JSON.stringify(cart)); // Serialize cart array to JSON string
//     await post(url, formData, token);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const MenuPage = () => {
//   const searchParams = useSearchParams(); // Menggunakan hook untuk mengambil search params
//   const search = searchParams.get("search") || ""; // Mengambil nilai parameter search

//   const [menu, setMenu] = useState<IMenu[]>([]);
//   const [cart, setCart] = useState<ICart[]>([]);
//   const [total, setTotal] = useState<number>(0);
//   const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

//   useEffect(() => {
//     const token = getCookie("token") || "";
//     const fetchMenu = async () => {
//       const data = await getMenu(search, token);
//       setMenu(data);
//     };
//     fetchMenu();
//   }, [search]);

//   useEffect(() => {
//     const savedCart = getCookie("cart");
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       setCart(parsedCart);
//       const totalAmount = parsedCart.reduce((acc: number, item: ICart) => acc + item.price * item.quantity, 0);
//       setTotal(totalAmount);
//     }
//   }, []);

//   const renderCategory = (cat: string): React.ReactNode => {
//     switch (cat) {
//       case "FOOD":
//         return (
//           <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
//             Food
//           </span>
//         );
//       case "SNACK":
//         return (
//           <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
//             Snack
//           </span>
//         );
//       default:
//         return (
//           <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
//             Drink
//           </span>
//         );
//     }
//   };

//   const handleAddToCart = (menuItem: IMenu) => {
//     const updatedCart = [...cart];
//     const existingItem = updatedCart.find((item) => item.menuId === menuItem.id);

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       updatedCart.push({
//         menuId: menuItem.id,
//         name: menuItem.name,
//         price: menuItem.price,
//         quantity: 1,
//         note: "",
//       });
//     }

//     setCart(updatedCart);
//     setTotal((prevTotal) => prevTotal + menuItem.price);
//     storeCookie("cart", JSON.stringify(updatedCart));
//     const token = getCookie("token") || "";
//     saveCartToServer(updatedCart, token);
//   };

//   const handleRemoveFromCart = (menuItem: IMenu) => {
//     const updatedCart = [...cart];
//     const existingItem = updatedCart.find((item) => item.menuId === menuItem.id);

//     if (existingItem) {
//       if (existingItem.quantity > 1) {
//         existingItem.quantity -= 1;
//         setTotal((prevTotal) => prevTotal - menuItem.price);
//       } else {
//         const index = updatedCart.indexOf(existingItem);
//         updatedCart.splice(index, 1);
//         setTotal((prevTotal) => prevTotal - menuItem.price);
//       }
//       setCart(updatedCart);
//       storeCookie("cart", JSON.stringify(updatedCart));
//       console.log(updatedCart)
//       const token = getCookie("token") || "";
//       saveCartToServer(updatedCart, token);
//     }
//   };

//   const handleCheckout = () => {
//     alert(`Total: Rp${total} - Proceeding to checkout...`);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const filteredMenu = selectedCategory === "ALL" ? menu : menu.filter(item => item.category === selectedCategory);

//   return (
//     <div className="m-4 bg-yellow-50 rounded-lg p-6 border-t-4 border-t-yellow-700 shadow-lg">
//       <h4 className="text-2xl font-bold text-yellow-700 mb-4">Menu Data</h4>
//       <p className="text-sm text-yellow-600 mb-6">
//         This page displays menu data, allowing users to view details, search,
//         and manage menu items by adding, editing, or deleting them.
//       </p>

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center w-full max-w-md">
//           <Search url={`/cashier/pesan_makanan`} search={search} />
//         </div>
//         <div className="flex items-center">
//           <button
//             onClick={() => handleCategoryChange("ALL")}
//             className={`category-button ${selectedCategory === "ALL" ? "active" : ""}`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => handleCategoryChange("FOOD")}
//             className={`category-button ${selectedCategory === "FOOD" ? "active" : ""}`}
//           >
//             Food
//           </button>
//           <button
//             onClick={() => handleCategoryChange("DRINK")}
//             className={`category-button ${selectedCategory === "DRINK" ? "active" : ""}`}
//           >
//             Drink
//           </button>
//           <button
//             onClick={() => handleCategoryChange("SNACK")}
//             className={`category-button ${selectedCategory === "SNACK" ? "active" : ""}`}
//           >
//             Snack
//           </button>
//         </div>
//       </div>

//       {menu.length === 0 ? (
//         <AlertInfo title="Informasi">No data available</AlertInfo>
//       ) : (
//         <div className="flex">
//           <div className="w-2/3 grid grid-cols-2 gap-4">
//             {filteredMenu.map((data, index) => {
//               const itemInCart = cart.find((item) => item.menuId === data.id) || null;
//               return (
//                 <CardComponent
//                   key={`keyMenu${index}`}
//                   data={data}
//                   itemInCart={itemInCart}
//                   handleAddToCart={handleAddToCart}
//                   handleRemoveFromCart={handleRemoveFromCart}
//                   renderCategory={renderCategory}
//                 />
//               );
//             })}
//           </div>

//           {/* Transaction Section on the right */}
//           <div className="w-1/3 ml-6">
//             <h4 className="text-xl font-bold text-yellow-500 mb-4">
//               Transaction
//             </h4>
//             <div className="bg-white p-4 shadow-md rounded-lg">
//               <div className="flex flex-col gap-2">
//                 {cart.map((cartItem) => (
//                   <div key={cartItem.menuId} className="flex justify-between">
//                     <span>{cartItem.name}</span>
//                     <span>
//                       {cartItem.quantity} x Rp{cartItem.price}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between mt-4">
//                 <h5 className="text-lg font-semibold">Total</h5>
//                 <span className="text-lg font-semibold text-red-600">
//                   Rp{total}
//                 </span>
//               </div>
//               <button
//                 className="bg-yellow-500 text-white p-2 rounded-full w-full mt-4"
//                 onClick={handleCheckout}
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;
