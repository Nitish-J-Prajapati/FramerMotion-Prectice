"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";

// --- Data Structure ---
type MenuItem = {
  id: string;
  label: string;
  children?: MenuItem[];
};

const staticLinks: MenuItem[] = [
  { id: "home", label: "Home" },
  { id: "what", label: "What this is" },
];

const accordionLinks: MenuItem[] = [
  {
    id: "about",
    label: "About",
    children: [
      { id: "overview", label: "Overview" },
      { id: "admin", label: "Administration" },
      {
        id: "facts",
        label: "Facts",
        children: [
          { id: "history", label: "History" },
          { id: "stats", label: "Current Statistics" },
          { id: "awards", label: "Awards" },
        ],
      },
      { id: "tours", label: "Campus Tours" },
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    children: [
      { id: "apply", label: "Apply" },
      {
        id: "tuition",
        label: "Tuition",
        children: [
          { id: "undergrad", label: "Undergraduate" },
          { id: "grad", label: "Graduate" },
          { id: "professional", label: "Professional Schools" },
        ],
      },
      { id: "signup", label: "Sign Up" },
      { id: "visit", label: "Visit" },
      { id: "photo", label: "Photo Tour" },
      { id: "connect", label: "Connect" },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    children: [
      { id: "colleges", label: "Colleges & Schools" },
      { id: "programs", label: "Programs of Study" },
      { id: "honors", label: "Honors Programs" },
      { id: "online", label: "Online Courses" },
    ],
  },
];

// --- Recursive Menu Item Component ---
const MenuNode = ({
  item,
  expandedIds,
  toggleExpand,
  level = 0,
  activeId,
  setActiveId,
  showIndicator = false, // 🟢 New prop to control the red line
}: {
  item: MenuItem;
  expandedIds: string[];
  toggleExpand: (id: string) => void;
  level?: number;
  activeId: string;
  setActiveId: (id: string) => void;
  showIndicator?: boolean;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.includes(item.id);
  const isActive = activeId === item.id;

  return (
    <motion.div layout className="overflow-hidden">
      <motion.button
        layout
        onClick={(e) => {
          e.stopPropagation();
          setActiveId(item.id);
          if (hasChildren) toggleExpand(item.id);
        }}
        className={`relative flex items-center justify-between w-full py-2 px-3 text-left transition-colors text-[13px] group
          ${level === 0 ? "font-medium text-gray-900" : "font-normal text-gray-500"}
          ${isExpanded && level === 0 ? "bg-red-50/50" : "hover:bg-gray-50"}
        `}
      >
        {/* 🟢 Active Indicator (Red Line) - Only if showIndicator is true */}
        {isActive && level === 0 && showIndicator && (
          <motion.div
            layoutId="active-indicator"
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF5A5F]"
          />
        )}

        <span style={{ paddingLeft: level * 12 }}>{item.label}</span>

        {/* Toggle Button */}
        {hasChildren && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(item.id);
            }}
            className={`
              flex items-center justify-center w-5 h-5 rounded-[4px] transition-colors
              text-gray-400 hover:text-gray-700 hover:bg-gray-200/60
              ${isExpanded ? "bg-transparent" : ""}
            `}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 135 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Plus size={12} />
            </motion.div>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {item.children!.map((child) => (
              <MenuNode
                key={child.id}
                item={child}
                level={level + 1}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                activeId={activeId}
                setActiveId={setActiveId}
                // Children don't show the indicator in this design
                showIndicator={false} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Layout Component ---
export default function Animation4() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("home");

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F4F6] font-sans text-gray-900">
      {/* 🟢 Container Border made darker (gray-300) */}
      <div className="w-[300px] bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden flex flex-col">
        
        {/* Top Label */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            <div className="w-3.5 h-3.5 border border-gray-400 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            </div>
            the craft of ui
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="search..."
              className="w-full bg-white text-[13px] text-gray-700 rounded-[6px] pl-8 pr-8 py-1.5 border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-0 transition-all placeholder:text-gray-400 shadow-sm"
            />
            <div className="absolute right-2 top-2 w-4 h-4 flex items-center justify-center border border-gray-200 rounded-[4px] bg-gray-50 text-[10px] text-gray-400">
              /
            </div>
          </div>
        </div>

        {/* 🟢 Divider 1: Full Width & Darker */}
        <div className="h-px bg-gray-200 w-full mb-1" />

        {/* Static Links (Home, What this is) - INDICATOR ENABLED */}
        <div className="flex flex-col py-1">
          {staticLinks.map((item) => (
            <MenuNode
              key={item.id}
              item={item}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
              activeId={activeId}
              setActiveId={setActiveId}
              showIndicator={true} // ✅ Show red line
            />
          ))}
        </div>

        {/* 🟢 Divider 2: Full Width & Darker */}
        <div className="h-px bg-gray-200 w-full my-1" />

        {/* Accordion Links - INDICATOR DISABLED */}
        <motion.div layout className="flex flex-col py-1 pb-3">
          {accordionLinks.map((item) => (
            <MenuNode
              key={item.id}
              item={item}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
              activeId={activeId}
              setActiveId={setActiveId}
              showIndicator={false} // ❌ Hide red line
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
}