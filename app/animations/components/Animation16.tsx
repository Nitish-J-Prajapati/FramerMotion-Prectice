"use client";

import React, { useEffect, useRef } from "react";
import { 
  motion, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  MotionValue,
  PanInfo
} from "framer-motion";
import { Book as BookIcon } from "lucide-react";

// --- Configuration ---
const PAGE_COUNT = 16;
// Total steps = Front Cover (1) + Pages (16) + Back Cover (1)
const TOTAL_STEPS = PAGE_COUNT + 2; 

const SCROLL_SENSITIVITY = 0.005;
const DRAG_SENSITIVITY = 0.02;

// --- Helper Components ---

// A single page of the book
const Page = ({ 
  index, 
  progress, 
  total 
}: { 
  index: number; 
  progress: MotionValue<number>; 
  total: number; 
}) => {
  // Offset index by 1 because 0-1 is reserved for the Front Cover
  const adjustedIndex = index + 1;

  // Calculate rotation based on progress
  const rotation = useTransform(progress, [adjustedIndex, adjustedIndex + 1], [0, -180]);
  
  // Z-Index handling
  const zIndex = useTransform(rotation, (r) => {
    if (r > -90) {
      return total - index; // Closed stack order (higher index = lower z)
    } else {
      return index; // Open stack order
    }
  });

  // Lighting/Shadow effect
  const brightness = useTransform(
    rotation,
    [0, -90, -180],
    [1, 0.5, 1] 
  );

  return (
    <motion.div
      style={{
        rotateY: rotation,
        zIndex: zIndex,
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        filter: useTransform(brightness, (b) => `brightness(${b})`),
      }}
      className="absolute inset-0 w-full h-full bg-[#FAFAFA] border-l border-gray-200 rounded-r-md shadow-sm origin-left"
    >
      {/* Front of the page */}
      <div 
        className="absolute inset-0 backface-hidden flex items-center justify-center bg-[#FAFAFA] rounded-r-md overflow-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="w-full h-full p-4 flex flex-col gap-3 opacity-10">
             {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="w-full h-1.5 bg-black rounded-full" />
             ))}
        </div>
        <span className="absolute bottom-2 right-2 text-[10px] text-gray-400 font-mono">{index + 1}</span>
      </div>

      {/* Back of the page */}
      <div 
        className="absolute inset-0 backface-hidden flex items-center justify-center bg-[#F0F0F0] rounded-l-md overflow-hidden"
        style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
        }}
      >
         <div className="w-full h-full p-4 flex flex-col gap-3 opacity-10">
             {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="w-full h-1.5 bg-black rounded-full" />
             ))}
        </div>
      </div>
    </motion.div>
  );
};

const FrontCover = ({ 
    progress, 
    total 
}: { 
    progress: MotionValue<number>;
    total: number;
}) => {
    // Front cover rotates first: 0 -> 1
    const rotation = useTransform(progress, [0, 1], [0, -180]);
    
    // Z-index: Always on top when closed
    const zIndex = useTransform(rotation, (r) => (r > -90 ? total + 10 : 0));

    return (
        <motion.div
            style={{
                rotateY: rotation,
                zIndex,
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
            }}
            className="absolute inset-0 w-full h-full bg-[#1A1A1A] rounded-r-lg shadow-2xl origin-left"
        >
            {/* Front Cover Face */}
            <div 
                className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-[#1A1A1A] rounded-r-lg"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="w-20 h-20 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                    <BookIcon size={36} className="text-white/90" />
                </div>
                <h1 className="text-white font-bold tracking-[0.2em] uppercase text-sm">Interaction</h1>
                <div className="w-8 h-0.5 bg-white/20 my-4" />
                <div className="text-white/30 text-[9px] uppercase tracking-widest">Scroll or Drag</div>
            </div>

            {/* Inside Front Cover */}
            <div 
                className="absolute inset-0 backface-hidden bg-[#222] rounded-l-lg"
                style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                }}
            />
        </motion.div>
    );
}

const BackCover = ({
    progress,
    total
}: {
    progress: MotionValue<number>;
    total: number;
}) => {
    // Back cover rotates last: (Total Pages + 1) -> (Total Pages + 2)
    // e.g., if 16 pages, this flips from 17 -> 18
    const startRange = total + 1;
    const endRange = total + 2;
    
    const rotation = useTransform(progress, [startRange, endRange], [0, -180]);
    
    // Z-index logic: 
    // When sitting flat (0deg), it's the bottom-most layer (0).
    // When flipped (-180deg), it should be on top of the stack (zIndex: high).
    const zIndex = useTransform(rotation, (r) => (r < -90 ? total + 10 : 0));

    return (
        <motion.div
            style={{
                rotateY: rotation,
                zIndex,
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
            }}
            className="absolute inset-0 w-full h-full origin-left"
        >
            {/* Inside Back Cover (Visible when reading) */}
            <div 
                className="absolute inset-0 backface-hidden bg-[#111] rounded-r-lg"
                style={{ backfaceVisibility: "hidden" }}
            />

            {/* Outside Back Cover (Visible when closed at the end) */}
            <div 
                className="absolute inset-0 backface-hidden bg-[#1A1A1A] rounded-l-lg flex flex-col items-center justify-center"
                style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                }}
            >
                 <div className="text-white/20 text-[10px] uppercase tracking-widest">The End</div>
            </div>
        </motion.div>
    )
}

export default function Animation16() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const progress = useMotionValue(0);
  
  const smoothProgress = useSpring(progress, {
    stiffness: 200,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001
  });

  const bookRotateZ = useTransform(smoothProgress, [0, TOTAL_STEPS / 2, TOTAL_STEPS], [0, -2, 0]);

  // Mouse Wheel Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = progress.get();
      let newProgress = current + e.deltaY * SCROLL_SENSITIVITY;
      newProgress = Math.max(0, Math.min(newProgress, TOTAL_STEPS));
      progress.set(newProgress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [progress]);

  // Drag Handler
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = progress.get();
    const delta = -info.delta.x * DRAG_SENSITIVITY; 
    let newProgress = current + delta;
    newProgress = Math.max(0, Math.min(newProgress, TOTAL_STEPS));
    progress.set(newProgress);
  };

  return (
    <div 
        ref={containerRef}
        className="flex items-center justify-center min-h-screen bg-[#E5E5E5] overflow-hidden cursor-ew-resize touch-none"
    >
      <div className="relative w-[300px] h-[440px] perspective-[1500px]">
        
        {/* Interaction Layer */}
        <motion.div 
            className="absolute -inset-40 z-50" 
            onPan={handlePan}
            style={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
        />

        {/* The Book */}
        <motion.div
            style={{
                // No 'x' translation here, so it stays centered
                rotateZ: bookRotateZ,
                rotateX: 10,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full pointer-events-none" 
        >
            {/* The Back Cover (Now Animated) */}
            <BackCover progress={smoothProgress} total={PAGE_COUNT} />

            {/* Pages */}
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
                <Page 
                    key={i} 
                    index={i} 
                    progress={smoothProgress} 
                    total={PAGE_COUNT} 
                />
            ))}

            {/* The Front Cover */}
            <FrontCover progress={smoothProgress} total={PAGE_COUNT} />

        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            Scroll or Drag to Flip
        </p>
      </div>
    </div>
  );
}