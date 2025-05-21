import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const inventorySearchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = inventorySearchSlice.actions;
export default inventorySearchSlice.reducer;
