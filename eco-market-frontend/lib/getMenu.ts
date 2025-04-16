// lib/getMenu.ts
export const BASE_API_URL = "http://localhost:3306/fos20januari"; // URL API Anda

export const getMenuData = async (search: string) => {
  try {
    const res = await fetch(`${BASE_API_URL}/menu?search=${search}`);
    if (!res.ok) {
      throw new Error("Failed to fetch menu data");
    }
    const data = await res.json();
    return data.data || []; // Mengembalikan array menu atau kosong jika tidak ada data
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return []; // Mengembalikan array kosong jika ada error
  }
};
