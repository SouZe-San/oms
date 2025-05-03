"use client";

import { ReactNode, useRef } from "react";
import { useAppDispatch } from "@oms/store/hooks";
import { increment } from "@oms/store/counter";

export const CountButton = ({ children, className }: { children: ReactNode; className?: string }) => {
  // const store = useAppStore();
  const initialized = useRef(false);

  if (!initialized.current) {
    // store.dispatch(initializeState(0));
    console.log("initializeState(0)");

    initialized.current = true;
  }

  const dispatch = useAppDispatch();

  return (
    <button className="border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black font-medium hover:bg-green-100 focus:outline-none  transition cursor-pointer" onClick={() => dispatch(increment())}>
      {children}
    </button>
  );
};
