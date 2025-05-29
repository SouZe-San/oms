import { ProductCategory } from "@oms/types/product.type";
import "./style.css";
import { Dispatch, SetStateAction } from "react";
const CategoryBtn = ({
  title,
  setCategory,
  category,
}: {
  title: ProductCategory;
  setCategory: Dispatch<SetStateAction<ProductCategory | null>>;
  category?: ProductCategory | null;
}) => {
  console.log("CategoryBtn rendered with title:", title, "and category:", category);
  return (
    <button
      className={`category-btn font-neue text-sm snap-start ${category === title ? "active" : ""}`}
      onClick={() => setCategory(title)}
    >
      {title}
    </button>
  );
};

export default CategoryBtn;
