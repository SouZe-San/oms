import { ProductsResponse } from "@oms/types/api.type";
import ProductContainer from "@oms/ui/components/customer/products/product-container";
import SearchSection from "@oms/ui/components/customer/search-section/SearchSection";
import { searchProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import React from "react";

const Page = async ({ params }: { params: { name: string } }) => {
  const { name } = await params;

  const fetchProducts = async () => {
    console.log("Fetching Products...");
    try {
      const { data } = await searchProducts(name);
      console.log("Search by name Products:", data.products);
      return data.products as ProductsResponse[];
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching Products");
      return [];
    }
  };

  const products: ProductsResponse[] = await fetchProducts();
  return (
    <section>
      <SearchSection searchParam={name} />

      {products.length === 0 ? (
        <p className="text-red-100 text-5xl font-black text-center">No Products Found for &quot;{name}&quot;</p>
      ) : (
        <ProductContainer products={products} />
      )}
    </section>
  );
};

export default Page;
