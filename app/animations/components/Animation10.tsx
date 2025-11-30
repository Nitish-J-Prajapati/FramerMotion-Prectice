"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data ---
type Item = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

// Different data for each year
const data: Record<string, Item[]> = {
  "2023": [
    {
      id: "23-1",
      title: "Neon Nights",
      subtitle: "Tokyo",
      image: "https://images.unsplash.com/photo-1555685812-4b943f3e9942?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "23-2",
      title: "Cyber",
      subtitle: "Punk",
      image: "https://images.unsplash.com/photo-1620641788427-b9a4d62bec99?q=80&w=800&auto=format&fit=crop",
    },
  ],
  "2024": [
    {
      id: "24-1",
      title: "Abstract",
      subtitle: "Forms",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "24-2",
      title: "Fluid",
      subtitle: "Motion",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "24-3",
      title: "Glass",
      subtitle: "Prism",
      image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=800&auto=format&fit=crop",
    },
  ],
  "2025": [
    {
      id: "25-1",
      title: "Future",
      subtitle: "Space",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "25-2",
      title: "Mars",
      subtitle: "Red",
      image: "https://images.unsplash.com/photo-1614728853913-1e221a613281?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "25-3",
      title: "Gravity",
      subtitle: "Zero",
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "25-4",
      title: "Void",
      subtitle: "Black",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

const years = ["2023", "2024", "2025"];

// Helper to animate text characters 1 by 1
const RevealText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  return (
    <div className="flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ y: "100%" }}
          animate={isActive ? { y: 0 } : { y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: isActive ? i * 0.05 : 0, // Stagger effect
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default function Animation10() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState("2024");

  const activeItems = data[activeYear];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] p-8 font-sans">
      
      {/* Main Container */}
      <div className="w-full max-w-4xl min-h-[600px] bg-[#111] rounded-3xl border border-white/5 p-8 flex flex-col gap-10 relative">
        
        {/* Header */}
        <div className="flex justify-between items-start text-xs text-neutral-500 font-mono uppercase tracking-widest border-b border-white/5 pb-4">
            <div>RGA</div>
            
            {/* Year Navigation */}
            <div className="flex gap-8">
                {years.map((year) => {
                    const isActive = activeYear === year;
                    return (
                        <div key={year} className="relative flex flex-col items-center">
                            <button 
                                onClick={() => setActiveYear(year)}
                                className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-600 hover:text-neutral-400"}`}
                            >
                                {/* Text Animation Component */}
                                {isActive ? (
                                    <RevealText text={year} isActive={true} />
                                ) : (
                                    <span>{year}</span>
                                )}
                            </button>
                            
                            {/* Moving Underline */}
                            {isActive && (
                                <motion.div
                                    layoutId="year-underline"
                                    className="absolute -bottom-1 w-full h-[1px] bg-white"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1 relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeYear}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
                >
                    {activeItems.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-2">
                            {/* Thumbnail */}
                            <motion.div
                                layoutId={`card-${item.id}`}
                                onClick={() => setSelectedId(item.id)}
                                className="aspect-square w-full rounded-xl overflow-hidden cursor-pointer relative group bg-neutral-900"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: index * 0.1, // Stagger images 1-by-1
                                    ease: "easeOut"
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    layoutId={`image-${item.id}`} 
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>

                            {/* Text (Fade in with item) */}
                            <motion.div 
                                className="flex flex-col"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <span className="text-neutral-300 text-sm font-medium">{item.title}</span>
                                <span className="text-neutral-600 text-xs">{item.subtitle}</span>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between text-[10px] text-neutral-600 font-mono uppercase border-t border-white/5 pt-4">
            <span>Lightbox</span>
            <span>Framer</span>
            <span>Effect</span>
        </div>

      </div>

      {/* ================= LIGHTBOX OVERLAY ================= */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            />

            {/* Find selected item across all years */}
            {Object.values(data).flat().map((item) => {
                if (item.id !== selectedId) return null;
                
                return (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(null)}
                        className="relative w-full max-w-[600px] aspect-square md:aspect-[16/9] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                        style={{ zIndex: 60 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <motion.img 
                            src={item.image} 
                            alt={item.title}
                            layoutId={`image-${item.id}`}
                            className="w-full h-full object-cover"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.15 }}
                            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                        >
                            <h2 className="text-white text-3xl font-bold tracking-tight mb-1">{item.title}</h2>
                            <p className="text-neutral-300 text-sm font-mono uppercase">{item.subtitle} • {activeYear}</p>
                        </motion.div>
                    </motion.div>
                );
            })}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}