import { IProduct } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/Alert";
import AddProduct from "./addProduct";
import Image from "next/image";
import Search from "./search";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";

const getProducts = async (search: string): Promise<IProduct[]> => {
  try {
    const token = await getCookies("token");
    const url = `${BASE_API_URL}/product?search=${search}`;
    const { data } = await get(url, token);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search?.toString() || "";
  const products = await getProducts(search);

  const renderCategoryBadge = (category: string) => {
    const baseStyles = "text-xs font-medium px-2.5 py-0.5 rounded-full";
    let categoryStyles = "";
    let label = category;

    switch (category) {
      case "FOOD":
        categoryStyles = "bg-red-50 text-red-700 ring-1 ring-red-600/20";
        label = "Food";
        break;
      case "DRINK":
        categoryStyles = "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
        label = "Drink";
        break;
      case "ITEMS":
        categoryStyles = "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20";
        label = "Items";
        break;
      default:
        categoryStyles = "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20";
        label = "Unknown";
    }

    return <span className={`${baseStyles} ${categoryStyles}`}>{label}</span>;
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      <div className="border-b pb-4 mb-4">
        <h4 className="text-xl font-semibold text-gray-900">Product Data</h4>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor your product inventory
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <div className="w-full sm:w-auto flex-grow max-w-md">
          <Search url="/admin/product" search={search} />
        </div>
        <AddProduct />
      </div>

      {products.length === 0 ? (
        <AlertInfo title="Information">No products available</AlertInfo>
      ) : (
        <div className="space-y-3">
          {products.map((product, index) => (
            <div
              key={`product-${index}`}
              className="flex flex-col sm:flex-row items-center bg-white border rounded-lg p-3 gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-full sm:w-1/12 text-center">
                {product.picture ? (
                  <Image
                    width={40}
                    height={40}
                    src={`${BASE_IMAGE_PRODUCT}/${product.picture}`}
                    className="rounded-md mx-auto object-cover"
                    alt={`${product.name} product image`}
                    unoptimized
                  />
                ) : (
                  <div className="w-[40px] h-[40px] bg-gray-100 rounded-md mx-auto flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-2/12">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
              </div>

              <div className="w-full sm:w-2/12">
                <p className="text-sm text-gray-700">
                  Rp {Math.round(product.price).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="w-full sm:w-3/12">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="w-full sm:w-2/12">
                {renderCategoryBadge(product.category)}
              </div>

              <div className="w-full sm:w-2/12 flex justify-center gap-2">
                <EditProduct selectedProduct={product} />
                <DeleteProduct selectedProduct={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;