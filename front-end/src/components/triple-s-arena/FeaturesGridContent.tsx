"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  index: number;
  title: string;
  description: string;
}

export default function FeaturesGridContent({
  index,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group flex flex-col h-full overflow-hidden bg-[#1A1A1A] hover:bg-[#222] transition-all duration-500 border border-white/5 hover:border-[#5b4180]/30"
    >
      {/* Text Section - Adjusted padding since there is no image */}
      <div className="flex-1 p-12 bg-[#1A1A1A]">
        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#5b4180] transition-colors">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed text-lg font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
