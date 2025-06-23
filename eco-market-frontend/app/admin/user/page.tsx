import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/Alert";
import AddUser from "./addUser";
import Image from "next/image";
import Search from "./search";
import EditUser from "../user/editUser";
import DeleteUser from "./deleteUser";

const getUsers = async (search: string): Promise<IUser[]> => {
  try {
    const token = await getCookies("token");
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, token);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search?.toString() || "";
  const users: IUser[] = await getUsers(search);

  const renderRoleBadge = (role: string) => {
    const baseStyles = "text-xs font-medium px-2.5 py-0.5 rounded-full";
    const roleStyles =
      role === "ADMIN"
        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"
        : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20";

    return <span className={`${baseStyles} ${roleStyles}`}>{role}</span>;
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-4">
      <div className="border-b pb-4 mb-4">
        <h4 className="text-xl font-semibold text-gray-900">User Management</h4>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor user accounts across the platform
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <div className="w-full sm:w-auto flex-grow max-w-md">
          <Search url="/admin/user" search={search} />
        </div>
        <AddUser />
      </div>

      {users.length === 0 ? (
        <AlertInfo title="Information">No users available</AlertInfo>
      ) : (
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={`user-${index}`}
              className="flex flex-col sm:flex-row items-center bg-white border rounded-lg p-3 gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-full sm:w-1/12 text-center">
                <Image
                  width={40}
                  height={40}
                  src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`}
                  className="rounded-full mx-auto object-cover"
                  alt={`${user.name}'s profile`}
                  unoptimized
                />
              </div>

              <div className="w-full sm:w-2/12">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>

              <div className="w-full sm:w-5/12">
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="w-full sm:w-2/12">
                {renderRoleBadge(user.role)}
              </div>

              <div className="w-full sm:w-2/12 flex justify-center gap-2">
                <EditUser selectedUser={user} />
                <DeleteUser selectedUser={user} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;