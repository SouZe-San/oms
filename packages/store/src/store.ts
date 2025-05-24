import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

// Import slices
import signupReducer from './features/signupSlice';
import signinReducer from './features/signinSlice';
import authReducer from './features/authSlice';
import productReducer from './features/productSlice';
import productDetailsReducer from './features/productDetailsSlice';
import inventorySearchReducer from './features/inventorySearchSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//@alfaarghya
// Apply persistence only to auth slice (
const persistedAuthReducer = persistReducer(
  { key: 'auth', storage },
  authReducer
);

// Combine all reducers
const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  auth: persistedAuthReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  inventorySearch: inventorySearchReducer,
});

export function makeStore(): { store: EnhancedStore; persistor: ReturnType<typeof persistStore> } {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  const persistor = persistStore(store);

  return { store, persistor };
}

// Infer the type of store
export type AppStore = ReturnType<typeof makeStore>['store'];
export type AppPersistor = ReturnType<typeof makeStore>['persistor'];
// export type of Dispatch and States
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
