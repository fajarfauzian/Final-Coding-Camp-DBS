"use client";
import { useState, useRef, useCallback } from "react";
import { AlertWarning } from "../Alert";
import { FaFileUpload, FaTimes } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  acceptTypes: string[]; // e.g., ["image/png", "image/jpeg"]
  onChange: (file: File | null) => void;
  className?: string;
  required?: boolean;
  id?: string;
  label?: string;
  maxSize?: number; // in KB
};

const FileInput: React.FC<Props> = ({
  disabled = false,
  acceptTypes,
  onChange,
  className = "",
  required = false,
  id,
  label,
  maxSize = 2048, // Default 2MB
}) => {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setMessage("");

      if (!acceptTypes.includes(file.type)) {
        setMessage(
          `Invalid file type: '${file.type}'. Allowed types: ${acceptTypes.join(", ")}.`
        );
        return false;
      }

      if (file.size > maxSize * 1024) {
        setMessage(`File size exceeds ${maxSize}KB limit.`);
        return false;
      }

      return true;
    },
    [acceptTypes, maxSize]
  );

  const handleFile = useCallback(
    (file: File | null) => {
      if (file && validateFile(file)) {
        onChange(file);
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);
        }
      } else {
        onChange(null);
        setPreview(null);
      }
    },
    [onChange, validateFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] || null;
      handleFile(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
    setMessage("");
    onChange(null);
  };

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`relative flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-all duration-200 ${
          isDragging && !disabled
            ? "border-orange-400 bg-orange-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
        role="button"
        aria-label="File upload area"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          disabled={disabled}
          required={required}
          accept={acceptTypes.join(",")}
          id={id}
          onChange={handleChange}
          aria-required={required}
        />
        {preview ? (
          <div className="relative flex w-full items-center justify-center">
            <img
              src={preview}
              alt="File preview"
              className="h-24 w-auto rounded-lg object-contain"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              aria-label="Clear file"
            >
              <FaTimes size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <FaFileUpload
              size={24}
              className={disabled ? "text-gray-400" : "text-orange-400"}
            />
            <p className="text-sm text-gray-600">
              {isDragging ? "Drop file here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-gray-500">
              Accepted: {acceptTypes.join(", ")} | Max size: {maxSize}KB
            </p>
          </div>
        )}
      </div>
      {message && <AlertWarning title="Warning">{message}</AlertWarning>}
    </div>
  );
};

export default FileInput;