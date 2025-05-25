import "./style.css";

import Image from "next/image";
import cartIcon from "../../../../assets/icons/customer/cart-ouline.svg";

const ProductDetails = () => {
  return (
    <div className="pt-4 md:px-32 px-4">
      <div className="flex justify-between items-end">
        <h1 className="text-6xl font-neue">MacBook 16 Pro Max</h1>

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
          1,22,222
        </h3>
      </div>
      <h4>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium sapiente velit eligendi ipsum totam sit
        expedita minus. Quis repudiandae cupiditate voluptate incidunt quam, quisquam nesciunt possimus animi,
        reprehenderit, nostrum nulla?
      </h4>
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
