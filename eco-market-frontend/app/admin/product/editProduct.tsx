"use client";
import { useState, useRef, FormEvent } from "react";
import { IProduct } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger } from "@/components/Button";
import { InputGroupComponent, TextGroupComponent } from "@/InputComponent";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import FileInput from "@/components/FileInput";

interface ApiResponse {
  status: boolean;
  message?: string;
  errors?: string | Record<string, string>;
  data?: any;
}

const EditProduct = ({ selectedProduct }: { selectedProduct: IProduct }) => {
  const [isShow, setIsShow] = useState(false);
  const [product, setProduct] = useState<IProduct>({ ...selectedProduct });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof IProduct, string>>>({});
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setProduct({ ...selectedProduct });
    setFile(null);
    setErrors({});
    setIsShow(true);
  };

  const closeModal = () => {
    setIsShow(false);
    setFile(null);
    setErrors({});
    if (formRef.current) formRef.current.reset();
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IProduct, string>> = {};
    if (!product.name) newErrors.name = "Product name is required";
    if (!product.price) newErrors.price = "Price is required";
    if (!product.description) newErrors.description = "Description is required";
    if (!["FOOD", "DRINK", "ITEMS"].includes(product.category)) {
      newErrors.category = "Please select a valid category";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!validateForm()) {
        toast.error("Please fill in all required fields", {
          containerId: "toastMenu",
        });
        return;
      }

      const url = `${BASE_API_URL}/product/${selectedProduct.id}`;
      const payload = new FormData();
      payload.append("name", product.name);
      payload.append("price", product.price.toString());
      payload.append("description", product.description);
      payload.append("category", product.category);
      if (file) payload.append("picture", file);

      const response: ApiResponse = await put(url, payload, getCookies("token") || "");
      if (response.status) {
        closeModal();
        toast.success(response.message || "Product updated successfully", {
          containerId: "toastMenu",
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        throw new Error(response.message || response.errors?.toString() || "Failed to update product");
      }
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Something went wrong", {
        containerId: "toastMenu",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="p-2 text-gray-600 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50"
        title="Edit Product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <Modal isShow={isShow} onClose={closeModal}>
        <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto">
          {/* Modal header */}
          <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Edit Product</h2>
                <p className="text-sm text-green-50">Update your product information</p>
              </div>
              <button
                type="button"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all"
                aria-label="Close modal"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div className="space-y-4 bg-white p-6">
            <InputGroupComponent
              id="name"
              type="text"
              value={product.name}
              onChange={(val) => setProduct({ ...product, name: val })}
              required
              label="Product Name"
              placeholder="Enter product name"
              className="w-full"
              error={errors.name}
            />
            <InputGroupComponent
              id="price"
              type="number"
              value={product.price.toString()}
              onChange={(val) => setProduct({ ...product, price: Number(val) })}
              required
              label="Price"
              placeholder="Enter price"
              min={0}
              className="w-full"
              error={errors.price}
            />
            <TextGroupComponent
              id="description"
              value={product.description}
              onChange={(val) => setProduct({ ...product, description: val })}
              required
              label="Description"
              placeholder="Enter product description"
              rows={4}
              className="w-full"
              error={errors.description}
            />
            <Select
              id="category"
              value={product.category}
              label="Category"
              required
              onChange={(val) => setProduct({ ...product, category: val })}
              placeholder="Select a category"
              className="w-full"
              error={errors.category}
            >
              <option value="FOOD">Food</option>
              <option value="DRINK">Drink</option>
              <option value="ITEMS">Items</option>
            </Select>
            <FileInput
              acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
              id="profile_picture"
              label="Upload Picture (Max 2MB, JPG/JPEG/PNG)"
              onChange={setFile}
              required={false}
              className="w-full"
            />
          </div>

          {/* Modal footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-lg">
            <ButtonDanger
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium rounded-full"
              disabled={isLoading}
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary
              type="submit"
              className="px-6 py-2 text-sm font-medium rounded-full bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </ButtonPrimary>
          </div>
        </form>
      </Modal>
      <ToastContainer
        containerId="toastMenu"
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default EditProduct;