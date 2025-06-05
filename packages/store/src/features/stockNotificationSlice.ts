import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@oms/utils/api";

export const fetchLowStockProducts = createAsyncThunk("notifications/fetchLowStockProducts", async () => {
  const res = await api.get("/inventory/stock/low");
  return res.data.products;
});

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface StockNotificationState {
  products: Product[];
}

const initialState: StockNotificationState = {
  products: [],
};

const stockNotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLowStockProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default stockNotificationSlice.reducer;
