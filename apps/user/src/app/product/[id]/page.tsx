import { FullProduct } from "@oms/types/api.type";
import ImageSection from "@oms/ui/components/customer/products/single-product/imageSection";
import ProductDetails from "@oms/ui/components/customer/products/single-product/product-details";
import { getProductDetails } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
const Page = async ({ params }: { params: { id: string } }) => {
  const fullDataFetch = async () => {
    try {
      const { id } = await params;
      const { data } = await getProductDetails(id);
      return data.product as FullProduct;
    } catch (error) {
      axiosErrorHandler(error, "Product Details Page - Fetching Product Details");
      return null;
    }
  };

  const product: FullProduct | null = await fullDataFetch();

  return (
    <section>
      {product ? (
        <>
          {" "}
          <ImageSection images={product.images} />
          <ProductDetails product={product} />
        </>
      ) : (
        <div className="text-center text-white">Product not found</div>
      )}
    </section>
  );
};

export default Page;
