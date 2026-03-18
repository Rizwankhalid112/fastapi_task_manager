"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef(function Input(
  { className, label, error, id, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7C6FFF] focus:border-transparent",
          error ? "border-red-500" : "border-white/20",
          "bg-[#252530] text-white placeholder-gray-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});
