"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Undo2 } from "lucide-react";

export default function Animation2() {
  const [state, setState] = useState<"none" | "like" | "dislike">("none");

  const isLike = state === "like";
  const isDislike = state === "dislike";

  const baseButton = "bg-[#F3EEE7] h-20 flex items-center justify-center rounded-full cursor-pointer";

  // Variants to handle the "ghost" state of the inactive button
  // Hidden buttons stay in the layout (no display:none) but are invisible and unclickable
  const buttonVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className="flex h-[100dvh] justify-center items-center gap-6">

      {/* LIKE BUTTON */}
      <motion.div
        key="like"
        layout
        variants={buttonVariants}
        initial="visible"
        animate={isDislike ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        // When hidden, we disable pointer events so it can't be clicked
        className={`${baseButton} ${isLike ? "px-6" : "w-28"} ${isDislike ? "pointer-events-none" : ""}`}
        onClick={() => state === "none" && setState("like")}
      >
        <motion.div layout className="flex items-center gap-3 overflow-hidden">
          <motion.div layout>
            <ThumbsUp size={28} strokeWidth={2.5} />
          </motion.div>

          <AnimatePresence mode="popLayout">
            {isLike && (
              <motion.div
                key="like-text"
                layout
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span className="font-medium text-lg">Feedback Received!</span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setState("none");
                  }}
                  className="px-4 py-2 bg-white/70 rounded-full flex items-center gap-1"
                >
                  <Undo2 size={20} />
                  Undo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* DISLIKE BUTTON */}
      <motion.div
        key="dislike"
        layout
        variants={buttonVariants}
        initial="visible"
        animate={isLike ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className={`${baseButton} ${isDislike ? "px-6" : "w-28"} ${isLike ? "pointer-events-none" : ""}`}
        onClick={() => state === "none" && setState("dislike")}
      >
        <motion.div layout className="flex items-center gap-3 overflow-hidden">
          <motion.div layout>
            <ThumbsDown size={28} strokeWidth={2.5} />
          </motion.div>

          <AnimatePresence mode="popLayout">
            {isDislike && (
              <motion.div
                key="dislike-text"
                layout
                initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span className="font-medium text-lg">Feedback Received!</span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setState("none");
                  }}
                  className="px-4 py-2 bg-white/70 rounded-full flex items-center gap-1"
                >
                  <Undo2 size={20} />
                  Undo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

    </div>
  );
}