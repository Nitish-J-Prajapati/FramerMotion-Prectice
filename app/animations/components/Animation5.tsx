"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutGrid, 
  Tag, 
  FileText, 
  Settings, 
  User, 
  Store, 
  Landmark, 
  PenTool, 
  Code2, 
  Megaphone, 
  BarChart3 
} from "lucide-react";

// ===========================================
// 1. HOVER DATA
// ===========================================
const hoverTabs = [
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "product", label: "Product", icon: LayoutGrid },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

// ===========================================
// 2. CLICK (SHARED LAYOUT) DATA
// ===========================================
const clickTabs = [
  { id: "Design", icon: PenTool },
  { id: "Engineering", icon: Code2 },
  { id: "Product", icon: LayoutGrid },
  { id: "Marketing", icon: Megaphone },
  { id: "Sales", icon: BarChart3 },
];

// Define coordinates for each state (in percentages)
const layouts: Record<string, Record<string, { top: string; left: string; opacity: number }>> = {
  Design: {
    user: { top: "50%", left: "20%", opacity: 1 },
    store: { top: "50%", left: "50%", opacity: 1 },
    bank: { top: "50%", left: "80%", opacity: 1 },
  },
  Engineering: {
    user: { top: "50%", left: "20%", opacity: 1 },
    store: { top: "50%", left: "80%", opacity: 1 },
    bank: { top: "50%", left: "50%", opacity: 1 },
  },
  Product: {
    user: { top: "25%", left: "50%", opacity: 1 },
    store: { top: "75%", left: "75%", opacity: 1 },
    bank: { top: "75%", left: "25%", opacity: 1 },
  },
  Marketing: {
    user: { top: "50%", left: "20%", opacity: 1 },
    store: { top: "50%", left: "80%", opacity: 1 },
    bank: { top: "20%", left: "50%", opacity: 1 },
  },
  Sales: {
    user: { top: "50%", left: "30%", opacity: 1 },
    store: { top: "50%", left: "70%", opacity: 1 },
    bank: { top: "50%", left: "50%", opacity: 0 }, // Hide bank
  },
};

// Define arrows/connections for each state
const connections: Record<string, [string, string][]> = {
  Design: [["user", "store"], ["store", "bank"]],
  Engineering: [["user", "bank"], ["bank", "store"]],
  Product: [["user", "bank"], ["bank", "store"], ["store", "user"]],
  Marketing: [["user", "bank"], ["bank", "store"]],
  Sales: [["user", "store"]],
};

// Color mapping for nodes
const colors = {
  user: "bg-orange-500",
  store: "bg-blue-500",
  bank: "bg-green-500",
};

const icons = {
  user: User,
  store: Store,
  bank: Landmark,
};

export default function Animation5() {
  // State for Hover Version
  const [activeHover, setActiveHover] = useState<string | null>(null);
  
  // State for Click Version
  const [activeClick, setActiveClick] = useState<string>("Design");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-24 py-20">
      
      {/* ========================================================
          1. HOVER INTERACTION
         ======================================================== */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Hover Interaction</p>
        <div 
          className="flex flex-row items-center gap-2 p-2 border border-gray-200 bg-white rounded-full shadow-sm"
          onMouseLeave={() => setActiveHover(null)}
        >
          {hoverTabs.map((tab) => (
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
                  className="absolute inset-0 bg-gray-900 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeHover === tab.id ? "text-white" : "text-gray-500"}`}>
                 <tab.icon size={16} strokeWidth={2.5} />
                 {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>


      {/* ========================================================
          2. SHARED LAYOUT NODE GRAPH (Click Interaction)
         ======================================================== */}
      <div className="flex flex-col items-center gap-8 w-full max-w-3xl px-4">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Shared Layout Graph</p>
        
        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-2">
          {clickTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveClick(tab.id)}
              className={`
                relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors
                ${activeClick === tab.id ? "text-white" : "text-gray-500 hover:bg-gray-100"}
              `}
            >
              {activeClick === tab.id && (
                <motion.div
                  layoutId="active-click-tab"
                  className="absolute inset-0 bg-gray-900 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={16} />
                {tab.id}
              </span>
            </button>
          ))}
        </div>

        {/* ANIMATION AREA */}
        <div className="relative w-full h-[300px] bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* NODES */}
            {["user", "store", "bank"].map((key) => {
               const nodeState = layouts[activeClick][key];
               const Icon = icons[key as keyof typeof icons];
               
               return (
                 <motion.div
                    key={key}
                    layout
                    initial={false}
                    animate={{
                        top: nodeState.top,
                        left: nodeState.left,
                        opacity: nodeState.opacity,
                        scale: nodeState.opacity === 0 ? 0.5 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-20 ${colors[key as keyof typeof colors]}`}
                 >
                    <Icon className="text-white w-7 h-7" />
                 </motion.div>
               )
            })}

            {/* CONNECTIONS (SVG LAYER) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <AnimatePresence>
                    {connections[activeClick].map(([start, end]) => {
                        const startPos = layouts[activeClick][start];
                        const endPos = layouts[activeClick][end];
                        
                        // Simple check to ensure we don't draw lines to hidden nodes
                        if (startPos.opacity === 0 || endPos.opacity === 0) return null;

                        return (
                            <motion.line
                                key={`${activeClick}-${start}-${end}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                x1={startPos.left} 
                                y1={startPos.top} 
                                x2={endPos.left} 
                                y2={endPos.top} 
                                stroke="#E5E7EB" 
                                strokeWidth="4"
                                strokeDasharray="8 8"
                                strokeLinecap="round"
                            />
                        );
                    })}
                </AnimatePresence>
            </svg>
            
        </div>
      </div>

    </div>
  );
}