"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger, ButtonInfo } from "@/components/Button";
import { InputGroupComponent } from "@/InputComponent";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import FileInput from "@/components/FileInput";

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ ...selectedUser });
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const router = useRouter();
  const TOKEN = getCookies("token") || "";
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setUser({ ...selectedUser });
    setUser({...user, password: ""})
    setIsShow(true);
    setShowPasswordInput(false);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/${selectedUser.id}`;
      const { name, email, password, role } = user;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("email", email || "");
      if (showPasswordInput && password) {
        payload.append("password", password);
      }
      payload.append("role", role || "");
      if (file !== null) payload.append("picture", file || "");
      const { data } = await put(url, payload, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something Wrong`, {
        hideProgressBar: true,
        containerId: `toastUser`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastUser`} />
      <ButtonInfo type="button" onClick={() => openModal()}>
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
        <form onSubmit={handleSubmit} ref={formRef}>
          {/* modal header */}
          <div className="sticky top-0 bg-red-telkom-hover px-5 pt-5 pb-3 shadow">
            <div className="w-full flex items-center">
              <div className="flex flex-col">
                <strong className="font-bold text-2xl text-white">
                  Update User
                </strong>
                <small className="text-white text-sm">
                  Managers can update both Cashier and Manager roles on this
                  page.
                </small>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="text-white"
                  onClick={() => setIsShow(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
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
          {/* end modal header */}

          {/* modal body */}
          <div className="p-8">
            <InputGroupComponent
              id={`name`}
              type="text"
              value={user.name}
              onChange={(val) => setUser({ ...user, name: val })}
              required={true}
              label="Nama User"
            />

            <InputGroupComponent
              id={`email`}
              type="email"
              value={user.email}
              onChange={(val) => setUser({ ...user, email: val })}
              required={true}
              label="Email User"
            />

            <Select
              id={`role`}
              value={user.role}
              label="Role User"
              required={true}
              onChange={(val) => setUser({ ...user, role: val })}
            >
              <option value="">--- Select Role ---</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </Select>

            <FileInput
              acceptTypes={[
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
              ]}
              id="profile_picture"
              label="Unggah Foto (Max 2MB, PDF/JPG/JPEG/PNG)"
              onChange={(f) => setFile(f)}
              required={false}
            />

            {showPasswordInput && (
              <InputGroupComponent
                id={`password`}
                type="password"
                value={user.password}
                onChange={(val) => setUser({ ...user, password: val })}
                required={true}
                label="Password Default"
              />
            )}

            {!showPasswordInput && (
              <button
                type="button"
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPasswordInput(true)}
              >
                Ubah Password Default
              </button>
            )}
          </div>
          {/* end modal body */}

          {/* modal footer */}
          <div className="w-full p-5 flex rounded-b-2xl shadow">
            <div className="flex ml-auto gap-2">
              <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                Cancel
              </ButtonDanger>
              <ButtonPrimary type="submit">Save</ButtonPrimary>
            </div>
          </div>
          {/* end modal footer */}
        </form>
      </Modal>
    </div>
  );
};

export default EditUser;
