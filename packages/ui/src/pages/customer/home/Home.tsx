import ProductContainer from "../../../components/customer/products/product-container";
import SearchSection from "../../../components/customer/search-section/SearchSection";
import { ProductsResponse } from "@oms/types/api.type";
import { getProducts } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
const Home = async () => {
  const fetchProducts = async () => {
    console.log("Fetching Products...");
    try {
      const { data } = await getProducts();
      console.log("Fetched Products:", data.products);
      return data.products as ProductsResponse[];
    } catch (error) {
      axiosErrorHandler(error, "Home Page - Fetching Products");
      return [];
    }
  };

  const products: ProductsResponse[] = await fetchProducts();

  return (
    <section>
      <SearchSection />
      <ProductContainer products={products} />
    </section>
  );
};

export default Home;
