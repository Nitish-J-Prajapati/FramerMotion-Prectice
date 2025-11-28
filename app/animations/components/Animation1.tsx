"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility to merge classNames
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ---- Icons ----

const ArrowUpRight03Icon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-5 h-5", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const NavLogo = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <svg
    onClick={onClick}
    className={cn("w-10 h-10 cursor-pointer", className)}
    viewBox="0 0 24 24"
    fill="white"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l2 2 4-4" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ---- Sub-Components ----

interface HoverPosition {
  left: number;
  width: number;
  height: number;
}

const NavLinkItem = ({
  href,
  label,
  isLast,
  onHover,
}: {
  href: string;
  label: string;
  isLast: boolean;
  onHover: (position: HoverPosition | null) => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleHover = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const parentRect = ref.current
        .closest(".nav-items-container")
        ?.getBoundingClientRect();
      if (parentRect) {
        onHover({
          left: rect.left - parentRect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  };

  return (
    <div className="flex items-center shrink-0">
      <a
        ref={ref}
        href={href}
        className="hover:text-blue-200 text-white transition-colors duration-300 whitespace-nowrap px-4 py-2 relative text-base z-20 block"
        onMouseEnter={handleHover}
        onMouseLeave={() => onHover(null)}
      >
        {label}
      </a>
      {!isLast && (
        <span className="text-blue-50/40 font-bold mx-2 shrink-0">·</span>
      )}
    </div>
  );
};

const CTAButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#contact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex items-center justify-center",
        "transition-all duration-300",
        "relative overflow-hidden rounded-full",
        "bg-gradient-to-b from-white to-[#cbebff]",
        "shadow-[0_8px_32px_rgba(17,17,26,0.1),0_2px_16px_rgba(17,17,26,0.05)]",
        "hover:shadow-[0_0_20px_rgba(203,235,255,0.5),0_8px_32px_rgba(17,17,26,0.1)]",
        "hover:bg-gradient-to-b hover:from-white hover:to-[#b5e1ff]",
        "active:shadow-[inset_0_2px_4px_rgba(17,17,26,0.1)]",
        "border border-transparent hover:border-[#b5e1ff]"
      )}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
        opacity-0 hover:opacity-20 transition-opacity duration-700 
        -translate-x-full hover:translate-x-full"
      />
      <div className="flex items-center justify-center space-x-2 px-8 py-4 relative z-10 group">
        <span className="font-extrabold whitespace-nowrap text-base text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
          Let&apos;s Create
        </span>
        <motion.div
          animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <ArrowUpRight03Icon className="text-gray-800 group-hover:text-gray-900" />
        </motion.div>
      </div>
    </a>
  );
};

// ---- Main Navbar Component (Fixed) ----

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<HoverPosition | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#", label: "Portfolio" },
    { href: "#", label: "About" },
  ];

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-center pt-10 z-50">
      <motion.div
        layout
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.6,
        }}
        className="flex items-center overflow-hidden bg-[#201f1fd1] rounded-full"
        style={{
          padding: isScrolled ? "8px" : "0px",
          boxShadow:
            "0 .5px .5px #ffffff29 inset,0 0 0 1px #000000c4,0 41px 17px #00000008,0 23px 14px #0000001a,0 10px 10px #0000002b,0 3px 6px #00000030",
        }}
      >
        <AnimatePresence mode="popLayout">
          {isScrolled && (
            <motion.div
              key="navbar-content"
              className="flex items-center overflow-hidden"
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{
                opacity: 1,
                width: "auto",
                x: 0,
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.6,
                },
              }}
              // FIXED: Exit transition now perfectly matches the layout transition
              exit={{
                opacity: 0,
                width: 0,
                x: -20,
                transition: {
                  type: "spring", // Changed from 'ease' to 'spring'
                  bounce: 0,      // Matches parent
                  duration: 0.6,  // Matches parent
                },
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  minWidth: "2.5rem", 
                  flexShrink: 0,
                }}
              >
                <NavLogo className="ml-6" onClick={scrollToTop} />
              </div>

              <div 
                className="hidden md:flex items-center text-white shrink-0"
                style={{ minWidth: "fit-content" }} 
              >
                <div className="h-8 w-px bg-blue-50/20 mx-4" />
                <div className="nav-items-container relative">
                  <AnimatePresence>
                    {hoverPosition && (
                      <motion.div
                        className="absolute rounded-full z-10"
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          top: 0,
                          left: hoverPosition.left,
                          width: hoverPosition.width,
                          height: hoverPosition.height,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.15,
                          type: "spring",
                          bounce: 0,
                        }}
                        layoutId="hover-container"
                      />
                    )}
                  </AnimatePresence>
                  <div className="flex items-center relative z-20">
                    {navItems.map((item, index) => (
                      <NavLinkItem
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        isLast={index === navItems.length - 1}
                        onHover={setHoverPosition}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-8 w-px bg-blue-50/20 mx-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout="position"
          layoutId="cta-button"
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
          style={{ width: "12rem", flexShrink: 0 }}
        >
          <CTAButton />
        </motion.div>
      </motion.div>
    </div>
  );
};

// ---- Page Export ----

export default function Day7() {
  return (
    <div className="min-h-[200vh] bg-gradient-to-b from-[#0b0b0c] to-[#101014] text-white flex flex-col items-center">
      <Navbar />
      <div className="mt-40 text-center">
        <h1 className="text-4xl font-bold">Scroll Down to See Animation</h1>
      </div>
    </div>
  );
}