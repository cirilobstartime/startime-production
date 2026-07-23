"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";


interface PhoneInputProps {
  label: string;
  name: string;
  value?: string;
  country?: {
    code: string;
    flag: string;
  };
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PhoneInput({
  label,
  name,
  value,
  country = {
    code: "+966",
    flag: "🇸🇦",
  },
  placeholder = "5XXXXXXXX",
  required,
  onChange,
}: PhoneInputProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={`text-xs font-bold text-[#2A2E45] ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        {label}
      </label>

      <div
        className={`
            flex
            h-[45px]
            w-full
            gap-2
            overflow-hidden
            ${isAr ? "flex-row-reverse" : ""}
        `}
        >
        {/* Country Code */}
        <button
          type="button"
          className="
            flex
            w-[125px]
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-[#C1C2C2]
            bg-[#FBFBFB]
            px-4
            transition-colors
            hover:border-[#007CD8]
          "
        >
          {/* Replace later with Saudi flag */}
          <span className="text-lg">
            {country.flag}
            </span>

            <span className="text-sm text-[#515151]">
            {country.code}
            </span>

          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Phone Number */}
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`
            h-full
            min-w-0
            flex-1
            rounded-full
            border
            border-[#C1C2C2]
            bg-[#FBFBFB]
            px-4
            text-sm
            outline-none
            transition-colors
            placeholder:text-[#ADADAD]
            focus:border-[#007CD8]
            ${isAr ? "text-right" : "text-left"}
          `}
        />
      </div>
    </div>
  );
}