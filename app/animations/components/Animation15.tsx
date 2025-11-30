"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Plus, Minus, X } from "lucide-react";

// --- Data & Types ---

type ColorOption = {
  name: string;
  hex: string;
  image: string; // URL to the specific colored iPhone
};

// Using the provided images
const colors: ColorOption[] = [
  // 1st Image (Initial State - Orange/Goldish)
  { 
    name: "Cosmic Orange", 
    hex: "#C87545", 
    image: "/Gemini_Generated_Image_vhi99jvhi99jvhi9.jpg" 
  }, 
  // 2nd Image (Blueish)
  { 
    name: "Nebula Blue", 
    hex: "#445C83", 
    image: "/iphone.jpg" 
  }, 
  // 3rd Image (Silver/White)
  { 
    name: "Starlight Silver", 
    hex: "#E3E3E3", 
    image: "/Gemini_Generated_Image_vhi99jvhi99jvhi9 (1).jpg" 
  }, 
];

const features = [
  {
    id: "colors",
    title: "Colors",
    subtitle: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange.",
    hasColorPicker: true,
  },
  {
    id: "aluminum",
    title: "Aluminum Unibody",
    subtitle: "Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
    // Reusing the silver one as a placeholder for other feature slides
    image: "/Gemini_Generated_Image_vhi99jvhi99jvhi9 (1).jpg" 
  },
  {
    id: "vapor",
    title: "Vapor Chamber",
    subtitle: "Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
    image: "/iphone.jpg" 
  }
];

export default function Animation15() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  // Track previous index to determine slide direction
  const [direction, setDirection] = useState(0);

  const handleNavClick = (index: number) => {
    if (index !== activeFeatureIndex) {
        setDirection(index > activeFeatureIndex ? 1 : -1);
        setActiveFeatureIndex(index);
    }
  };

  const handleNext = () => {
    if (activeFeatureIndex < features.length - 1) {
        setDirection(1);
        setActiveFeatureIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeFeatureIndex > 0) {
        setDirection(-1);
        setActiveFeatureIndex(prev => prev - 1);
    }
  };

  const activeFeature = features[activeFeatureIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-sans p-8">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl h-[600px] flex gap-8 relative">
        
        {/* === LEFT: NAVIGATION & CONTROLS === */}
        <div className="flex flex-col justify-center w-1/3 gap-4 z-20">
          
          {features.map((feature, index) => {
            const isActive = index === activeFeatureIndex;
            return (
              <div key={feature.id} className="relative">
                {/* Navigation Item */}
                <motion.div
                  layout
                  onClick={() => handleNavClick(index)}
                  className={`
                    relative overflow-hidden rounded-[24px] cursor-pointer transition-colors duration-300
                    ${isActive ? "bg-[#1C1C1E]" : "bg-transparent hover:bg-[#1C1C1E]/30"}
                  `}
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : "56px",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Header */}
                  <div className="flex items-center h-[56px] px-5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border mr-4 transition-colors ${isActive ? "bg-white text-black border-white" : "border-white/30 text-white"}`}>
                        {isActive ? <Minus size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                    </div>
                    <span className={`text-lg font-medium tracking-wide ${isActive ? "text-white" : "text-white/60"}`}>
                        {feature.title}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  <div className="px-5 pb-6 pl-[60px]">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/70 text-sm leading-relaxed mb-5"
                    >
                        {feature.subtitle}
                    </motion.p>

                    {/* Color Picker (Only for 'colors' slide) */}
                    {feature.hasColorPicker && (
                        <motion.div 
                            className="flex gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {colors.map((color, i) => (
                                <button
                                    key={color.name}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering nav click
                                        setSelectedColorIndex(i);
                                    }}
                                    className={`w-8 h-8 rounded-full border-2 transition-all relative ${selectedColorIndex === i ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                >
                                    {/* Active Ring */}
                                    {selectedColorIndex === i && (
                                        <motion.div 
                                            layoutId="active-color-ring"
                                            className="absolute -inset-1 rounded-full border border-white/50"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Floating Navigation Arrows */}
          <div className="flex gap-2 mt-4 ml-2">
             <button 
                onClick={handlePrev}
                disabled={activeFeatureIndex === 0}
                className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center text-white/80 hover:bg-[#2C2C2E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
             >
                <ChevronUp size={20} />
             </button>
             <button 
                onClick={handleNext}
                disabled={activeFeatureIndex === features.length - 1}
                className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center text-white/80 hover:bg-[#2C2C2E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
             >
                <ChevronDown size={20} />
             </button>
          </div>

        </div>

        {/* === RIGHT: IMAGE PREVIEW AREA === */}
        <div 
            className="flex-1 relative rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl cursor-pointer"
            onClick={handleNext} // Clicking the slide advances to next feature
        >
            {/* Close Icon (Cosmetic) */}
            <div className="absolute top-6 right-6 z-30 w-8 h-8 bg-[#1C1C1E] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2C2C2E] transition-colors">
                <X size={16} className="text-white/60" />
            </div>

            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                    key={activeFeature.id} 
                    custom={direction}
                    className="absolute inset-0 flex items-center justify-center p-12"
                    // Slide In from Right (100%), Slide Out to Left (-50% + Fade)
                    initial={{ x: "100%", opacity: 0, scale: 0.9 }} 
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: "-20%", opacity: 0, scale: 0.95 }} 
                    transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1
                    }}
                >
                    {/* Inner Image Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {activeFeature.hasColorPicker ? (
                            // For Color Picker Slide: Animate color changes with a crossfade
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={selectedColorIndex} // Trigger animation on color change
                                    src={colors[selectedColorIndex].image}
                                    alt="iPhone Color"
                                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                        ) : (
                            // For Standard Slides: Static image content
                            <img 
                                src={activeFeature.image}
                                alt={activeFeature.title}
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
        </div>

      </div>
    </div>
  );
}