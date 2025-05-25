import ImageSection from "@oms/ui/components/customer/products/single-product/imageSection";
import ProductDetails from "@oms/ui/components/customer/products/single-product/product-details";

const page = ({ params }: { params: { id: string } }) => {
  console.log("Product ID:", params.id);
  return (
    <section>
      <ImageSection />
      <ProductDetails />
    </section>
  );
};

export default page;
