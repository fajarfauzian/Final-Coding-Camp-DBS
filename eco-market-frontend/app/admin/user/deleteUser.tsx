"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { drop } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger } from "@/components/Button";
import Modal from "@/components/Modal";
import { FiTrash2, FiX } from "react-icons/fi";

// Custom CSS for refined text and layout styling
const customStyles = `
  .modal-body-text {
    text-align: center;
    line-height: 1.6;
  }
  .modal-body-text .question {
    font-size: 1.125rem; /* 18px */
    font-weight: 500;
    color: #374151; /* Gray-700 */
  }
  .modal-body-text .user-name {
    font-size: 1.25rem; /* 20px */
    font-weight: 600;
    color: #1f2937; /* Gray-800 */
  }
  .modal-header-small {
    font-size: 0.875rem; /* 14px */
    line-height: 1.4;
    color: #e5e7eb; /* Gray-200 */
  }
`;

const DeleteUser = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ ...selectedUser });
  const router = useRouter();
  const TOKEN = getCookies("token") || "";

  const openModal = () => {
    setUser({ ...selectedUser });
    setIsShow(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/${selectedUser.id}`;
      const { data } = await drop(url, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message || "Failed to delete user", {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `warning`,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast(error?.response?.data?.message || "Something went wrong", {
        hideProgressBar: true,
        containerId: `toastUser`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <style>{customStyles}</style>
      <ToastContainer containerId={`toastUser`} position="top-right" />
      <ButtonDanger type="button" onClick={openModal}>
        <FiTrash2 className="size-4" />
      </ButtonDanger>
      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 rounded-t-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-white">Delete User</h3>
                <small className="modal-header-small">
                  User with existing transaction data cannot be deleted.
                </small>
              </div>
              <button
                type="button"
                className="text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsShow(false)}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* End modal header */}

          {/* Modal body */}
          <div className="p-6 bg-white">
            <div className="modal-body-text py-4">
              <p className="question">Are you sure you want to delete this user?</p>
              <p className="user-name mt-2">{user.name}</p>
            </div>
          </div>
          {/* End modal body */}

          {/* Modal footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t rounded-b-2xl">
            <ButtonDanger
              type="button"
              onClick={() => setIsShow(false)}
              className="px-4 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Delete
            </ButtonPrimary>
          </div>
          {/* End modal footer */}
        </form>
      </Modal>
    </div>
  );
};

export default DeleteUser;