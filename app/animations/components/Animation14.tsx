"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// --- Data ---
const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop",
    title: "Cliff Walk at Pourville",
    artist: "Claude Monet"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1000&auto=format&fit=crop",
    title: "Starry Night",
    artist: "Vincent van Gogh"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=1000&auto=format&fit=crop",
    title: "The Great Wave",
    artist: "Hokusai"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1576769267415-9642010aa962?q=80&w=1000&auto=format&fit=crop", 
    title: "The Persistence of Memory",
    artist: "Salvador Dalí"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer"
  }
];

export default function Animation14() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans">
      
      {/* === CONTROLS (Top) === */}
      <div className="flex items-center gap-6 mb-12 z-20">
        <motion.button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            whileHover={activeIndex > 0 ? { scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
            whileTap={activeIndex > 0 ? { scale: 0.95 } : {}}
            className={`
                w-10 h-10 rounded-full shadow-md border border-gray-100 flex items-center justify-center transition-colors
                ${activeIndex === 0 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white text-gray-500 hover:text-blue-600 hover:border-blue-100 cursor-pointer"}
            `}
        >
            <ChevronLeft size={20} />
        </motion.button>
        
        {/* Indicators */}
        <div className="flex gap-2">
            {images.map((_, i) => (
                <motion.div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full`}
                    animate={{ 
                        backgroundColor: i === activeIndex ? "#111" : "#D1D5DB",
                        scale: i === activeIndex ? 1.2 : 1
                    }}
                />
            ))}
        </div>

        <motion.button 
            onClick={handleNext}
            disabled={activeIndex === images.length - 1}
            whileHover={activeIndex < images.length - 1 ? { scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
            whileTap={activeIndex < images.length - 1 ? { scale: 0.95 } : {}}
            className={`
                w-10 h-10 rounded-full shadow-md border border-gray-100 flex items-center justify-center transition-colors
                ${activeIndex === images.length - 1 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white text-gray-500 hover:text-blue-600 hover:border-blue-100 cursor-pointer"}
            `}
        >
            <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* === CARD STACK === */}
      <div className="relative w-[600px] h-[400px] flex items-center justify-center perspective-1000 mb-8">
        <AnimatePresence initial={false}>
            {images.map((img, index) => {
                // Determine stack position relative to the active card
                // Cards with index < activeIndex are "past" (unstacked)
                // Card with index === activeIndex is "current" (top)
                // Cards with index > activeIndex are "future" (stacked behind)

                // We calculate the stack index for future cards only (0, 1, 2, 3...)
                // For past cards, we just want to hide them.
                
                // Show up to 4 cards in the stack behind the active one.
                if (index > activeIndex + 4) return null;
                
                // If a card is past (index < activeIndex), we still render it momentarily so AnimatePresence can animate it out.
                // But we don't need it in the DOM after that.
                if (index < activeIndex) return null; 

                const stackIndex = index - activeIndex; // 0, 1, 2...

                // Visual Calculations
                const zIndex = 50 - stackIndex * 10; 
                const scale = 1 - stackIndex * 0.05; 
                const y = -stackIndex * 15; // Stack upwards
                const opacity = 1 - stackIndex * 0.15; 

                return (
                    <motion.div
                        key={img.id}
                        layout
                        className="absolute w-full aspect-[16/10] rounded-[24px] bg-white shadow-2xl overflow-hidden cursor-pointer border-[2px] border-white origin-bottom"
                        initial={false}
                        animate={{
                            scale,
                            y,
                            opacity,
                            zIndex,
                        }}
                        exit={{
                            // When unstacking (moving to past), fade out and scale up slightly
                            opacity: 0,
                            scale: 1.1,
                            transition: { duration: 0.35, ease: "easeOut" }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        onClick={() => {
                            if (index === activeIndex) handleNext();
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image 
                                src={img.src} 
                                alt={img.title} 
                                fill
                                className="object-cover pointer-events-none" 
                            />
                        </div>
                    </motion.div>
                );
            })}
        </AnimatePresence>
      </div>

      {/* === CAPTIONS (Horizontal Carousel) === */}
      <div className="h-20 w-full max-w-4xl relative flex items-center justify-center mt-8 overflow-hidden">
        {images.map((img, index) => {
            const offset = index - activeIndex;
            
            // Only render items near the viewport
            if (offset < -2 || offset > 2) return null;

            return (
                <motion.div
                    key={img.id}
                    className="absolute w-[400px] text-center flex flex-col items-center justify-center"
                    animate={{ 
                        x: offset * 350, // 350px spacing
                        opacity: offset === 0 ? 1 : 0.25, 
                        scale: offset === 0 ? 1 : 0.9,
                        filter: offset === 0 ? "blur(0px)" : "blur(2px)"
                    }}
                    transition={{
                        // Less bounce, more slide
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 1
                    }}
                >
                    <h3 className="text-gray-900 font-bold text-xl tracking-tight truncate w-full px-4">
                        {img.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 font-medium uppercase tracking-wide truncate w-full px-4">
                        {img.artist}
                    </p>
                </motion.div>
            );
        })}
      </div>

    </div>
  );
}