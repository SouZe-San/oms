"use client";
import ProductContainer from "../../../components/customer/products/product-container";
import SearchSection from "../../../components/customer/search-section/SearchSection";
import { ProductsResponse } from "@oms/types/api.type";
import { getMoreProducts, getProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import CategoryBtn from "../../../components/customer/products/CategoryBtn";
import { ProductCategory } from "@oms/types/product.type";
import { useEffect, useState, useReducer } from "react";

import "remixicon/fonts/remixicon.css";

const initialState = {
  products: [],
  nonFilteredProducts: [],
};

function productReducer(
  state: { products: ProductsResponse[]; nonFilteredProducts: ProductsResponse[] },
  action: { type: string; payload?: ProductsResponse[] | ProductCategory | null }
) {
  switch (action.type) {
    case "SET_NON_FILTERED_PRODUCTS":
      return {
        ...state,
        nonFilteredProducts: (action.payload as ProductsResponse[]) || [],
        products: (action.payload as ProductsResponse[]) || [], // Initialize products with nonFilteredProducts
      };
    case "FILTER_PRODUCTS":
      return {
        ...state,
        products:
          (state.nonFilteredProducts.filter(
            (product: ProductsResponse) => product.category === action.payload
          ) as ProductsResponse[]) || [],
      };
    case "FILTER_CLEAR":
      return {
        ...state,
        products: state.nonFilteredProducts,
      };
    default:
      return state;
  }
}

const Home = () => {
  const [category, setCategory] = useState<ProductCategory | null>(null);
  // const [nonFilteredProducts, setNONFilterProduct] = useState<ProductsResponse[]>([]);
  // const [products, setProducts] = useState<ProductsResponse[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentProductPage, setCurrentProductPage] = useState<number>(0);

  const [state, dispatch] = useReducer(productReducer, initialState);
  const { products } = state;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();

      return data.products as ProductsResponse[];
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching Products");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const products: ProductsResponse[] = await fetchProducts();
      // setProducts(products);
      dispatch({ type: "SET_NON_FILTERED_PRODUCTS", payload: products });
      // setNONFilterProduct(products);
      setProductCategories(() => [...new Set(products.map((product) => product.category))]);
    })();
  }, []);

  // Get unique categories from products

  // Filter products based on selected category
  useEffect(() => {
    if (!category) return;
    dispatch({ type: "FILTER_PRODUCTS", payload: category });
  }, [category]);

  const filterClear = () => {
    setCategory(null);

    dispatch({ type: "FILTER_CLEAR" });
  };

  const moreProducts = async (skipCount: number) => {
    if (skipCount < 0) return;
    if (skipCount === currentProductPage) return;
    try {
      setLoading(true);
      const { data } = await getMoreProducts(skipCount);

      // setProducts(data.products);
      dispatch({ type: "SET_NON_FILTERED_PRODUCTS", payload: data.products });
      // setNONFilterProduct(data.products);

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
          <button className="category-btn font-neue text-xl snap-start " onClick={filterClear}>
            Clear x
          </button>
          {productCategories.length > 0 &&
            productCategories.map((categoryName, index) => (
              <CategoryBtn key={index.toString()} title={categoryName} setCategory={setCategory} category={category} />
            ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-red-100/50 text-5xl min-h-[50vh] flex items-center justify-center font-black font-gallery">
          {currentProductPage === 0 ? "No Sponsors !! No Products" : "No More Products Found !!"}
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

export default Home;
