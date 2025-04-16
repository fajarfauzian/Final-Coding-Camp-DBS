import { cookies } from "next/headers";

export const getCookies = async (key: string): Promise<string> => {
  const cookieStore = await cookies(); // Tambahkan await
  return cookieStore.get(key)?.value || "";
};

export const getCookiesClient = (key: string): string => {
  if (typeof document === "undefined") return "";
  const cookies = document.cookie.split("; ");
  const found = cookies.find((row) => row.startsWith(`${key}=`));
  return found ? found.split("=")[1] : "";
};

export const setCookiesClient = (key: string, value: string, days = 7) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

export const setCookies = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

export const removeCookies = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
