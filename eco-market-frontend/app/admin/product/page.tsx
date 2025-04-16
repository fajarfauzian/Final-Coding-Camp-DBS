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
  const products: IProduct[] = await getProducts(search);

  const renderCategoryBadge = (category: string) => {
    const baseStyles = "text-xs font-medium px-3 py-1 rounded-full";
    let categoryStyles = "";
    let label = category;

    switch (category) {
      case "FOOD":
        categoryStyles =
          "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white";
        label = "Food";
        break;
      case "ITEMS":
        categoryStyles =
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white";
        label = "Snack";
        break;
      default:
        categoryStyles =
          "bg-purple-100 text-purple-800 dark:bg-purple-600 dark:text-white";
        label = "Drink";
    }

    return <span className={`${baseStyles} ${categoryStyles}`}>{label}</span>;
  };

  return (

      <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">Product Data</h4>
        <p className="text-sm text-gray-600 mb-6">
          This page displays product data, allowing admins to view details,
          search, and manage products by adding, editing, or deleting them.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow max-w-md">
            <Search url="/admin/product" search={search} />
          </div>
          {/* Add Product Button */}
          <AddProduct />
        </div>

        {products.length === 0 ? (
          <AlertInfo title="Information">No products available</AlertInfo>
        ) : (
          <div className="grid gap-4">
            {products.map((product, index) => (
              <div
                key={`product-${index}`}
                className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg shadow-sm p-4 gap-4"
              >
                {/* Product Picture */}
                <div className="w-full sm:w-1/12 text-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Picture
                  </span>
                  <Image
                    width={50}
                    height={50}
                    src={`${BASE_IMAGE_PRODUCT}/${product.picture}`}
                    className="rounded-md mx-auto mt-2"
                    alt={`${product.name} product image`}
                    unoptimized
                  />
                </div>

                {/* Product Name */}
                <div className="w-full sm:w-2/12">
                  <span className="text-sm font-semibold text-gray-700">
                    Name
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {product.name}
                  </p>
                </div>

                {/* Product Price */}
                <div className="w-full sm:w-1/12">
                  <span className="text-sm font-semibold text-gray-700">
                    Price
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Product Description */}
                <div className="w-full sm:w-5/12">
                  <span className="text-sm font-semibold text-gray-700">
                    Description
                  </span>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Product Category */}
                <div className="w-full sm:w-1/12">
                  <span className="text-sm font-semibold text-gray-700">
                    Category
                  </span>
                  <div className="mt-1">
                    {renderCategoryBadge(product.category)}
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full sm:w-2/12 text-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Actions
                  </span>
                  <div className="flex justify-center gap-2 mt-2">
                    <EditProduct selectedProduct={product} />
                    <DeleteProduct selectedProduct={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default ProductPage;
