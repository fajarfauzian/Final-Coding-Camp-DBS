"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

type Props = {
  url: string;
  search: string;
};

const Search = ({ url, search }: Props) => {
  const [keyword, setKeyword] = useState<string>(search);
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`${url}?search=${keyword}`);
  };

  return (
    <input
      type="text"
      id="keyword"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className={`w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out bg-white text-red-telkom-hover placeholder-gray-400`}
      placeholder="Search your food"
      onKeyUp={handleSearch}
    />
  );
};
export default Search;
