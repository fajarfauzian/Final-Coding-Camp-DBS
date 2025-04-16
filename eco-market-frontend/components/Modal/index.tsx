"use client"

import { event } from "jquery"
import React, { ReactNode } from "react"

const Modal = ({children, isShow, onClose}: {children: ReactNode, isShow: boolean, onClose: (status: boolean) => void}) => {
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose(false)
    }
return (
    <div className={`w-full h-dvh z-[1024] bg-slate-800 bg-opacity-90
        fixed top-0 left-0 ${isShow ? `flex` : `hidden`} justify-center itemscenter`}
         onClick={handleClickOutside}>
         <div className="w-5/6 md:w-4/6 lg:w-3/6 overflow-auto max-h-full
        bg-white rounded-2xl">
         {children}
         </div>
         </div>
        
)
}
export default Modal