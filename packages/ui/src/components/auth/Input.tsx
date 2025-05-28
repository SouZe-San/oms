import React from "react";
import { FieldError } from "react-hook-form";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({ error, className = "", ...props }) => {
  return (
    <div className="mb-4">
      {/* <label className="block text-sm font-medium text-white/700 mb-1">{label}</label> */}
      <input
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
          error ? "border-red-500 bg-black/20" : "border-gray-300 hover:border-gray-400"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600 animate-fade-in">{error.message}</p>}
    </div>
  );
};

export default Input;
