"use client";
import Image from "next/image";
import mac from "../../../assets/images/temp/macbook3.png";
import bicu from "../../../assets/images/temp/bicu.jpg";

import cart from "../../../assets/icons/customer/cart-ouline.svg";
import Link from "next/link";

const imgArr = [mac, bicu];

function randomZeroOrOne() {
  return Math.floor(Math.random() * 2);
}

const ProductCard = () => {
  return (
    <div className="border px-4 pt-3 pb-6 product-card md:w-[23%] max-w-[25rem]">
      <Link href="/product/1">
        <div className="product-img rounded-lg">
          <Image
            src={imgArr[randomZeroOrOne()]!}
            alt="Product Image"
            width={250}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="product-details">
          <h2 className="product-title">Product Name</h2>
          <p className="product-description">This is a brief description of the product...</p>
          <span className="rating-stars text-yellow-200">★★★★☆</span>
          <div className="flex justify-between items-center mt-2">
            <span className="product-price text-xl">$99.99</span>
            <button className="add-to-cart-btn flex items-center cursor-pointer">
              Add
              <Image src={cart} alt="Add to Cart" width={24} height={24} className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
