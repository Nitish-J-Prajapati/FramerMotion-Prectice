"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check } from "lucide-react";

export default function Animation13() {
  const [isEditing, setIsEditing] = useState(false);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);

  // Animation variants
  const containerVariants = {
    idle: {
      gap: "0px",
      paddingRight: "8px", // small padding for the edit icon area
      backgroundColor: "#F3F4F6", // gray-100
    },
    editing: {
      gap: "12px",
      paddingRight: "8px",
      backgroundColor: "transparent", // Remove bg from main container in edit mode to let children have their own
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      
      <motion.div
        layout
        className="flex items-center rounded-2xl overflow-hidden relative"
        initial="idle"
        animate={isEditing ? "editing" : "idle"}
        variants={containerVariants}
        // When not editing, we have a background. When editing, the container is transparent
        // and the children have backgrounds.
        style={{ 
            backgroundColor: isEditing ? "transparent" : "#F3F4F6",
            // Ensuring consistent height for layout transitions
            height: "64px" 
        }}
        transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
        }}
      >
        
        {/* === HOURS SECTION === */}
        <motion.div
            layout
            className={`flex items-center justify-center h-full rounded-2xl transition-colors ${isEditing ? "bg-gray-100 px-4" : "pl-6 pr-1"}`}
        >
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.input
                        key="input-hours"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-8 bg-transparent text-2xl font-semibold text-gray-900 text-center outline-none p-0 border-none m-0 appearance-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    />
                ) : (
                    <motion.span
                        key="text-hours"
                        layoutId="hours-text"
                        className="text-2xl font-semibold text-gray-900"
                    >
                        {hours}
                    </motion.span>
                )}
            </AnimatePresence>
            
            <span className="text-gray-400 text-lg font-medium ml-1">Hr.</span>
        </motion.div>

        {/* === MINUTES SECTION === */}
        <motion.div
            layout
            className={`flex items-center justify-center h-full rounded-2xl transition-colors ${isEditing ? "bg-gray-100 px-4" : "pl-2 pr-6"}`}
        >
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.input
                        key="input-mins"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="w-8 bg-transparent text-2xl font-semibold text-gray-900 text-center outline-none p-0 border-none m-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    />
                ) : (
                    <motion.span
                        key="text-mins"
                        layoutId="mins-text"
                        className="text-2xl font-semibold text-gray-900"
                    >
                        {minutes}
                    </motion.span>
                )}
            </AnimatePresence>
            
            <span className="text-gray-400 text-lg font-medium ml-1">Min.</span>
        </motion.div>

        {/* === ACTION BUTTON (Edit / Done) === */}
        <motion.button
            layout
            onClick={() => setIsEditing(!isEditing)}
            className={`
                relative flex items-center justify-center w-12 h-12 rounded-xl
                transition-colors duration-300
                ${isEditing ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-600 hover:bg-black/5"}
            `}
            // When editing, this button becomes a distinct block (bg-black).
            // When idle, it is transparent and sits inside the main gray container.
        >
            <AnimatePresence mode="wait" initial={false}>
                {isEditing ? (
                    <motion.div
                        key="check"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Check size={20} strokeWidth={3} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="edit"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Pencil size={18} fill="currentColor" className="opacity-80" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>

      </motion.div>
    </div>
  );
}