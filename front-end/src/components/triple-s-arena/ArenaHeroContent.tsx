"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
}

export default function ArenaHeroContent({ title, subtitle }: Props) {
  return (
    <div className="relative z-10 text-center text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-3xl font-light opacity-90"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
