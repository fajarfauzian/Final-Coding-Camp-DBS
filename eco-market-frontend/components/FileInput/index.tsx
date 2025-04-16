"use client";
import React from "react";
import { useState } from "react";
import { AlertWarning } from "../Alert";

type Props = {
  disabled?: boolean;
  acceptTypes: string[];
  onChange: (file: File | null) => void;
  className?: string;
  required: boolean;
  id?: string;
  label?: string;
  maxSize?: number;
};

const FileInput = (props: Props) => {
  const [message, setMessage] = useState("");
  const limitSize = props.maxSize || 2048;
  const acceptTypes = props.acceptTypes.join();
  const handleFileInput = (
    event: React.ChangeEvent,
    callback: (data: File | null) => void
  ): void => {
    const target = event.target as HTMLInputElement;
    let currentFile: File = (target.files as FileList)[0];
    setMessage("");
    if (!props.acceptTypes.includes(currentFile.type)) {
      target.value = "";
      setMessage(`'${currentFile.type}' is invalid file type. The
   allow file type are ${acceptTypes}`);
      callback(null);
      return;
    }
    if (currentFile.size > 2 * 1024 * 1024) {
      target.value = "";
      setMessage(`Your file is oversize`);
      callback(null);
      return;
    }
    callback(currentFile);
  };
  return (
    <div className="w-full flex flex-col gap-1 my-2">
      <strong className="text-xs font-bold text-slate500">{props.label}</strong>
      <input
        type={`file`}
        className={`text-sm w-full rounded-md p-2 bg-slate-50 border border-white focus:border-slate-500 focus:outline-none ${props.className}`}
        disabled={props.disabled}
        required={props.required || false}
        accept={acceptTypes}
        id={props.id}
        onChange={(e) => handleFileInput(e, props.onChange)}
      />
      {message !== "" ? (
        <AlertWarning title="Peringatan">{message}</AlertWarning>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FileInput;
