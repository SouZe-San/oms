import { ProductCategory } from "@oms/types/product.type";
import "./style.css";
const CategoryBtn = ({ title }: { title: ProductCategory }) => {
  return <button className="category-btn font-neue text-xl snap-start ">{title}</button>;
};

export default CategoryBtn;
