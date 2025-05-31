import ProductCard from "./ProductCard";
import { ProductsResponse } from "@oms/types/api.type";
import "./style.css";
const ProductContainer = ({ products }: { products: ProductsResponse[] }) => {
  return (
    <div className="mb-6 pt-12 md:px-16 px-4">
      <div className="flex gap-4  md:justify-start justify-center flex-wrap items-center">
        {products.length > 0 ? (
          products.map((product: ProductsResponse, index: number) => (
            <ProductCard key={index.toString()} product={product} />
          ))
        ) : (
          <h1>No Sponsors !!!</h1>
        )}
      </div>
    </div>
  );
};

export default ProductContainer;
