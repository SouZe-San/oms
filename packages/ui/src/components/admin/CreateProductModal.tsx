'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@oms/utils/api';
import { toast } from 'sonner';
import { CreateProductInput, createProductValidator } from '@oms/types/product.validator';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProductModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductValidator),
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
