import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "@/global";

// Interface untuk respons API
interface ApiResponse<T = any> {
  status: boolean;
  data?: T;
  message?: string;
}

// Konfigurasi instance Axios
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000, // Increased to 30 seconds
});

// Fungsi untuk menangani error Axios
const handleAxiosError = (error: AxiosError<unknown>): ApiResponse => {
  if (error.response) {
    const { status, data } = error.response;
    const message =
      (data && typeof data === "object" && "message" in data ? data.message : null) ||
      `Server error: ${status}`;
    if (status !== 404) {
      console.error(`Error ${status}: ${message}`);
    }
    return {
      status: false,
      message: typeof message === "string" ? message : `Server error: ${status}`,
    };
  }
  if (error.message.includes("ECONNRESET")) {
    console.warn("Connection reset, likely a network issue");
    return { status: false, message: "Connection reset, please try again" };
  }
  if (error.message === "No token provided") {
    return { status: false, message: error.message };
  }
  console.error("Request failed:", error.message);
  return {
    status: false,
    message: error.message || "Request failed",
  };
};

// GET request with retry logic
export const get = async <T = any>(url: string, token: string, retries = 3): Promise<ApiResponse<T>> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (!token) throw new Error("No token provided");
      const result = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: true,
        data: result.data,
      };
    } catch (error) {
      if (attempt === retries) {
        return handleAxiosError(error as AxiosError);
      }
      console.warn(`Retry ${attempt}/${retries} for ${url}`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
    }
  }
  return { status: false, message: "Max retries reached" };
};

// POST request
export const post = async <T = any>(
  url: string,
  data: string | FormData | object,
  token: string
): Promise<ApiResponse<T>> => {
  try {
    if (!token) throw new Error("No token provided");
    const isFormData = data instanceof FormData;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };
    const result = await axiosInstance.post(url, data, { headers });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    return handleAxiosError(error as AxiosError);
  }
};

// PUT request
export const put = async <T = any>(
  url: string,
  data: string | FormData | object,
  token: string
): Promise<ApiResponse<T>> => {
  try {
    if (!token) throw new Error("No token provided");
    const isFormData = data instanceof FormData;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };
    const result = await axiosInstance.put(url, data, { headers });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    return handleAxiosError(error as AxiosError);
  }
};

// DELETE request
export const del = async <T = any>(url: string, token: string): Promise<ApiResponse<T>> => {
  try {
    if (!token) throw new Error("No token provided");
    const result = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    return handleAxiosError(error as AxiosError);
  }
};