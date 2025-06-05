"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { makeStore, AppStore, AppPersistor } from "@oms/store/UseStore";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const store = useRef<{ store: AppStore; persistor: AppPersistor }>(undefined);

  // Create the store instance the first time this renders
  if (!store.current) {
    store.current = makeStore();
  }

  return (
    <Provider store={store.current.store}>
      <PersistGate loading={null} persistor={store.current.persistor}>
        {children}
      </PersistGate>
      <Toaster richColors position="top-center" />
    </Provider>
  );
};

export default Providers;
