"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Tag, FileText, Settings } from "lucide-react";

// Define the menu items
const tabs = [
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "product", label: "Product", icon: LayoutGrid },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Animation5() {
  // State for Hover Version
  const [activeHover, setActiveHover] = useState<string | null>(null);
  
  // State for Click Version (Default to 'product' so one is always active)
  const [activeClick, setActiveClick] = useState<string>("product");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-20">
      
      {/* ========================================================
          1. HOVER INTERACTION (Original)
         ======================================================== */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Hover Interaction</p>
        <div 
          className="flex flex-row items-center gap-2 p-2 border border-gray-100 rounded-full shadow-sm"
          onMouseLeave={() => setActiveHover(null)}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveHover(tab.id)}
              onMouseEnter={() => setActiveHover(tab.id)}
              className="relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-200 focus:outline-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeHover === tab.id && (
                <motion.div
                  layoutId="pill-hover" 
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeHover === tab.id ? "text-white" : "text-gray-500"}`}>
                 <tab.icon size={18} strokeWidth={2.5} />
                 {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>


      {/* ========================================================
          2. CLICK INTERACTION (Duplicate)
         ======================================================== */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Click Interaction</p>
        <div className="flex flex-row items-center gap-2 p-2 border border-gray-100 rounded-full shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              // Only trigger on Click
              onClick={() => setActiveClick(tab.id)}
              className="relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-200 focus:outline-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeClick === tab.id && (
                <motion.div
                  layoutId="pill-click" // Unique ID so it doesn't conflict with the one above
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeClick === tab.id ? "text-white" : "text-gray-500"}`}>
                 <tab.icon size={18} strokeWidth={2.5} />
                 {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}