"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  bgImage: string | null;
  description: string;
}

const ArenaSectionContent = ({ bgImage, description }: Props) => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <Image
            src={bgImage}
            alt="Triple S Arena - The Digital Operations Arena"
            fill
            className="object-cover "
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 px-6 py-20 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Long Description Text from API */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-white">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArenaSectionContent;
