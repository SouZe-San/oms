"use client";
import { useState } from "react";

import Image from "next/image";
import search from "../../../assets/icons/customer/search.svg";
import Link from "next/link";

const SearchSection = ({ searchParam }: { searchParam?: string }) => {
  const [searchQuery, setSearchQuery] = useState(searchParam || "");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="w-full my-12 flex justify-center gap-6 items-center">
      <div className="md:w-[50%]  border border-white/30 rounded-full py-2 px-4">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={handleSearchChange}
          value={searchQuery}
          className="w-full p-2 border-none placeholder:text-white/80 placeholder:font-medium placeholder:font-neue placeholder:text-center outline-none font-roboto-flex"
        />
      </div>
      <Link href={`/product/search/${searchQuery}`}>
        <button className="px-7 py-2 bg-white text-black rounded-xl flex items-center gap-2 text-xl font-semibold hover:scale-110 transition-all ease-in-out cursor-pointer ">
          <Image src={search} alt="Search" width={24} height={24} />
          Search
        </button>
      </Link>
    </section>
  );
};

export default SearchSection;
