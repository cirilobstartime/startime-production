"use client";

import { motion } from "framer-motion";

const DIGIT_HEIGHT = 48;

interface RollingNumberProps {
  value: number | string;
  className?: string;
}

function RollingDigit({ digit }: { digit: string }) {
  return (
    <div
      className="overflow-hidden"
      style={{ height: DIGIT_HEIGHT }}
    >
      <motion.div
        animate={{
          y: -(Number(digit) * DIGIT_HEIGHT),
          filter: [
            "blur(2px)",
            "blur(0px)",
          ],
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ height: DIGIT_HEIGHT }}
            className="flex items-center justify-center text-3xl font-extrabold leading-none tabular-nums text-[#001640] sm:text-4xl"
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function RollingNumber({
  value,
  className = "",
}: RollingNumberProps) {
  const digits = String(value)
    .padStart(2, "0")
    .split("");

  return (
  <div
    dir="ltr"
    className={`flex items-center justify-center ${className}`}
  >
    {digits.map((digit, index) => (
      <RollingDigit
        key={index}
        digit={digit}
      />
    ))}
  </div>
);
}