'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@oms/utils/api';
import { toast } from 'sonner';
import { CreateProductInput, createProductValidator } from '@oms/types/product.validator';

import "../../styles/create-product-modal.css"
import 'remixicon/fonts/remixicon.css'

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductValidator) as any,
    defaultValues: {
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray<CreateProductInput, 'images', 'id'>({
    control,
    name: 'images',
  });

  if (!isOpen) return null;

  const onSubmit = async (data: CreateProductInput) => {
    try {
      const res = await api.post('/inventory/product', data);
      toast.success(res.data.message || 'Product created successfully');
      onClose();
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Create New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              placeholder="Product Name"
              {...register('name')}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <textarea
              placeholder="Description"
              {...register('description')}
              className="w-full border p-2 rounded resize-none"
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <input
              placeholder="Price"
              {...register('price', { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              {...register('stock', { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.stock && <p className="text-red-600 text-sm">{errors.stock.message}</p>}
          </div>

          {/* Image Fields */}
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input
                placeholder={index === 0 ? 'Main Image URL' : `Image URL ${index + 1}`}
                {...register(`images.${index}.url`)}
                className="w-full border p-2 rounded"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="ri-close-circle-fill"></i>
                </button>
              )}
              {errors.images?.[index] && (
                <p className="text-red-600 text-sm">{errors.images[index]?.message}</p>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ url: '' })}
            className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
          >
            <i className="ri-add-circle-fill"></i> Add another image
          </button>

          <p className="text-xs text-gray-500 mt-1">First image is used as the main product image.</p>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer cancel-btn"
            // className=""
            >
              Cancel
              <i className="ri-close-circle-line"></i>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className='create-btn'
            >
              {isSubmitting ? 'Creating...' : 'Create'}
              <i className="ri-add-circle-line"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
