"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { fetchProducts } from "@oms/store/product";
import { setSearchQuery } from "@oms/store/inventorySearch";
import { useRouter } from "next/navigation";
import CreateProductModal from "./CreateProductModal";

import "../../styles/sidebar.css";
import "remixicon/fonts/remixicon.css";

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

  const filteredProducts = products.filter((product: { name: string }) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-full  text-white space-y-6 p-4 min-h-screen flex flex-col">
      <div>
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div className="space-y-2 flex flex-col ">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search product..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black/50 text-white border border-white/30 px-3 py-2 rounded-lg mb-5"
          />

          {/* product list */}
          <div
            className=" overflow-y-scroll min-h-120 max-h-130 rounded-lg bg-transparent border border-white/10 backdrop-blur-sm"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : filteredProducts.length > 0 ? (
              <ul>
                {filteredProducts.map((product: { id: string; name: string }) => (
                  <li key={product.id} className="rounded-lg bg-white/13 mb-1 overflow-hidden">
                    <button
                      onClick={() => router.push(`/dashboard/product/${product.id}`)}
                      className="block w-full text-left px-3 bg-black/20 py-3 hover:bg-white/70 hover:text-black transition cursor-pointer"
                    >
                      {product.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 text-sm text-center py-2 bg-black/40 w-full min-h-120 flex items-center justify-center">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create product button */}
      <button onClick={() => setOpenCreateModal(true)} className="btn-create">
        Create Product
        <i className="ri-add-circle-fill ml-2"></i>
      </button>
      <CreateProductModal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} />
    </aside>
  );
};

export default Sidebar;
