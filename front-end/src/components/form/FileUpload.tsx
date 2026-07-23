"use client";

import { useRef } from "react";
import { Upload, Paperclip } from "lucide-react";
import { useLocale } from "next-intl";

interface FileUploadProps {
  label: string;
  buttonLabel: string;
  helperText: string;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export default function FileUpload({
  label,
  buttonLabel,
  helperText,
  accept = ".pdf,.jpg,.jpeg,.png",
  value,
  onChange,
}: FileUploadProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-xs font-bold text-[#2A2E45] ${
          isAr ? "text-right" : "text-left"
        }`}
      >
        {label}
      </label>

      <div
        className={`
          flex
          h-[72px]
          items-center
          justify-between
          rounded-full
          border
          border-dashed
          border-[#C1C2C2]
          bg-[#FDF9EF]
          px-4
          ${isAr ? "flex-row-reverse" : ""}
        `}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          {/* Upload Button */}
          <button
            type="button"
            onClick={handleSelect}
            className="
              flex
              h-10
              items-center
              gap-2
              rounded-full
              border
              border-[#B0D6F3]
              bg-[#E6F2FB]
              px-6
              text-sm
              text-[#007CD8]
              transition-colors
              hover:bg-[#D8ECFA]
            "
          >
            <Upload className="h-4 w-4" />
            {buttonLabel}
          </button>

          {/* Helper Text */}
          <p className="text-sm leading-5 text-[#8B8B8B]">
            {helperText}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 font-medium text-[#1F2A44]">
          <span>{label}</span>
          <Paperclip className="h-5 w-5 text-[#D8B25A]" />
        </div>
      </div>

        {/* Helper */}
        {/* <span className="text-sm text-[#ADADAD]">
          {helperText}
        </span> */}

        {/* Attachment */}
        {/* <div className="flex items-center gap-2">
          <span className="text-sm">{label}</span>

          <div className="rounded-full bg-[#F8EBCE] p-2">
            <Paperclip
              className="h-4 w-4 text-[#244A77]"
            />
          </div>
        </div> */}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) =>
            onChange?.(e.target.files?.[0] ?? null)
          }
        />
      </div>
    </div>
  );
}