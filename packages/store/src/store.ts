import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

// Import slices
import signupReducer from './features/signupSlice';
import signinReducer from './features/signinSlice';
import authReducer from './features/authSlice';
import productReducer from './features/productSlice';
import inventorySearchReducer from './features/inventorySearchSlice';

export function makeStore(): EnhancedStore {
  return configureStore({
    reducer: {
      signup: signupReducer,
      signin: signinReducer,
      auth: authReducer,
      product: productReducer,
      inventorySearch: inventorySearchReducer,
    },
  });
}

// Infer the type of store
export type AppStore = ReturnType<typeof makeStore>;
// export type of Dispatch and States
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
