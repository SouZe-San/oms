"use client";
import ProductContainer from "../../../components/customer/products/product-container";
import SearchSection from "../../../components/customer/search-section/SearchSection";
import { ProductsResponse } from "@oms/types/api.type";
import { getProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import CategoryBtn from "../../../components/customer/products/CategoryBtn";
import { ProductCategory } from "@oms/types/product.type";
import { useEffect, useState } from "react";

const Home = () => {
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [nonFilteredProducts, setNONFilterProduct] = useState<ProductsResponse[]>([]);
  const [products, setProducts] = useState<ProductsResponse[]>([]);
  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();

      return data.products as ProductsResponse[];
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching Products");
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const products: ProductsResponse[] = await fetchProducts();
      setProducts(products);
      setNONFilterProduct(products);
    })();
  }, []);
  const productCategories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    if (!category) {
      setProducts(nonFilteredProducts);
      return;
    }
    const filteredProducts = products.filter((product) => product.category === category);
    setProducts(filteredProducts);
  }, [category, products, nonFilteredProducts]);

  return (
    <section>
      <SearchSection />

      <div className="flex overflow-hidden justify-start items-center mt-4 mb-4 md:px-16">
        <div
          className="flex overflow-x-auto gap-2 justify-start items-center scroll-auto snap-x category-btn-section"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <button className="category-btn font-neue text-xl snap-start " onClick={() => setCategory(null)}>
            Clear x
          </button>
          {productCategories.length > 0 &&
            productCategories.map((categoryName, index) => (
              <CategoryBtn key={index.toString()} title={categoryName} setCategory={setCategory} category={category} />
            ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-red-100/50 text-5xl font-black text-center">No Sponsors !! No Products</p>
      ) : (
        <ProductContainer products={products} />
      )}
    </section>
  );
};

export default Home;
