"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect, ReactNode } from "react";
import { storeCookie } from "@/lib/client-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSpinner, FaEnvelope, FaLock } from "react-icons/fa";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
import "react-toastify/dist/ReactToastify.css";

interface ClientOnlyProps {
  children: ReactNode;
}

function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ display: "none" }} />;
  }
  return <>{children}</>;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const root = document.querySelector("[id='heurio-app'], .heurio-app, .heurio-overlay");
    if (root) {
      root.removeAttribute("id");
      root.removeAttribute("version");
      root.classList.remove("heurio-app", "heurio-overlay");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000"}/user/login`;
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

        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);

        const role = data.data.role;

        setTimeout(() => {
          if (role === "ADMIN") {
            router.replace("/admin/dashboard");
          } else if (role === "USER") {
            router.replace("/user/dashboard");
          }
        }, 1000);
      } else {
        toast.warning(data.message || "Login failed", {
          hideProgressBar: true,
          containerId: "toastLogin",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage, {
        hideProgressBar: true,
        containerId: "toastLogin",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <head>
        <meta
          name="viewport"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <ClientOnly>
          <ToastContainer containerId="toastLogin" />
        </ClientOnly>

        <div className="flex w-full max-w-6xl items-center justify-between gap-8 px-4">
          {/* Left Side: Illustration */}
          <div className="hidden md:block w-1/2">
            <div className="relative h-[600px] w-full">
              <Image
                alt="Eco Market Illustration"
                src="/image/ilustrasi.png"
                fill
                sizes="50vw"
                className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <Image
                alt="Eco-Market Logo"
                width={100}
                height={75}
                src="/image/icon.png"
                className="h-auto mx-auto mb-6 drop-shadow-lg transform hover:rotate-3 transition-transform duration-300"
              />
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Login to continue your eco-friendly journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 text-gray-900 placeholder-gray-500 transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 text-gray-900 placeholder-gray-500 transition-all duration-300"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin h-6 w-6 mx-auto text-white" />
                ) : (
                  "Sign in to Account"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                By signing in, you agree to Eco Market's{" "}
                <a href="#" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
              <p className="text-xs text-gray-500">
                Copyright © 2025 Eco Market. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;