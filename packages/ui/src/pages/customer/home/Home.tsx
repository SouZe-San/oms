import ProductContainer from "../../../components/customer/products/product-container";
import SearchSection from "../../../components/customer/search-section/SearchSection";
import { ProductsResponse } from "@oms/types/api.type";
import { getProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import CategoryBtn from "../../../components/customer/products/CategoryBtn";
const Home = async () => {
  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();

      return data.products as ProductsResponse[];
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching Products");
      return [];
    }
  };

  const products: ProductsResponse[] = await fetchProducts();

  const productCategories = [...new Set(products.map((product) => product.category))];

  return (
    <section>
      <SearchSection />

      <div className="flex overflow-hidden justify-center items-center mt-4 mb-4 md:px-16">
        <div
          className="flex overflow-x-auto gap-2 justify-start items-center w-full scroll-auto snap-x category-btn-section"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {productCategories.length > 0 &&
            productCategories.map((category, index) => <CategoryBtn key={index.toString()} title={category} />)}
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
          <CategoryBtn title={"APPLIANCES"} />
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
