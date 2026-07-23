"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface MoveRightButtonProps {
  href: string;
  text: string;
  isAr: boolean;
  className?: string;
  color?: string;
}

export default function MoveRightButton({
  href,
  text,
  isAr,
  className = "",
  color = "text-white",
}: MoveRightButtonProps) {
  const borderColor = color === "text-white" ? "border-white" : "border-black";

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 w-fit transition-all duration-300 ${color} ${className}`}
    >
      <span
        className={`border-b ${borderColor} pb-1 group-hover:border-[#5b4180] group-hover:opacity-70 transition-all`}
      >
        {text}
      </span>

      <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: isAr ? -8 : 8 }}
        className="text-2xl"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isAr ? "rotate-180" : ""}`}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.span>
    </Link>
  );
}
