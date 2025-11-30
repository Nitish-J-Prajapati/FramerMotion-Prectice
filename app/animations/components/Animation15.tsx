"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Link, X } from "lucide-react";
import Image from "next/image";

// --- Configuration ---
const QR_IMAGE_URL = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://framermotion.fyi";

// --- Smooth Transition Settings ---
const smoothLayoutTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
  mass: 0.8
};

const textTransition = {
  type: "spring" as const,
  stiffness: 180,
  damping: 20,
  mass: 0.5
};

export default function Animation15() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-sans p-4">
      
      <motion.div
        layout
        data-isopen={isOpen}
        initial={{ borderRadius: "3rem" }}
        animate={{ borderRadius: isOpen ? "2.5rem" : "3rem" }}
        transition={smoothLayoutTransition}
        className="bg-[#EFF0F3] shadow-xl overflow-hidden relative"
        style={{
          width: isOpen ? 300 : "auto", 
          height: isOpen ? 360 : 64, // Decreased height for a tighter fit
        }}
      >
        
        {/* ==================== CLOSED STATE ==================== */}
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.button
              layout
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 px-8 h-full w-full whitespace-nowrap outline-none"
            >
              <QrCode className="w-6 h-6 text-gray-900" strokeWidth={2} />
              <span className="font-semibold text-gray-900 text-[16px]">Show QR Code</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ==================== OPEN STATE ==================== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-full p-5 gap-4" // Decreased gap and padding
            >
              {/* QR Code Container */}
              <motion.div 
                className="bg-white p-2 rounded-[24px] shadow-sm"
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <div className="relative w-44 h-44">
                    <Image 
                        src={QR_IMAGE_URL}
                        alt="QR Code"
                        fill
                        className="object-contain mix-blend-multiply opacity-90"
                        unoptimized
                    />
                </div>
              </motion.div>

              {/* Actions Footer */}
              <div className="flex items-center gap-2.5 w-full">
                
                {/* COPY LINK BUTTON */}
                <motion.button
                  layout
                  onClick={handleCopy}
                  className="flex-1 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden outline-none shadow-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div layout className="flex items-center font-bold text-gray-900 text-[15px]">
                    <Link size={18} strokeWidth={2.5} className="text-gray-900 mr-2" />
                    
                    {/* Stable "Cop" */}
                    <span className="inline-block">Cop</span>

                    {/* Swapping "y" / "ied" */}
                    <div className="relative h-6 flex items-center justify-center">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {isCopied ? (
                                <motion.span
                                    key="ied"
                                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                                    transition={textTransition}
                                    className="block"
                                >
                                    ied
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="y"
                                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                                    transition={textTransition}
                                    className="block"
                                >
                                    y
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stable "Link" */}
                    <span className="inline-block whitespace-pre"> Link</span>
                  </motion.div>
                </motion.button>

                {/* CLOSE BUTTON */}
                <motion.button
                  layout
                  onClick={() => setIsOpen(false)}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors outline-none shrink-0 cursor-pointer shadow-sm"
                  whileTap={{ scale: 0.92 }}
                >
                  <X size={22} className="text-gray-900" strokeWidth={2.5} />
                </motion.button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}