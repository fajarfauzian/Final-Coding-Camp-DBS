import { cookies } from "next/headers";

export const getCookies = async (key: string): Promise<string> => {
  return (await cookies()).get(key)?.value || "";
};
export const setCookies = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};
export const removeCookies = async (key: string) => {
  (await cookies()).delete(key);
};
