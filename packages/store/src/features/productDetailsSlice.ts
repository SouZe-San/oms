import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@oms/utils/api';

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface Order {
  orderId: string;
  quantity: number;
  price: number;
  date: string;
  status: string;
  payment: string;
  address: Address | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  product: Product | null;
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  orders: [],
  loading: false,
  error: null,
};


export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string, thunkAPI) => {
    try {
      const res = await api.get(`/inventory/product/${productId}`);
      // console.log(res.data);

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Failed to load product');
    }
  }
);

// Update product
export const fetchProductUpdate = createAsyncThunk(
  'product/fetchProductUpdate',
  async (
    { id, data }: { id: string; data: Partial<Product> },
    thunkAPI
  ) => {
    try {
      const res = await api.put(`/inventory/product/${id}`, data);
      return res.data; // { product, orders }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Failed to update product');
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.product = null;
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(fetchProductUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductUpdate.fulfilled, (state, action: PayloadAction<{ product: Product; orders: Order[] }>) => {
        state.product = action.payload.product;
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(fetchProductUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductState } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
