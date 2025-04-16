import { useState, useEffect } from "react";
import { BASE_API_URL } from "@/global";
import { IProduct } from "@/app/types";
import { get } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";

const getProduct = async (search: string): Promise<IProduct[]> => {
  try {
    const TOKEN = (await getCookies("token")) || "";
    const url = `${BASE_API_URL}/product?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IProduct[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const useProductData = (search: string) => {
  const [productData, setProductData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProduct(search);
      setProductData(data);
    };

    fetchData();
  }, [search]);

  return productData;
};

export default useProductData;
