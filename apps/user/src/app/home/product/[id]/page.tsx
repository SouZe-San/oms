import ImageSection from "@oms/ui/components/customer/products/single-product/imageSection";
import ProductDetails from "@oms/ui/components/customer/products/single-product/product-details";
import { getProductDetails } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
const page = async ({ params }: { params: { id: string } }) => {
  const fullDataFetch = async () => {
    try {
      const { data } = await getProductDetails(params.id);
      return data.product;
    } catch (error) {
      axiosErrorHandler(error, "Product Details Page - Fetching Product Details");
      return null;
    }
  };

  const product = await fullDataFetch();

  return (
    <section>
      <ImageSection />
      <ProductDetails />
    </section>
  );
};

export default page;
