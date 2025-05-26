import "./style.css";

import Image from "next/image";
import cartIcon from "../../../../assets/icons/customer/cart-ouline.svg";
import { Product } from "@oms/types/product.type";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="pt-4 md:px-32 px-4">
      <div className="flex justify-between items-end">
        <h1 className="text-6xl font-neue">{product.name}</h1>

        <h3 className="text-4xl font-roboto-flex font-bold ">
          <span
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              verticalAlign: "super",
            }}
          >
            {" "}
            &#x20B9;{" "}
          </span>
          {product.price}
        </h3>
      </div>
      <h4>{product.description}</h4>
      <div className="flex justify-between items-center mt-4">
        <button className="high-btn-bg cart-btn">
          Add to
          <Image src={cartIcon} alt="cart-icon" className="ml-4 inline-block" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
