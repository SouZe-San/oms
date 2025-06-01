"use client";
import "./style.css";

import Image from "next/image";
import cartIcon from "../../../../assets/icons/customer/cart-ouline.svg";

import { useState } from "react";
import CartModal from "../CartModal";
import { FullProduct } from "@oms/types/api.type";

const ProductDetails = ({ product }: { product: FullProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const addToCartHandler = async () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="pt-4 md:px-32 px-4">
      <div className="flex justify-between md:items-end max-md:flex-col-reverse">
        <h1 className="md:text-6xl text-4xl font-neue">{product.name}</h1>

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
        <button className="high-btn-bg cart-btn" onClick={addToCartHandler}>
          Add to
          <Image src={cartIcon} alt="cart-icon" className="ml-4 inline-block" />
        </button>
      </div>
      {isModalOpen && (
        <CartModal
          onClose={toggleModal}
          product={{
            id: product.id!,
            name: product.name,
            stock: product.stock || 0, // Ensure stock is defined
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails;
