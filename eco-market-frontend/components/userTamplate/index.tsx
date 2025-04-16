import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";

type ProductType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};
type CashierProp = {
  children: ReactNode;
  id: string;
  title: string;
  productList: ProductType[];
};

const getUser = async (): Promise<IUser | null> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/user/profile`;
    const { data } = await get(url, TOKEN);
    if (data?.status) return data.data;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userTemplate = async ({
  children,
  id,
  title,
  productList,
}: CashierProp) => {
  const profile: IUser | null = await getUser();

  return (
    <div className="w-full min-h-dvh bg-slate-50">
      <Sidebar productList={productList} title={title} id={id} user={profile}>
        {children}
      </Sidebar>
    </div>
  );
};

export default userTemplate;
