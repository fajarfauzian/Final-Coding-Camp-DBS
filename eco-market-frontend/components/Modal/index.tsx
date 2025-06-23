"use client";

import React, { ReactNode } from "react";

const Modal = ({
  children,
  isShow,
  onClose,
}: {
  children: ReactNode;
  isShow: boolean;
  onClose: (status: boolean) => void;
}) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose(false);
  };
  
  return (
    <div
      className={`w-full h-dvh z-[1024] bg-slate-800 bg-opacity-90
        fixed top-0 left-0 ${isShow ? "flex" : "hidden"} justify-center items-center`}
      onClick={handleClickOutside}
    >
      <div className="w-4/6 md:w-3/6 lg:w-2/6 overflow-auto max-h-full
        bg-white rounded-2xl shadow-xl animate-fade-in">
        {children}
      </div>
    </div>
  );
};

export default Modal;