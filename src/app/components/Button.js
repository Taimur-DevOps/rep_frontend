"use client";
import React from "react";

export default function Button({
  type = "button",
  text,
  isLoading = false,
  disabled = false,
  variant = "primary",
  icon = null,
  className,
  ...rest
}) {
  return (
    <>
      <button
        type={type}
        className={`transition-all duration-300 ease-in-out ${
          variant === "primary"
            ? `${
                disabled
                  ? `cursor-not-allowed rounded-lg border bg-btnBg px-4 py-2 text-center text-base font-semibold text-[#898989] ${className}`
                  : `text-center text-base text-white bg-lightPeach rounded-[4px] font-nokara .nokora-regular py-2 px-9 hover:bg-hoverBtn  ${className}`
              }`
            : variant === "secondary"
            ? `${
                disabled
                  ? `cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm`
                  : `bg-secondary cursor-pointer rounded-lg from-slate-700 via-slate-800 to-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/90 ${className}`
              }`
            : variant === "tertiary"
            ? `${
                disabled
                  ? `text-secondary-500 cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium shadow-sm`
                  : `rounded-lg border border-Gray px-4 py-2 text-sm font-semibold text-Gray hover:bg-btnBg hover:text-white lg:text-base ${className}`
              }`
            : variant === "advanced"
            ? `${
                disabled
                  ? `cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium shadow-sm ${className}`
                  : `flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 shadow hover:bg-gray-100 ${className}`
              }`
            : ""
        }`}
        disabled={disabled}
        {...rest}
      >
        {isLoading ? (
          <div className={`flex w-full items-center justify-center text-base`}>
            {text}
            {icon ? <span className="h-5 w-5">{icon}</span> : null}
          </div>
        ) : (
          <div className={`flex items-center justify-center gap-2 ${className}`}>
            {icon ? <span className="h-5 w-5">{icon}</span> : null}
            <span className="">{text}</span>
          </div>
        )}
      </button>
    </>
  );
}