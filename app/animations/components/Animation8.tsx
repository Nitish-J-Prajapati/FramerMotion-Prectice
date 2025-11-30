"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Define the steps in order
const steps = ["Days", "Months", "Years"];

export default function Animation8() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Widths for the states. 
  // 'Years' uses '100%' to fill the available space entirely.
  const getWidth = () => {
    switch (currentIndex) {
      case 0: return "80px";   // Days
      case 1: return "150px";  // Months
      case 2: return "100%";   // Years (Full Width)
      default: return "80px";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative flex items-center justify-between bg-white rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 w-[340px] h-16 gap-2">
        
        {/* === MINUS BUTTON === */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors z-10 shrink-0
            ${currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"}`}
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>

        {/* === CENTER ANIMATED PILL === */}
        {/* justify-end: Anchors the pill to the RIGHT.
            When width increases, it grows to the LEFT.
        */}
        <div className="flex-1 flex justify-end relative h-10">
            {/* Background Track (Optional: To show the full area it can fill) */}
            {/* <div className="absolute inset-0 bg-gray-100 rounded-full" /> */}

            <motion.div
                layout
                initial={false}
                animate={{ width: getWidth() }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30 
                }}
                className="h-full bg-black rounded-full flex items-center justify-center overflow-hidden relative z-0"
            >
                <AnimatePresence mode="popLayout" initial={false} custom={currentIndex}>
                    <motion.span
                        key={steps[currentIndex]}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-white font-semibold text-sm absolute"
                    >
                        {steps[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
        </div>

        {/* === PLUS BUTTON === */}
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors z-10 shrink-0
            ${currentIndex === steps.length - 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"}`}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}