"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@oms/store/UseStore";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useRef<AppStore>(undefined);

  // Create the store instance the first time this renders
  if (!store.current) {
    store.current = makeStore();
  }

  return <Provider store={store.current}>{children}</Provider>;
};

export default StoreProvider;
