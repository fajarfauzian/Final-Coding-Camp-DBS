"use client";
import { IProduct } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { drop } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger } from "@/components/Button";
import Modal from "@/components/Modal";

const DeleteProduct = ({ selectedProduct }: { selectedProduct: IProduct }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({ ...selectedProduct });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const TOKEN = getCookies("token") || "";

  const openModal = () => {
    setProduct({ ...selectedProduct });
    setIsShow(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = `${BASE_API_URL}/product/${selectedProduct.id}`;
      const { data } = await drop(url, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast.success(data?.message, {
          containerId: "toastMenu",
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warning(data?.message, {
          containerId: "toastMenu",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
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
        className="p-2 text-gray-600 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
        title="Delete Product"
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Delete Product</h2>
                <p className="text-sm text-red-50">
                  Product with existing transaction data cannot be deleted from this page.
                </p>
              </div>
              <button
                type="button"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all"
                onClick={() => setIsShow(false)}
                aria-label="Close modal"
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
          <div className="p-6 bg-white">
            <p className="text-gray-700">
              Are you sure you want to delete this product <span className="font-semibold">{product.name}</span>?
            </p>
          </div>

          {/* Modal footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-lg">
            <ButtonDanger
              type="button"
              onClick={() => setIsShow(false)}
              className="px-4 py-2 text-sm font-medium rounded-full"
              disabled={isLoading}
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary
              type="submit"
              className="px-6 py-2 text-sm font-medium rounded-full bg-red-500 hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
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

export default DeleteProduct;
