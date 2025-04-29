"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonPrimary,
  ButtonSuccess,
  ButtonDanger,
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

const AddUser = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    id: 0,
    uuid: "",
    name: "",
    email: "",
    password: "",
    role: "", // Initialize as empty, but we'll validate before submission
    profile_picture: "",
    createdAt: "",
    updatedAt: "",
  });
  const router = useRouter();
  const TOKEN = getCookies("token") || "";
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setUser({
      id: 0,
      uuid: "",
      name: "",
      email: "",
      password: "",
      role: "",
      profile_picture: "",
      createdAt: "",
      updatedAt: "",
    });
    setFile(null);
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const validateForm = () => {
    if (!user.name) return "Name is required";
    if (!user.email) return "Email is required";
    if (!user.password) return "Password is required";
    if (!["ADMIN", "USER"].includes(user.role)) return "Please select a valid role (Admin or User)";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form before submission
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
      const url = `${BASE_API_URL}/user/create`;
      const { name, email, password, role } = user;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("email", email || "");
      payload.append("password", password || "");
      payload.append("role", role || "");
      if (file) payload.append("picture", file);

      const { data } = (await post(url, payload, TOKEN)) as response;
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: "toastUser",
          type: "success",
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message || "Failed to create user", {
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
      <ButtonSuccess type="button" onClick={openModal}>
        <div className="flex items-center gap-2">
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
          Add User
        </div>
      </ButtonSuccess>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-3 rounded-t-2xl shadow">
            <div className="w-full flex items-center">
              <div>
                <h3 className="font-semibold text-lg text-white">New User</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputGroupComponent
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(val) => setUser({ ...user, name: val })}
                  required={true}
                  label="Full Name"
                  placeholder="Enter name"
                />
              </div>

              <div className="md:col-span-2">
                <InputGroupComponent
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(val) => setUser({ ...user, email: val })}
                  required={true}
                  label="Email"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <InputGroupComponent
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(val) => setUser({ ...user, password: val })}
                  required={true}
                  label="Password"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <Select
                  id="role"
                  value={user.role}
                  label="Role"
                  required={true}
                  onChange={(val) => setUser({ ...user, role: val })}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <FileInput
                  acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
                  id="profile_picture"
                  label="Profile Picture"
                  onChange={(f) => setFile(f)}
                  required={false}
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
              className="px-4 py-1.5"
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary type="submit" className="px-4 py-1.5">
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

export default AddUser;