"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { useLocale } from "next-intl";
import { CheckCircle2, CircleAlert } from "lucide-react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  success?: boolean;
  icon?: ReactNode;
}

export default function Input({
  label,
  required = false,
  helperText,
  error,
  success = false,
  icon,
  className,
  ...props
}: InputProps) {
    const locale = useLocale();
    const isRTL = locale === "ar";
  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span
            className={`text-red-500 ${
                isRTL ? "mr-1" : "ml-1"
            }`}
            >
            *
            </span>
        )}
      </label>

      <div className="relative">
        {/* Left / Right Icon */}
        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
              isRTL ? "right-6" : "left-6"
            }`}
          >
            {icon}
          </div>
        )}

        {/* Success Icon */}
        {success && !error && (
          <CheckCircle2
            size={18}
            className={`absolute top-1/2 -translate-y-1/2 text-green-500 ${
              isRTL ? "left-6" : "right-6"
            }`}
          />
        )}

        {/* Error Icon */}
        {error && (
          <CircleAlert
            size={18}
            className={`absolute top-1/2 -translate-y-1/2 text-red-500 ${
              isRTL ? "left-6" : "right-6"
            }`}
          />
        )}

        <input
          {...props}
          dir={isRTL ? "rtl" : "ltr"}
          className={[
            `
            h-14
            w-full
            rounded-full
            border
            bg-slate-50
            text-[15px]
            outline-none
            transition-all

            placeholder:text-slate-400

            focus:bg-white
            focus:ring-4
            focus:ring-[#498FBD]/15
            `,

            isRTL
                ? icon
                    ? "pr-14 pl-12 text-right"
                    : "px-5 text-right"
                : icon
                    ? "pl-14 pr-12 text-left"
                    : "px-5 text-left",

            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-200 focus:border-[#498FBD]",

            className ?? "",
          ].join(" ")}
        />
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}