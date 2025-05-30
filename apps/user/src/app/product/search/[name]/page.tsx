"use client";

import { ProductsResponse } from "@oms/types/api.type";
import ProductContainer from "@oms/ui/components/customer/products/product-container";
import SearchSection from "@oms/ui/components/customer/search-section/SearchSection";
import { moreOfSearchedProducts, searchProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { name } = useParams() as { name: string };

  const [products, setProducts] = useState<ProductsResponse[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentProductPage, setCurrentProductPage] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching Products...");
      try {
        setLoading(true);
        const { data } = await searchProducts(name);
        console.log("Search by name Products:", data.products);
        return data.products as ProductsResponse[];
      } catch (error) {
        axiosErrorHandler(error, "Home Page - Fetching Products");
        return [];
      } finally {
        setLoading(false);
      }
    };
    (async () => {
      const products: ProductsResponse[] = await fetchProducts();
      setProducts(products);
    })();
  }, [name]);

  const moreProducts = async (skipCount: number) => {
    if (skipCount < 0) return;
    if (skipCount === currentProductPage) return;
    try {
      setLoading(true);
      const { data } = await moreOfSearchedProducts(name, skipCount);
      setProducts(data.products);
      setCurrentProductPage(skipCount);
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching More Products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] font-semibold text-2xl blinking-text font-gallery">
        Products Loading...
      </div>
    );
  }

  return (
    <section>
      <SearchSection searchParam={name} />

      {products.length === 0 ? (
        <p className="text-red-100/50 text-5xl font-black text-center font-gallery  min-h-[50vh] flex items-center justify-center">
          {currentProductPage === 0 ? (
            <span>No Products Found for &quot;{name}&quot;</span>
          ) : (
            "No More Products Found !!"
          )}
        </p>
      ) : (
        <ProductContainer products={products} />
      )}

      <div className="flex justify-center items-center my-8 page-container gap-4">
        <button
          className="navigate-btn font-gallery disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => moreProducts(currentProductPage - 1)}
          disabled={currentProductPage === 0}
        >
          <i className="ri-arrow-left-s-fill"></i> Back
        </button>
        <button
          className="navigate-btn font-gallery disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => moreProducts(currentProductPage + 1)}
          disabled={products.length < 19}
        >
          Next <i className="ri-arrow-right-s-fill"></i>
        </button>
      </div>
    </section>
  );
};

export default Page;
