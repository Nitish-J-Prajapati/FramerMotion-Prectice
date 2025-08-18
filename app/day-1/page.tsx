"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Day1() {
  const [showPremium, setShowPremium] = useState(false);

  const handleToggle = () => {
    setShowPremium((prev) => !prev);
  };

  const blurFadeVariants = {
    initial: { opacity: 0, filter: "blur(1px)" },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { opacity: { duration: 0.15 }, filter: { duration: 0.4 } },
    },
    exit: {
      opacity: 0,
      filter: "blur(1px)",
      transition: {
        filter: { duration: 0.4 },
        opacity: { duration: 0.15, delay: 0.3 },
      },
    },
  };

  const imageVariants: Variants = {
    initial: (direction: number) => ({
      x: direction * 30,
      opacity: 0,
      filter: "blur(6px)",
    }),
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 120, damping: 20 },
        opacity: { duration: 0.5, ease: "easeInOut" },
        filter: { duration: 0.5, ease: "easeInOut" },
      },
    },
    exit: (direction: number) => ({
      x: direction * -30,
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        x: { type: "spring", stiffness: 120, damping: 20 },
        opacity: { duration: 0.4, ease: "easeInOut" },
        filter: { duration: 0.4, ease: "easeInOut" },
      },
    }),
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-amber-300 w-[60%] h-[80%] justify-center text-lg font-medium">
        <Card className="p-6 flex flex-col items-center">
          <div className="h-30 w-30">
            <AnimatePresence mode="wait" custom={showPremium ? 1 : -1}>
              {!showPremium ? (
                <motion.img
                  key="normal-img"
                  variants={imageVariants}
                  custom={-1}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-30 w-30 rounded-full"
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Normal Plan"
                />
              ) : (
                <motion.img
                  key="premium-img"
                  variants={imageVariants}
                  custom={1}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-30 w-30 rounded-full"
                  src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Premium Plan"
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {!showPremium ? (
              <motion.span
                key="normal-text"
                variants={blurFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-2"
              >
                Normal Plan
              </motion.span>
            ) : (
              <motion.span
                key="premium-text"
                variants={blurFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-2"
              >
                Premium Plan
              </motion.span>
            )}
          </AnimatePresence>
        </Card>

        <Button onClick={handleToggle} className="mt-4">
          <AnimatePresence mode="wait">
            {!showPremium ? (
              <motion.div
                key="arrow-right"
                variants={blurFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ArrowRight />
              </motion.div>
            ) : (
              <motion.div
                key="arrow-left"
                variants={blurFadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ArrowLeft />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <div className="bg-amber-300 mt-4 w-[60%] h-20 flex justify-center items-center text-lg font-medium">
        Hello world 1
      </div>
    </div>
  );
}
