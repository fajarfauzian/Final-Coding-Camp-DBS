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
    const baseStyles = "text-xs font-medium px-3 py-1 rounded-full";
    const roleStyles =
      role === "ADMIN"
        ? "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white"
        : "bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white";

    return <span className={`${baseStyles} ${roleStyles}`}>{role}</span>;
  };

  return (
      <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">User Data</h4>
        <p className="text-sm text-gray-600 mb-6">
          This page displays user data, allowing admins to view details, search, and manage users by adding, editing, or deleting them.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="w-full sm:w-auto flex-grow max-w-md">
            <Search url="/admin/user" search={search} />
          </div>
          {/* Add User Button */}
          <AddUser />
        </div>

        {users.length === 0 ? (
          <AlertInfo title="Information">No users available</AlertInfo>
        ) : (
          <div className="grid gap-4">
            {users.map((user, index) => (
              <div
                key={`user-${index}`}
                className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg shadow-sm p-4 gap-4"
              >
                {/* Profile Picture */}
                <div className="w-full sm:w-1/12 text-center">
                  <span className="text-sm font-semibold text-gray-700">Picture</span>
                  <Image
                    width={50}
                    height={50}
                    src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`}
                    className="rounded-full mx-auto mt-2"
                    alt={`${user.name}'s profile picture`}
                    unoptimized
                  />
                </div>

                {/* Name */}
                <div className="w-full sm:w-2/12">
                  <span className="text-sm font-semibold text-gray-700">Name</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">{user.name}</p>
                </div>

                {/* Email */}
                <div className="w-full sm:w-5/12">
                  <span className="text-sm font-semibold text-gray-700">Email</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">{user.email}</p>
                </div>

                {/* Role */}
                <div className="w-full sm:w-2/12">
                  <span className="text-sm font-semibold text-gray-700">Role</span>
                  <div className="mt-1">{renderRoleBadge(user.role)}</div>
                </div>

                {/* Actions */}
                <div className="w-full sm:w-2/12 text-center">
                  <span className="text-sm font-semibold text-gray-700">Actions</span>
                  <div className="flex justify-center gap-2 mt-2">
                    <EditUser selectedUser={user} />
                    <DeleteUser selectedUser={user} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default UserPage;