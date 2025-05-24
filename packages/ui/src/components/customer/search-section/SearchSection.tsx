import Image from "next/image";
import search from "../../../assets/icons/customer/search.svg";

const SearchSection = () => {
  return (
    <section className="w-full my-8 flex justify-center gap-6 items-center">
      <div className="md:w-[50%]  border border-white/30 rounded-full py-2 px-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 border-none placeholder:text-white/80 placeholder:font-medium placeholder:font-roboto-flex"
        />
      </div>
      <button className="px-7 py-2 bg-white text-black rounded-xl flex items-center gap-2 text-xl font-semibold ">
        <Image src={search} alt="Search" width={24} height={24} />
        Search
      </button>
    </section>
  );
};

export default SearchSection;
