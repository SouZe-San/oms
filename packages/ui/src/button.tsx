"use client";

import { ButtonProps } from "@oms/types/buttonType";

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button className={className} onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
