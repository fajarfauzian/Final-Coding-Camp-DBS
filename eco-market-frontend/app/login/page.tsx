"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect, ReactNode } from "react";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Type for the ClientOnly component props
interface ClientOnlyProps {
  children: ReactNode;
}

// ToastContainer will be rendered only on client side
function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <>{children}</>;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Properly typed ToastContainer state
  const [ToastContainer, setToastContainer] = useState<React.ComponentType<ToastContainerProps> | null>(null);
  
  // Load ToastContainer only on client side
  useEffect(() => {
    import("react-toastify").then((mod) => {
      setToastContainer(() => mod.ToastContainer);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `${BASE_API_URL}/user/login`;
      const payload = { email, password };

      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.status === true) {
        toast.success(data.message, {
          hideProgressBar: true,
          containerId: "toastLogin",
          autoClose: 2000,
        });

        // Store data in cookies
        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);

        const role = data.data.role;

        // Redirect based on role
        setTimeout(() => {
          if (role === "ADMIN") {
            router.replace("/admin/dashboard");
          } else if (role === "USER") {
            router.replace("/user/dashboard");
          }
        }, 1000);
      } else {
        toast.warning(data.message, {
          hideProgressBar: true,
          containerId: "toastLogin",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong", {
        hideProgressBar: true,
        containerId: "toastLogin",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      {/* ToastContainer for notifications - client-side only */}
      <ClientOnly>
        {ToastContainer && <ToastContainer containerId="toastLogin" />}
      </ClientOnly>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Illustration */}
        <div className="w-full md:w-1/2 bg-green-50 p-8">
          <div className="relative h-64 md:h-full w-full">
            <Image
              alt="Eco Market Illustration"
              src="/image/ilustrasi.png"
              fill
              className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              priority
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <Image
              alt="Eco-Market Logo"
              width={80}
              height={60}
              src="/image/icon.png"
              className="h-auto mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">
              Login to Your Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 rounded-lg bg-green-500 text-white font-medium text-base hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:bg-green-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By signing in, you agree to Eco Market's{" "}
              <a href="#" className="text-green-600 hover:text-green-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 hover:text-green-700">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Copyright © 2024 Eco Market. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;