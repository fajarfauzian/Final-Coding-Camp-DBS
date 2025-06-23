"use client";
import { useEffect, useState, useCallback } from "react";
import { getCookies, storeCookie } from "@/lib/client-cookie";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import CardComponent from "@/app/user/order_product/card";
import type { IProduct, ICart, IUser } from "../../types";
import Swal from "sweetalert2";

const ProductFavorite = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data pengguna
  const fetchUser = async () => {
    try {
      const token = getCookies("token") ?? "";
      if (!token) return null;
      const response = await get<IUser>(`${BASE_API_URL}/user`, token);
      console.log("User data:", response);
      return response.status && response.data ? response.data.id : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Ambil daftar produk (instead of favorites)
  const fetchProducts = async (token: string) => {
    try {
      const response = await get<IProduct[]>(`${BASE_API_URL}/product`, token);
      console.log("Product data:", response);
      if (!response.status || !response.data) {
        throw new Error(response.message || "Failed to fetch products");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // Update cart dan simpan ke cookie
  const updateCart = useCallback(
    (newCart: ICart[]) => {
      setCart(newCart);
      storeCookie("cart", JSON.stringify(newCart));
    },
    []
  );

  // Handle cart
  const handleAddToCart = useCallback(
    (product: IProduct) => {
      setCart((prev) => {
        const updated = [...prev];
        const item = updated.find((i) => i.productId === product.id);
        if (item) {
          item.quantity += 1;
        } else {
          updated.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            note: "No note",
            picture: product.picture,
            product,
          });
        }
        updateCart(updated);
        return updated;
      });

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: "Product has been added to your cart",
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    },
    [updateCart]
  );

  const handleRemoveFromCart = useCallback(
    (product: IProduct) => {
      setCart((prev) => {
        const updated = prev.filter((i) => i.productId !== product.id || --i.quantity > 0);
        updateCart(updated);
        return updated;
      });

      Swal.fire({
        icon: "info",
        title: "Removed from Cart",
        text: "Product has been removed from your cart",
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    },
    [updateCart]
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const token = getCookies("token") || "";
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Authentication Required",
          text: "Please log in to view products.",
          confirmButtonColor: "#f97316",
        });
        setIsLoading(false);
        return;
      }

      const id = await fetchUser();
      if (!id) {
        Swal.fire({
          icon: "warning",
          title: "Authentication Required",
          text: "Please log in to view products.",
          confirmButtonColor: "#f97316",
        });
        setIsLoading(false);
        return;
      }
      setUserId(id);

      const productData = await fetchProducts(token);
      setProducts(productData);

      const savedCart = getCookies("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error("Error parsing cart from cookies:", error);
        }
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h4 className="text-3xl font-bold text-gray-800 mb-2 border-b pb-2">
            Product Favorites
          </h4>
          <p className="text-sm text-gray-600 mb-6">
            Discover and manage your favorite products
          </p>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No products available.</p>
              <p className="text-sm text-gray-400 mt-2">Check back later for new items!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform transition duration-300 hover:scale-105">
                  <CardComponent
                    data={product}
                    itemInCart={cart.find((item) => item.productId === product.id) || null}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFavorite;