"use client";

import {
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { useLocale } from "next-intl";
import {
  ChevronDown,
  CircleAlert,
} from "lucide-react";

interface Option {
  value: string;
  label: {
    en: string;
    ar: string;
  };
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  required?: boolean;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Select({
  label,
  options,
  required = false,
  helperText,
  error,
  icon,
  className,
  ...props
}: SelectProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        className={`
          text-xs
          font-bold
          text-[#2A2E45]
          ${isRTL ? "text-right" : "text-left"}
        `}
      >
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
        <select
          {...props}
          dir={isRTL ? "rtl" : "ltr"}
          className={[
            `
            h-[45px]
            w-full
            appearance-none
            rounded-full
            border
            bg-[#FBFBFB]
            px-4
            text-sm
            text-[#515151]
            outline-none
            transition-colors

            placeholder:text-[#ADADAD]

            focus:bg-white
            focus:ring-4
            focus:ring-[#498FBD]/15
            `,
            
            isRTL
              ? "pl-12 text-right"
              : "pr-12 text-left",

            error
              ? `
                border-red-400
                focus:border-red-500
                focus:ring-red-200
              `
              : `
                border-[#C1C2C2]
                focus:border-[#007CD8]
              `,

            className ?? "",
          ].join(" ")}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {isRTL
                ? option.label.ar
                : option.label.en}
            </option>
          ))}
        </select>

        {/* Optional custom icon */}
        {icon && (
          <div
            className={`
              pointer-events-none
              absolute
              top-1/2
              -translate-y-1/2
              ${
                isRTL
                  ? "left-5"
                  : "right-5"
              }
            `}
          >
            {icon}
          </div>
        )}

        {/* Dropdown Arrow */}
        {!icon && (
          <ChevronDown
            size={18}
            className={`
              pointer-events-none
              absolute
              top-1/2
              -translate-y-1/2
              text-[#515151]
              ${
                isRTL
                  ? "left-5"
                  : "right-5"
              }
            `}
          />
        )}

        {/* Error Icon */}
        {error && (
          <CircleAlert
            size={18}
            className={`
              absolute
              top-1/2
              -translate-y-1/2
              text-red-500
              ${
                isRTL
                  ? "left-11"
                  : "right-11"
              }
            `}
          />
        )}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-xs text-[#ADADAD]">
          {helperText}
        </p>
      )}

      {/* Error Text */}
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}