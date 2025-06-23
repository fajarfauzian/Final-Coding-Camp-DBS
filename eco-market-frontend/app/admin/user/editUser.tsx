"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonPrimary,
  ButtonDanger,
  ButtonInfo,
} from "@/components/Button";
import { InputGroupComponent } from "@/InputComponent";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import FileInput from "@/components/FileInput";

interface response {
  status: boolean;
  data: {
    status: boolean;
    message: string;
    data: [];
  };
}

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ ...selectedUser, password: "" });
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const router = useRouter();
  const TOKEN = getCookies("token") || "";
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setUser({ ...selectedUser, password: "" });
    setFile(null);
    setShowPasswordInput(false);
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const validateForm = () => {
    if (!user.name) return "Name is required";
    if (!user.email) return "Email is required";
    if (showPasswordInput && !user.password) return "Password is required";
    if (!["ADMIN", "USER"].includes(user.role)) return "Please select a valid role (Admin or User)";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast(error, {
        hideProgressBar: true,
        containerId: "toastUser",
        type: "warning",
      });
      return;
    }

    try {
      const url = `${BASE_API_URL}/user/${selectedUser.id}`;
      const { name, email, password, role } = user;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("email", email || "");
      if (showPasswordInput && password) {
        payload.append("password", password);
      }
      payload.append("role", role || "");
      if (file) payload.append("picture", file);

      const { data } = (await put(url, payload, TOKEN)) as response;
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: "toastUser",
          type: "success",
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message || "Failed to update user", {
          hideProgressBar: true,
          containerId: "toastUser",
          type: "warning",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast(error?.response?.data?.message || "Something went wrong", {
        hideProgressBar: true,
        containerId: "toastUser",
        type: "error",
      });
    }
  };

  return (
    <div>
      <ButtonInfo type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </ButtonInfo>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-3 rounded-t-2xl shadow">
            <div className="w-full flex items-center">
              <div className="text-left">
                <h3 className="font-semibold text-lg text-white">Edit User</h3>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="text-white hover:text-blue-200 transition-colors"
                  onClick={() => setIsShow(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
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
          </div>
          {/* End modal header */}

          {/* Modal body */}
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <InputGroupComponent
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(val) => setUser({ ...user, name: val })}
                  required={true}
                  label="Full Name"
                  placeholder="Enter name"
                  className="text-left"
                />
              </div>

              <div>
                <InputGroupComponent
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(val) => setUser({ ...user, email: val })}
                  required={true}
                  label="Email"
                  placeholder="Enter email"
                  className="text-left"
                />
              </div>

              <div>
                <Select
                  id="role"
                  value={user.role}
                  label="Role"
                  required={true}
                  onChange={(val) => setUser({ ...user, role: val })}
                  className="text-left"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </Select>
              </div>

              <div>
                {showPasswordInput ? (
                  <InputGroupComponent
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(val) => setUser({ ...user, password: val })}
                    required={true}
                    label="Password"
                    placeholder="Enter new password"
                    className="text-left"
                  />
                ) : (
                  <button
                    type="button"
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded text-left w-full"
                    onClick={() => setShowPasswordInput(true)}
                  >
                    Change Password
                  </button>
                )}
              </div>

              <div>
                <FileInput
                  acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
                  id="profile_picture"
                  label="Profile Picture"
                  onChange={(f) => setFile(f)}
                  required={false}
                  className="text-left"
                />
              </div>
            </div>
          </div>
          {/* End modal body */}

          {/* Modal footer */}
          <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t rounded-b-2xl">
            <ButtonDanger
              type="button"
              onClick={() => setIsShow(false)}
              className="px-4 py-1.5 text-left"
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary type="submit" className="px-4 py-1.5 text-left">
              Save
            </ButtonPrimary>
          </div>
          {/* End modal footer */}
        </form>
      </Modal>

      <ToastContainer containerId="toastUser" position="top-right" />
    </div>
  );
};

export default EditUser;