'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { fetchProductDetails, fetchProductUpdate } from '@oms/store/productDetails';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import EditableInputField from '../../components/admin/EditableInputField';
import OrderList from '../../components/admin/OrderList';
import UpdateProductModal from '../../components/admin/UpdateProductModal';

const ProductPage = () => {
  //take product id from params
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { product, orders, loading, error } = useAppSelector((state) => state.productDetails);

  //edit product setup
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
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
        description: product.description || '',
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  // Track if any field changed compared to original product
  useEffect(() => {
    if (!product) return;

    const changed =
      product.name !== editedProduct.name ||
      (product.description || '') !== (editedProduct.description || '') ||
      product.price !== editedProduct.price ||
      product.stock !== editedProduct.stock;

    setHasChanges(changed);
  }, [editedProduct, product]);

  //handel update details submission
  const handleUpdateConfirm = async () => {
    try {
      // Assuming you have a thunk or API helper to update product
      await (dispatch as any)(fetchProductUpdate({ id: product.id, data: editedProduct })).unwrap();

      toast.success('Product updated successfully!');
      setShowConfirmModal(false);

      await (dispatch as any)(fetchProductDetails(id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to update product.');
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
    <div className="p-6 space-y-6 text-black">
      <button className={`border px-4 py-2 rounded font-semibold transition-colors ${hasChanges ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-400 bg-gray-200 text-gray-600 cursor-not-allowed'
        }`}
        disabled={!hasChanges}
        onClick={() => setShowConfirmModal(true)}>
        Update
      </button>

      {/* Name */}
      <EditableInputField
        value={editedProduct.name}
        onChange={(val) =>
          setEditedProduct((prev) => ({ ...prev, name: val as string }))
        }
        inputClassName="border p-1 rounded w-full"
        displayClassName="text-3xl font-bold cursor-pointer"
        displayAs="h1"
      />

      {/* Description */}
      <EditableInputField
        value={editedProduct.description}
        onChange={(val) =>
          setEditedProduct((prev) => ({ ...prev, description: val as string }))
        }
        type="textarea"
        onEnterBlur={true}
        inputClassName="border p-1 rounded w-full"
        displayClassName="text-muted-foreground cursor-pointer"
        displayAs="p"
        renderDisplay={(val) => val || 'No description'}
      />

      {/* Price */}
      <EditableInputField
        value={editedProduct.price}
        type="number"
        onChange={(val) =>
          setEditedProduct((prev) => ({ ...prev, price: val as number }))
        }
        inputClassName="border p-1 rounded w-full"
        displayClassName="font-semibold cursor-pointer"
        renderDisplay={(val) => `₹${(val as number).toFixed(2)}`}
      />

      {/* Stock */}
      <EditableInputField
        value={editedProduct.stock}
        type="number"
        onChange={(val) =>
          setEditedProduct((prev) => ({ ...prev, stock: val as number }))
        }
        inputClassName="border p-1 rounded w-full"
        displayClassName="font-semibold cursor-pointer"
      />

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

export default ProductPage
