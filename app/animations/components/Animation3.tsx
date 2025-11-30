"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Animation3() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F4F6]">
      {/* The Frame (Phone Container) */}
      <div
        className="relative w-[320px] h-[500px] bg-white rounded-[40px] shadow-2xl border-[6px] border-white ring-1 ring-gray-200 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)} // Tap to toggle on mobile
      >
        
        {/* Placeholder UI Background */}
        <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-3">
          {/* <div className="w-20 h-20 bg-gray-200/50 rounded-2xl" />
          <div className="w-32 h-3 bg-gray-200/50 rounded-full" /> */}
          <p className="text-gray-400 text-sm font-medium mt-2">Hover me</p>
        </div>

        {/* The Card Animation */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="card"
              // 🟢 Fix: Prevents text jitter
              style={{ willChange: "transform" }}
              
              // Animation: Slide up from bottom with a slight scale
              initial={{ y: "120%", scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: "120%", scale: 0.95, opacity: 0 }}
              
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              
              // Styling: Floating at the bottom of the frame
              className="absolute bottom-4 left-4 right-4 p-5 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex flex-col gap-1 z-10"
            >
              <h2 className="text-lg font-bold text-gray-900">Project name</h2>
              <p className="text-gray-500 text-sm font-medium">Project description</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}