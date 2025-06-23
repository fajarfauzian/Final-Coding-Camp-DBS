"use client";
import { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string; // Made optional to align with common usage
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
  label?: string;
  placeholder?: string; // Optional placeholder option
  error?: string; // Optional error message
};

const Select: React.FC<Props> = ({
  value,
  onChange,
  className = "",
  id,
  required = false,
  disabled = false,
  children,
  label,
  placeholder,
  error,
}) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-2 text-sm text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            error ? "border-red-500" : "border-gray-300 hover:border-gray-400"
          } ${disabled ? "cursor-not-allowed bg-gray-100 opacity-50" : "cursor-pointer"}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <FaChevronDown
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${
            disabled ? "opacity-50" : ""
          }`}
          size={16}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;