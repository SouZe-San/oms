import ProductCard from "./ProductCard";
import "./style.css";
const ProductContainer = () => {
  return (
    <div className="mb-6 pt-12 md:px-16">
      <div className="flex gap-5 justify-evenly flex-wrap items-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductContainer;
