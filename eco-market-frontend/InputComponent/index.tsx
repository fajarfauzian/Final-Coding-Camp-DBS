"use client";
import { KeyboardEvent, ReactNode } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "color" | "email" | "password" | "date";
  className?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  label?: string;
  children?: ReactNode;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  min?: string | number;
  rows?: number;
  cols?: number;
  error?: string;
};

export const InputComponent = ({
  value,
  onChange,
  type = "text",
  className = "",
  id,
  required,
  placeholder,
  onKeyUp,
  min,
}: Props) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm w-full rounded-md p-2 bg-white border border-gray-300 focus:border-red-telkom focus:outline-none transition-colors text-gray-900 placeholder-gray-400 ${className}`}
      required={required}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      min={min}
    />
  );
};

export const InputGroupComponent = ({
  value,
  onChange,
  type = "text",
  className = "",
  id,
  required,
  placeholder,
  children,
  label,
  onKeyUp,
  readOnly,
  min,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1.5 my-3">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-600 text-sm">*</span>}
        </label>
      )}
      <div className="w-full flex items-center bg-white border border-gray-300 rounded-md focus-within:border-red-telkom focus-within:ring-1 focus-within:ring-red-telkom/20 transition-all">
        {children && <div className="px-2 text-gray-500">{children}</div>}
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-sm w-full p-2 bg-transparent focus:outline-none rounded-r-md text-gray-900 placeholder-gray-400 ${className}`}
          required={required}
          placeholder={placeholder}
          readOnly={readOnly}
          onKeyUp={onKeyUp}
          min={min}
        />
      </div>
    </div>
  );
};

export const TextGroupComponent = ({
  value,
  onChange,
  className = "",
  id,
  required,
  placeholder,
  label,
  rows = 4,
  cols = 20,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1.5 my-3">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-600 text-sm">*</span>}
        </label>
      )}
      <div className="w-full bg-white border border-gray-300 rounded-md focus-within:border-red-telkom focus-within:ring-1 focus-within:ring-red-telkom/20 transition-all">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-sm w-full p-2 bg-transparent rounded-md focus:outline-none text-gray-900 placeholder-gray-400 ${className}`}
          required={required}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
        />
      </div>
    </div>
  );
};