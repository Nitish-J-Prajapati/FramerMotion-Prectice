"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { useState } from "react";

const SmoothButton = ({ withDelay }: { withDelay: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleClick = () => {
        if (status !== "idle") return;
        setStatus("loading");
        
        // Simulate API call loop
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setStatus("idle");
            }, 2500);
        }, 2000);
    };

    return (
        <motion.button
            onClick={handleClick}
            className="flex items-center justify-center h-12 rounded-full shadow-xl overflow-hidden border-[2.5px] border-white/30 bg-clip-padding relative"
            style={{
                backgroundColor: "white",
            }}
            initial="idle"
            // We use 'hover' state ONLY if we are idle. 
            // If loading/success, we might want to force a specific look or let layout handle it.
            // Here we stick to 'idle' variants for text hiding when not idle.
            animate={isHovered && status === "idle" ? "hover" : "idle"}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layout
            transition={{
                layout: {
                    duration: 0.4,
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    // 🟢 PRESERVED DELAY LOGIC:
                    // Only apply hover-entry delay if we are in idle mode (standard interaction)
                    // If we are loading/success, we usually want instant feedback, but sticking to your logic:
                    delay: withDelay ? (isHovered ? 0.2 : 0.15) : 0 
                }
            }}
        >
            <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    {status === "idle" && (
                        <motion.div
                            key="bag"
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <ShoppingBag className="w-5 h-5 text-black" strokeWidth={2.5} />
                        </motion.div>
                    )}
                    {status === "loading" && (
                        <motion.div
                            key="spinner"
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2 className="w-5 h-5 text-black animate-spin" strokeWidth={2.5} />
                        </motion.div>
                    )}
                    {status === "success" && (
                        <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Check className="w-5 h-5 text-black" strokeWidth={3} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Text Container */}
            <motion.div
                className="overflow-hidden flex items-center"
                variants={{
                    idle: { 
                        width: 0, 
                        opacity: 0,
                        transition: { 
                            duration: 0.2, 
                            ease: "easeInOut" 
                        } 
                    },
                    hover: { 
                        width: "auto", 
                        opacity: 1,
                        transition: { 
                            duration: 0.3, 
                            ease: "easeOut",
                            // Text waits for the container to start expanding
                            delay: withDelay ? 0.2 : 0 
                        } 
                    }
                }}
            >
                <span className="pr-5 text-sm font-bold text-black whitespace-nowrap">Add to cart</span>
            </motion.div>
        </motion.button>
    )
}

export default function Animation9() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] gap-12 font-sans text-white">
      
      {/* CARD 1: WITH DELAY (Good) */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-[320px] h-[420px] rounded-[32px] overflow-hidden relative shadow-2xl group cursor-pointer">
            {/* Background Image with Zoom Effect */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ease-out"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=700&auto=format&fit=crop')",
                    filter: "brightness(0.85)"
                }} 
            />
            
            {/* Button Container */}
            <div className="absolute bottom-8 right-8">
                <SmoothButton withDelay={true} />
            </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide">
            <span>With Delay</span>
            <span className="bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[10px]">GOOD</span>
        </div>
      </div>

      {/* CARD 2: NO DELAY (Bad) */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-[320px] h-[420px] rounded-[32px] overflow-hidden relative shadow-2xl group cursor-pointer">
             {/* Background Image */}
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ease-out"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=700&auto=format&fit=crop')",
                    filter: "brightness(0.85)"
                }} 
            />

            {/* Button Container */}
            <div className="absolute bottom-8 right-8">
                <SmoothButton withDelay={false} />
            </div>
        </div>
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm tracking-wide">
            <span>No Delay</span>
            <span className="bg-rose-400/10 border border-rose-400/20 px-2 py-0.5 rounded text-[10px]">BAD</span>
        </div>
      </div>

    </div>
  );
}