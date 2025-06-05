import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@oms/utils/api";

//fetch all products
export const fetchProducts = createAsyncThunk("product/fetchAll", async () => {
  const res = await api.get("/inventory/product");
  return res.data.products;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [] as { id: string; name: string }[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
