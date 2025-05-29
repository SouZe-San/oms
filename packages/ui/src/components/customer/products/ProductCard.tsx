"use client";
import Image from "next/image";
import logo from "../../../assets/icons/logo/oms.svg";

import cart from "../../../assets/icons/customer/cart-ouline.svg";
import Link from "next/link";
import { ProductsResponse } from "@oms/types/api.type";

const ProductCard = ({ product }: { product: ProductsResponse }) => {
  return (
    <div className="border px-4 pt-3 pb-6 product-card md:w-[23%] max-w-[25rem] 3xl:mr-0">
      <Link href={`/product/${product.id}`} className="flex flex-col justify-between h-full">
        <div className="product-img rounded-lg">
          <Image
            src={product.imageUrl || logo}
            alt="Product Image"
            width={250}
            height={150}
            className="object-cover rounded-lg"
            loading="lazy"
            blurDataURL={product.imageUrl || logo}
          />
        </div>
        <div className="product-details">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <span className="rating-stars text-yellow-200">★★★★☆ 4.0</span>
          <div className="flex justify-between items-center mt-2">
            <span className="product-price text-xl">&#x20B9; {product.price}</span>
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
