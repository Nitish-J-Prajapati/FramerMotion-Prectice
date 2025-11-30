"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";

const tabs = [
  { id: "for-you", label: "For You" },
  { id: "explore", label: "Explore" },
  { id: "library", label: "Library" },
];

export default function Animation7() {
  const [activeTab, setActiveTab] = useState<string>("explore"); // Default active
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white font-sans gap-4">
      
      {/* === Main Pill Container === */}
      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className="relative flex items-center bg-[#18181b] rounded-full border border-white/10 shadow-2xl overflow-hidden"
        style={{
          borderRadius: 34,
          // Fixed height prevents jumping during transition
          height: "54px", 
          // Min width ensures shape holds; expands for search
          width: isSearchOpen ? "340px" : "auto" 
        }} 
      >
        
        <AnimatePresence mode="popLayout" initial={false}>
          {!isSearchOpen ? (
            /* ================= NAV LINKS ================= */
            <motion.div
              key="nav-links"
              initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-1 pl-2 pr-2"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60 focus:outline-none"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="pill-nav"
                      className="absolute inset-0 bg-zinc-700/60 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeTab === tab.id ? "text-white" : ""}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </motion.div>
          ) : (
            /* ================= SEARCH INPUT ================= */
            <motion.div
              key="search-input"
              initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex items-center px-4"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent border-none outline-none text-[15px] text-white placeholder-zinc-500 h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= ACTIONS (Right Side of Pill) ================= */}
        <div className="flex items-center gap-2 pr-2">
            
            {/* Search/Close Toggle Button */}
            <motion.button
                layout
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-zinc-100"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isSearchOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} className="text-zinc-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Search size={20} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>

      </motion.div>

      {/* === Profile Avatar (Outside) === */}
      {/* Added hover effect and placed outside the motion.div */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer">
         <Image 
           src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=200&auto=format&fit=crop" 
           alt="dog avatar" 
           width={48}
           height={48}
           className="w-full h-full object-cover" 
         />
      </div>

    </div>
  );
}