"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { fetchProducts } from "@oms/store/product";
import { setSearchQuery } from "@oms/store/inventorySearch";
import { useRouter } from "next/navigation";
import CreateProductModal from "./CreateProductModal";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { products, loading } = useAppSelector((state) => state.product);
  const { query } = useAppSelector((state) => state.inventorySearch);


  const [input, setInput] = useState(query);
  const debouncedInput = useDebounce(input, 300);

  //load all product
  useEffect(() => {
    (dispatch as any)(fetchProducts());
  }, [dispatch]);

  //search 
  useEffect(() => {
    dispatch(setSearchQuery(debouncedInput));
  }, [debouncedInput, dispatch]);

  const filteredProducts = products.filter((product: { name: string; }) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-72 bg-gray-900 text-white space-y-6 p-4 max-h-screen flex flex-col justify-around">

      <div className="">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div className="space-y-2 flex flex-col ">

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search product..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded-lg mb-5"
          />

          {/* product list */}
          <div className=" overflow-y-scroll min-h-150 rounded-lg bg-gray-800">
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : filteredProducts.length > 0 ? (
              <ul>
                {filteredProducts.map((product: { id: string, name: string }) => (
                  <li key={product.id}>
                    <button
                      onClick={() => router.push(`/dashboard/product/${product.id}`)}
                      className="block w-full text-left px-3 py-3 hover:bg-gray-700 transition border-b border-gray-700 cursor-pointer"
                    >
                      {product.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm text-center py-2">No products found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Create product button */}
      <button
        onClick={() => setOpenCreateModal(true)}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer"
      >
        Create Product
      </button>
      <CreateProductModal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} />

    </aside>
  );
};

export default Sidebar;
