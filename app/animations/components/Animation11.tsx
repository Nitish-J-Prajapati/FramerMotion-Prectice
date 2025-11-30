"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, List, Download, FileText, AlertCircle, Shield, ArrowRight } from "lucide-react";

// Menu items data
const menuItems = [
  { id: 0, label: "Overview", icon: FileText },
  { id: 1, label: "Monitored Issues", icon: AlertCircle },
  { id: 2, label: "Protocol", icon: Shield },
  { id: 3, label: "Next Steps", icon: ArrowRight },
];

export default function Animation11() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentsExpanded, setIsContentsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0); // Track active menu item

  return (
    <div className="flex items-center justify-center h-screen bg-[#FAFAFA] font-sans text-gray-800">
      
      {/* Anchor Container */}
      <div className="relative">
        
        {/* === STACKED PANELS (Absolute Positioned) === */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute bottom-16 right-0 flex flex-col items-end gap-3 w-max z-10"
            >
              
              {/* --- PANEL 1: CONTENTS (Top) --- */}
              <motion.div
                layout
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 30, delay: 0.05 } 
                  },
                }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-72 origin-bottom-right"
              >
                {/* Header Toggle */}
                <div 
                    onClick={() => setIsContentsExpanded(!isContentsExpanded)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/80 transition-colors relative z-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gray-100 rounded-md">
                            <List size={16} className="text-gray-600" />
                        </div>
                        <span className="font-semibold text-sm text-gray-700">Contents</span>
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                        {menuItems.length} items
                    </span>
                </div>

                {/* Expanded Content List */}
                <AnimatePresence>
                    {isContentsExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-t border-gray-100"
                        >
                            <div className="flex flex-col text-[13px] text-gray-600 pb-2">
                                {menuItems.map((item, index) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => setActiveItem(item.id)}
                                        className="relative px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors hover:text-black"
                                    >
                                        {/* 🟢 MOVING ORANGE HIGHLIGHT */}
                                        {activeItem === item.id && (
                                            <motion.div
                                                layoutId="active-item"
                                                className="absolute inset-0 border-l-2 border-orange-500 bg-orange-50/50"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}

                                        {/* Content needs relative z-index to sit on top of the moving background */}
                                        <div className={`relative z-10 flex items-center gap-3 ${activeItem === item.id ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                            <item.icon 
                                                size={14} 
                                                className={activeItem === item.id ? "text-orange-500" : "text-gray-400"} 
                                            />
                                            <span>{index + 1}. {item.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>

              {/* --- PANEL 2: NOTIFICATION (Bottom) --- */}
              <motion.div
                layout
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 30 } 
                  },
                }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-1 pr-4 pl-1 w-64 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <Download size={18} className="text-gray-600" />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-800">Get items</span>
                    <span className="text-[11px] text-gray-400">Protocol PDF</span>
                </div>
                
                {/* 🟢 PERFECT BLINKING DOT (Centered) */}
                <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* === FAB BUTTON === */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if(isOpen) setIsContentsExpanded(false); // Reset on close
          }}
          layout
          className="w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center justify-center text-gray-700 hover:scale-105 active:scale-95 transition-transform z-50 relative"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Menu size={24} />
                {/* Notification Badge on Menu */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white translate-x-1 -translate-y-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </div>
  );
}