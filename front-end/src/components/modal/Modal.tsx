"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const widthClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
        {isOpen && (
            <>
            {/* Overlay */}
            <motion.div
                className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Container */}
            <div className="fixed inset-0 z-[1000] overflow-y-auto p-4">
                <div className="flex min-h-full items-center justify-center">
                <motion.div
                    initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    }}
                    animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    }}
                    exit={{
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    }}
                    transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                    relative
                    w-full
                    ${widthClasses[maxWidth]}
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-white
                    shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                    `}
                >
                    {/* Close Button */}
                    <button
                    onClick={onClose}
                    className="
                        absolute
                        right-6
                        top-6
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-100
                        transition-all
                        hover:bg-slate-200
                        hover:rotate-90
                    "
                    >
                    <X className="h-5 w-5" />
                    </button>

                    {title && (
                    <div className="border-b border-slate-200 px-10 py-6">
                        <h2 className="text-2xl font-bold text-slate-900">
                        {title}
                        </h2>
                    </div>
                    )}

                    {children}
                </motion.div>
                </div>
            </div>
            </>
        )}
        </AnimatePresence>
  );
}