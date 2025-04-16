import { title } from "process";
import React, { Children, ReactNode } from "react";

type Prop = {
  children: ReactNode;
  title: string;
};

export const AlertInfo = ({ children, title }: Prop) => {
  return (
    <div
      className="my-4 bg-sky-300 rounded-md text-sky-800 px-4 py-3 shadow-md border-1-4 border-sky-800 hover:bg-sky-200 transition-all duration-300 transform hover:scale-105"
      role="alert"
    >
      <div className="flex gap-3">
        {" "}
        {/* jarak logo dan text  */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const AlertSuccess = ({ children, title }: Prop) => {
  return (
    <div
      className="my-4 bg-green-400 text-green-900 rounded-md px-4 py-3 shadow-md border-1-4 border-green-300 hover:bg-green-300 transition-all duration-300 transform hover:scale-105"
      role="alert"
    >
      <div className="flex gap-3">
        {" "}
        {/* jarak logo dan text  */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const AlertWarning = ({ children, title }: Prop) => {
  return (
    <div
      className="my-4 bg-yellow-400 rounded-md text-yellow-800 px-4 py-3 shadow-md border-1-4 border-yellow-200  hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
      role="alert"
    >
      <div className="flex gap-3">
        {" "}
        {/* jarak logo dan text  */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const AlertDanger = ({ children, title }: Prop) => {
  return (
    <div
      className="my-4 bg-red-400 text-red-950 rounded-md px-4 py-3 shadow-md border-1-4 border-red-400 hover:bg-red-300 transition-all duration-300 transform hover:scale-105"
      role="alert"
    >
      <div className="flex gap-3">
        {" "}
        {/* jarak logo dan text  */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};
