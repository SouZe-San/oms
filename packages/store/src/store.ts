import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

// Import slices
import counterReducer from './features/counterSlice';
import signupReducer from './features/signupSlice';
import signinReducer from './features/signinSlice';
import authReducer from './features/authSlice';

export function makeStore(): EnhancedStore {
  return configureStore({
    reducer: {
      counter: counterReducer,
      signup: signupReducer,
      signin: signinReducer,
      auth: authReducer,
    },
  });
}

// Infer the type of store
export type AppStore = ReturnType<typeof makeStore>;
// export type of Dispatch and States
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
