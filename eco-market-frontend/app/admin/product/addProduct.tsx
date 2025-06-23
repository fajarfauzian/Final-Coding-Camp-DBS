"use client";
import { useState, useRef, FormEvent } from "react";
import { IProduct } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger, ButtonSuccess } from "@/components/Button";
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

const AddProduct = () => {
  const [isShow, setIsShow] = useState(false);
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    uuid: "",
    name: "",
    price: 0,
    description: "",
    category: "",
    picture: "",
    createdAt: "",
    updatedAt: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof IProduct, string>>>({});
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setProduct({
      id: 0,
      uuid: "",
      name: "",
      price: 0,
      description: "",
      category: "",
      picture: "",
      createdAt: "",
      updatedAt: "",
    });
    setFile(null);
    setErrors({});
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
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

      const url = `${BASE_API_URL}/product/create`;
      const payload = new FormData();
      payload.append("name", product.name);
      payload.append("price", product.price.toString());
      payload.append("description", product.description);
      payload.append("category", product.category);
      if (file) payload.append("picture", file);

      const response: ApiResponse | undefined = await post(url, payload, getCookies("token") || "");
if (response) {
  if (response.status) {
    closeModal();
    toast.success(response.message || "Product created successfully", {
      containerId: "toastMenu",
    });
    setTimeout(() => router.refresh(), 1000);
  } else {
    throw new Error(response.message || response.errors?.toString() || "Failed to create product");
  }
} else {
  throw new Error("No response received from server");
}
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Something went wrong", {
        containerId: "toastMenu",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ButtonSuccess
        type="button"
        onClick={openModal}
        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold"
        disabled={isLoading}
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Product
      </ButtonSuccess>
      <Modal isShow={isShow} onClose={closeModal}>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="sticky top-0 bg-green-500 px-6 py-4 shadow-md">
            <div className="flex items-start justify-between">
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Create New Product</h2>
                <p className="text-sm text-white">Add product details below.</p>
              </div>
              <button
                type="button"
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
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
          {/* End modal header */}

          {/* Modal body */}
          <div className="space-y-4 bg-gray-50 p-6 text-left">
            <InputGroupComponent
              id="name"
              type="text"
              value={product.name}
              onChange={(val: string) => setProduct({ ...product, name: val })}
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
              onChange={(val: string) => setProduct({ ...product, price: Number(val) })}
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
              onChange={(val: string) => setProduct({ ...product, description: val })}
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
          {/* End modal body */}

          {/* Modal footer */}
          <div className="flex justify-start gap-3 border-t border-gray-200 bg-white p-6">
            <ButtonDanger
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-semibold"
              disabled={isLoading}
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary
              type="submit"
              className="px-4 py-2 text-sm font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </ButtonPrimary>
          </div>
          {/* End modal footer */}
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

export default AddProduct;