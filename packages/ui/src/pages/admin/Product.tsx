"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { fetchProductDetails, fetchProductUpdate } from "@oms/store/productDetails";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import EditableInputField from "../../components/admin/EditableInputField";
import OrderList from "../../components/admin/OrderList";
import UpdateProductModal from "../../components/admin/UpdateProductModal";

import logo from "../../assets/icons/logo/oms.svg";
import "../../styles/product-details.css";

const ProductPage = () => {
  //take product id from params
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { product, orders, loading, error } = useAppSelector((state) => state.productDetails);

  //edit product setup
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //fetch product details by id
  useEffect(() => {
    if (id) {
      (dispatch as any)(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  //show error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  //set product name for edit
  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        category: product.category,
      });
    }
  }, [product]);

  // Track if any field changed compared to original product
  useEffect(() => {
    if (!product) return;

    const changed =
      product.name !== editedProduct.name ||
      (product.description || "") !== (editedProduct.description || "") ||
      product.price !== editedProduct.price ||
      product.stock !== editedProduct.stock;

    setHasChanges(changed);
  }, [editedProduct, product]);

  //handel update details submission
  const handleUpdateConfirm = async () => {
    try {
      // Assuming you have a thunk or API helper to update product
      await (dispatch as any)(fetchProductUpdate({ id: product.id, data: editedProduct })).unwrap();

      toast.success("Product updated successfully!");
      setShowConfirmModal(false);

      await (dispatch as any)(fetchProductDetails(id));
    } catch (err: any) {
      toast.error(err.message || "Failed to update product.");
    }
  };

  //when it's loading show this
  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-full text-black">
        <p>it&apos;s the product</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <button
        className={`update-btn ${hasChanges ? "update-active-btn" : " update-inactive-btn"}`}
        disabled={!hasChanges}
        onClick={() => setShowConfirmModal(true)}
      >
        Update
      </button>

      <div className="flex flex-col gap-10 border border-dashed border-white/30 rounded-xl px-2 py-4">
        <div className="flex justify-between w-full px-1">
          <div className="flex flex-col gap-2 w-2/4">
            {/* Name */}
            <EditableInputField
              value={editedProduct.name}
              onChange={(val) => setEditedProduct((prev) => ({ ...prev, name: val as string }))}
              inputClassName="border p-1 rounded w-full"
              displayClassName="text-5xl font-bold cursor-pointer font-neue"
              displayAs="h1"
            />

            {/* Description */}
            <EditableInputField
              value={editedProduct.description}
              onChange={(val) => setEditedProduct((prev) => ({ ...prev, description: val as string }))}
              type="textarea"
              onEnterBlur={true}
              inputClassName="border p-1 rounded w-full"
              displayClassName="text-muted-foreground cursor-pointer break-words"
              displayAs="p"
              renderDisplay={(val) => val || "No description"}
            />

            <div className="flex flex-col justify-around items-start gap-4 mt-4 ">
              {/* Price */}
              <div className="flex items-center">
                <h3 className="sm:text-xl mr-2">Price : </h3>
                <EditableInputField
                  value={editedProduct.price}
                  type="number"
                  onChange={(val) => setEditedProduct((prev) => ({ ...prev, price: val as number }))}
                  inputClassName="border p-1 rounded w-30 text-center"
                  displayClassName="font-semibold sm:text-xl text-white/70 cursor-pointer font-roboto-flex"
                  renderDisplay={(val) => `₹ ${(val as number).toFixed(2)}`}
                />
              </div>

              {/* Stock */}
              <div className="flex items-center">
                <h3 className="sm:text-xl mr-2">Stock : </h3>
                <EditableInputField
                  value={editedProduct.stock}
                  type="number"
                  onChange={(val) => setEditedProduct((prev) => ({ ...prev, stock: val as number }))}
                  inputClassName="border p-1 rounded w-18 text-center"
                  displayClassName="font-semibold sm:text-xl text-white/70 cursor-pointer font-roboto-flex"
                />
              </div>

              {/* Category */}
              <div className="flex items-center">
                <h3 className="sm:text-xl mr-2">Category : </h3>
                <p className="font-semibold sm:text-lg text-white/70 cursor-pointer ">{editedProduct.category}</p>
              </div>
            </div>
          </div>

          <div
            className="w-1/3 flex justify-center "
            style={{
              aspectRatio: "4/3",
            }}
          >
            {product.images.length == 0 ? (
              <Image
                src={logo}
                alt="what"
                width={100}
                height={100}
                className="border border-gray-300 p-2 border-dashed bg-black object-contain"
              />
            ) : (
              <Image
                src={product.images[0]}
                alt="what"
                width={100}
                height={100}
                className="border border-gray-300 p-2 border-dashed object-contain w-full h-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* Sales & Profit Chart */}
      <div className="w-full h-96 my-4 border border-dashed border-white/30 rounded-xl py-2 pb-10">
        <h2 className="text-xl mx-2 font-bold mb-4">Sales & Profit</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={orders.map((order: { date: string | number | Date; quantity: number; price: number }) => ({
              date: new Date(order.date).toLocaleDateString(),
              sales: order.quantity,
              profit: order.quantity * (order.price - (product.cost || 0)),
            }))}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Table */}
      <OrderList orders={orders} />

      {/* confirm update details  */}
      <>
        {showConfirmModal && (
          <UpdateProductModal handleUpdateConfirm={handleUpdateConfirm} setShowConfirmModal={setShowConfirmModal} />
        )}
      </>
    </div>
  );
};

export default ProductPage;
