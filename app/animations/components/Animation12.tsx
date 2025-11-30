"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { MoreHorizontal, Undo2 } from "lucide-react";
import Image from "next/image";

// --- Configuration ---
// Change this value to 0 if you want to see the "glow" image clearly without blur.
const BLUR_AMOUNT = 40;

type CardItem = {
  id: string;
  title: string;
  image: string;
  description: string;
};

const cards: CardItem[] = [
  {
    id: "beeper",
    title: "Beeper",
    image: "https://assets.codepen.io/605876/beeper.png",
    description: "Universal chat app",
  },
  {
    id: "discord",
    title: "Discord",
    image: "https://assets.codepen.io/605876/discord.png",
    description: "Talk, chat, and hang out",
  },
  {
    id: "spotify",
    title: "Spotify",
    image: "https://assets.codepen.io/605876/spotify.png",
    description: "Music for everyone",
  },
  {
    id: "photos",
    title: "Photos",
    image: "https://assets.codepen.io/605876/photos.png",
    description: "Relive your memories",
  },
];

const Card = ({ item }: { item: CardItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // We use springs for smoother movement than raw mouse values
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  // Track mouse globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center
      const relativeX = e.clientX - centerX;
      const relativeY = e.clientY - centerY;

      // Normalize values
      const xPct = relativeX / (rect.width / 2);
      const yPct = relativeY / (rect.height / 2);

      x.set(xPct);
      y.set(yPct);
    };

    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, [x, y]);

  // Transform for the moving glow layer
  const xMove = useMotionTemplate`calc(${x} * 40%)`;
  const yMove = useMotionTemplate`calc(${y} * 40%)`;

  return (
    <div
      className="relative w-[300px] aspect-[4/3] group cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ================= FRONT FACE ================= */}
        <div
          className="absolute inset-0 bg-[#111] rounded-2xl overflow-hidden border border-white/10 isolate"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* 1. MOVING GLOW LAYER (Front) */}
          <motion.div
            style={{
              x: xMove,
              y: yMove,
              opacity: useMotionTemplate`${useSpring(1, { stiffness: 50, damping: 20 })}`,
            }}
            className="absolute inset-0 grid place-items-center pointer-events-none"
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src={item.image}
                alt=""
                width={120}
                height={120}
                className="object-contain"
                style={{
                  filter: `blur(${BLUR_AMOUNT}px) saturate(2) brightness(1.2)`,
                  transform: "scale(2.5)",
                }}
              />
            </div>
          </motion.div>

          {/* 2. STATIC CONTENT LAYER (Front) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
            <button className="absolute top-3 right-3 text-white/20 hover:text-white transition-colors">
              <MoreHorizontal size={24} />
            </button>

            <div className="relative w-[100px] h-[100px] z-20">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <h2 className="text-white font-medium text-lg z-20">
              {item.title}
            </h2>
          </div>

          {/* 3. BORDER GLOW (Front) */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-30"
            style={{
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
            }}
          />
        </div>

        {/* ================= BACK FACE ================= */}
        <div
          className="absolute inset-0 bg-[#111] rounded-2xl overflow-hidden border border-white/10 isolate flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 1. MOVING GLOW LAYER (Back - reused for continuity) */}
          <motion.div
            style={{
              x: xMove,
              y: yMove,
              opacity: useMotionTemplate`${useSpring(0.6, { stiffness: 50, damping: 20 })}`, // Slightly dimmer on back
            }}
            className="absolute inset-0 grid place-items-center pointer-events-none"
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src={item.image}
                alt=""
                width={120}
                height={120}
                className="object-contain"
                style={{
                  filter: `blur(${BLUR_AMOUNT}px) saturate(1.5) brightness(0.8)`,
                  transform: "scale(3)", // Larger spread on back
                }}
              />
            </div>
          </motion.div>

          {/* 2. CONTENT (Back) */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="p-3 bg-white/5 rounded-full backdrop-blur-md mb-1">
               <Undo2 size={20} className="text-white/50" />
            </div>
            
            <h3 className="text-white text-xl font-semibold tracking-tight">
              This is {item.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
          
          {/* 3. BORDER GLOW (Back) */}
           <div
            className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-30"
            style={{
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function Animation12() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#050505] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>

      <p className="text-neutral-500 text-sm font-mono mt-12">
        Click card to flip • Move cursor to glow
      </p>
    </div>
  );
}