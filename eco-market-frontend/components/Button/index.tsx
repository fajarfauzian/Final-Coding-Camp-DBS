import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};


export const ButtonPrimary = ({
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={`text-sm bg-green-600 text-white rounded-md py-2 px-7  hover:bg-green-500 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonSuccess = ({
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={`text-sm bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-500 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonInfo = ({
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={`text-sm bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-500 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};


export const ButtonWarning = ({
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={`text-sm bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-400 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonDanger = ({ children, type, onClick, className }: Props) => {
  return (
    <button
      className={`text-sm bg-red-600 text-white rounded-md py-2 px-6 hover:bg-red-500 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonSuccessOutline = ({
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={`text-sm bg-purple-500 text-white rounded-md py-2 px-4 hover:bg-purple-400 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonEnter = ({ children, type, onClick, className }: Props) => {
  return (
    <button
      className={`text-sm bg-slate-500 text-white rounded-md py-2 px-4 hover:bg-slate-400  font-bold  ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

export const ButtonSpace = ({ children, type, onClick, className }: Props) => {
  return (
    <button
      className={`text-sm bg-pink-700 text-white rounded-md py-2 px-16 hover:bg-pink-600 font-bold ${className} transition-all duration-300 transform hover:scale-105`}
      type={type}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};


export const ButtonArema = ({ children, type, onClick, className }: Props) => {
    return (
      <button
        className={`text-sm bg-blue-700 text-white rounded-md py-10 px-10 hover:bg-blue-600 font-bold ${className} transition-all duration-300 transform hover:scale-105`}

        type={type}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        {children}
      </button>
    );
  };