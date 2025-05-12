"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { makeStore, AppStore } from "@oms/store/UseStore";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const store = useRef<AppStore>(undefined);

  // Create the store instance the first time this renders
  if (!store.current) {
    store.current = makeStore();
  }

  return <Provider store={store.current}>
    {children}
    <Toaster richColors position="top-center" />
  </Provider>;
};

export default Providers;
