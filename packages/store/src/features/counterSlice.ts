import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";

// Types Define for slice
export interface CounterState {
  value: number;
}

// Initial State
const initialState: CounterState = {
  value: 0,
};

// Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeState: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, initializeState } = counterSlice.actions;

// if want ot use State call this func
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
