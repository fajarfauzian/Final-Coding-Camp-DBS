"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FaBowlRice } from "react-icons/fa6";
import Swal from "sweetalert2";

import { IProduct, ICart } from "../../types";
import { getCookies, storeCookie, removeCookies } from "@/lib/client-cookie";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "@/global";
import { get, post } from "@/lib/api-bridge";
import Button from "./button";
import CardComponent from "./card";
import Search from "./search";
import { AlertInfo } from "@/components/Alert/index";

const categories = [
  { id: "ALL", label: "All", icon: "🛍️" },
  { id: "FOOD", label: "Food", icon: "🍱" },
  { id: "DRINK", label: "Drinks", icon: "🥤" },
  { id: "ITEMS", label: "Items", icon: "📦" },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const getProduct = async (search: string, token: string): Promise<IProduct[]> => {
  try {
    if (!token) return [];
    const response = await get(`${BASE_API_URL}/product?search=${encodeURIComponent(search)}`, token);
    if (!response?.status) return [];
    return Array.isArray(response.data) ? response.data : 
           response.data?.products || response.data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("ALL");
  const [isMobile, setIsMobile] = useState(false);
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(() => {
    const storedToken = getCookies("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      return storedToken;
    }
    setIsAuthenticated(false);
    return "";
  }, []);

  const handleLoginRedirect = useCallback(() => {
    Swal.fire({
      icon: "info",
      title: "Please Log In",
      text: "You need to be logged in to checkout",
      confirmButtonText: "Log In",
      confirmButtonColor: "#10B981",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });
  }, [router]);

  const updateCart = useCallback((newCart: ICart[]) => {
    setCart(newCart);
    setTotal(newCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    storeCookie("cart", JSON.stringify(newCart));
  }, []);

  const handleAddToCart = useCallback((product: IProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        note: "-",  // Initialize with default note
        picture: product.picture,
        product,
      }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((product: IProduct) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0);
      updateCart(updated);
      return updated;
    });
  }, [updateCart]);

  const handleNoteChange = useCallback((productId: number, note: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, note: note || "-" } : item
      )
    );
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) {
      handleLoginRedirect();
      return;
    }

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Empty Cart",
        text: "Please add items to your cart first",
        confirmButtonColor: "#10B981",
      });
      return;
    }

    if (!customer.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Customer Name Required",
        text: "Please enter the customer name",
        confirmButtonColor: "#10B981",
      });
      return;
    }

    try {
      const orderData = {
        customer: customer.trim(),
        payment_method: paymentMethod,
        status: "NEW",
        orderlists: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          note: item.note || "-",  // Ensure note is never empty
        })),
      };

      const response = await post(`${BASE_API_URL}/order/create`, orderData, token);
      
      if (response?.status) {
        await Swal.fire({
          icon: "success",
          title: "Order Successful!",
          text: `Total: ${formatPrice(total)}`,
          confirmButtonColor: "#10B981",
        });
        setCart([]);
        setTotal(0);
        setCustomer("");
        setPaymentMethod("CASH");
        removeCookies("cart");
      } else {
        throw new Error(response?.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error instanceof Error ? error.message : "Please try again or contact support",
        confirmButtonColor: "#10B981",
      });
    }
  }, [cart, total, customer, paymentMethod, token, isAuthenticated, handleLoginRedirect]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentToken = checkAuth();
        const productData = await getProduct(search, currentToken);
        setProducts(productData);

        const savedCart = getCookies("cart");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart)) {
              // Ensure all cart items have a note
              const validatedCart = parsedCart.map(item => ({
                ...item,
                note: item.note || "-"
              }));
              setCart(validatedCart);
              setTotal(validatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
            }
          } catch (error) {
            console.error("Error parsing cart:", error);
          }
        }

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [search, checkAuth]);

  const filteredProducts = category === "ALL" 
    ? products 
    : products.filter((p) => p.category === category);

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-emerald-700 text-sm flex items-center gap-2">
            <span>👋</span>
            Welcome! Please
            <button 
              onClick={handleLoginRedirect}
              className="text-emerald-600 hover:text-emerald-800 underline"
            >
              log in
            </button>
            to checkout.
          </p>
        </div>
      )}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <div className="w-full sm:w-80">
          <Search url="/user/order_product" search={search} />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant="category"
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                category === cat.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100 transform -translate-y-0.5"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
        <div className="flex-1">
          {isLoading ? (
            <AlertInfo title="Loading">Fetching menu items...</AlertInfo>
          ) : error ? (
            <AlertInfo title="Error">{error}</AlertInfo>
          ) : filteredProducts.length === 0 ? (
            <AlertInfo title="No Items Found">Try another category or search term</AlertInfo>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <CardComponent
                  key={item.id}
                  data={item}
                  itemInCart={cart.find((i) => i.productId === item.id) || null}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          )}
        </div>

        <div className={`${isMobile ? "w-full" : "w-96"} sticky top-24 self-start rounded-xl bg-white p-6 shadow-xl shadow-gray-100/50 border border-gray-100`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add items to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 text-black"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 text-black"
                  >
                    <option value="CASH">Cash</option>
                    <option value="QRIS">QRIS</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                      {item.picture ? (
                        <Image
                          src={`${BASE_IMAGE_PRODUCT}/${item.picture}`}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <FaBowlRice className="text-gray-400" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-black truncate">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-black">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                      <input
                        type="text"
                        value={item.note}
                        onChange={(e) => handleNoteChange(item.productId, e.target.value)}
                        className="mt-2 w-full rounded-md border-gray-200 text-xs p-1.5 focus:border-emerald-500 focus:ring-emerald-500 text-black"
                        placeholder="Add note (required)"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-black">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-medium text-black">Total</span>
                  <span className="text-lg font-semibold text-emerald-600">
                    {formatPrice(total)}
                  </span>
                </div>
                <Button
                  className="w-full rounded-lg bg-emerald-500 py-3 text-white font-medium hover:bg-emerald-600 transition-colors"
                  onClick={handleCheckout}
                >
                  {isAuthenticated ? "Complete Order" : "Log in to Checkout"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;