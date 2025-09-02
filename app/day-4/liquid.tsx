"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  CheckSquare,
  FileText,
  Star,
} from "lucide-react";

export default function Liquid() {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (!open) {
      // Opening → spin forward
      setRotation((prev) => prev + 360);
    } else {
      // Closing → spin backward
      setRotation((prev) => prev - 360);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full bg-white relative">
      {/* Floating Button */}
      <motion.div
        className="absolute bottom-16 right-16 border rounded-full p-2 bg-black cursor-pointer"
        onClick={handleClick}
        animate={{ rotate: rotation }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Simplified N Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="w-8 h-8 fill-white"
        >
          <path d="M 256 252 L 256 778 L 390 704 L 391 441 L 661 771 L 768 771 L 768 252 L 623 252 L 623 523 L 397 252 Z" />
        </svg>
      </motion.div>

      {/* Expanding/Closing Card with Liquid Morph Effect */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              clipPath:
                "circle(0% at calc(100% - 4rem) calc(100% - 4rem))",
              opacity: 0,
            }}
            animate={{
              clipPath:
                "circle(150% at calc(100% - 4rem) calc(100% - 4rem))",
              opacity: 1,
            }}
            exit={{
              clipPath:
                "circle(0% at calc(100% - 4rem) calc(100% - 4rem))",
              opacity: 0,
            }}
            transition={{
              duration: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-28 right-28 w-[380px] h-[480px] bg-black text-white rounded-[64px] shadow-xl p-6 flex flex-col"
          >
            <div className="my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className="w-8 h-8 fill-white"
              >
                <path d="M 256 252 L 256 778 L 390 704 L 391 441 L 661 771 L 768 771 L 768 252 L 623 252 L 623 523 L 397 252 Z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-6">
              How can I help you today?
            </h2>

            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <BarChart2 className="w-5 h-5" />
                Summarize my last visibility report
              </li>
              <li className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5" />
                Create action items
              </li>
              <li className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                Talk about my site audit
              </li>
              <li className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                Grade my content
              </li>
            </ul>

            <div className="mt-auto border rounded-xl px-4 py-2 text-gray-400">
              Ask your assistant anything...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
