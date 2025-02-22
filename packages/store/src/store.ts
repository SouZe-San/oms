import { configureStore } from "@reduxjs/toolkit";

// Import the slices
import counterReducer from "./features/counterSlice";

// Function "makeStore" to create a store
export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
}

// Infer the type of store
export type AppStore = ReturnType<typeof makeStore>;
// export type of Dispatch and States
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
