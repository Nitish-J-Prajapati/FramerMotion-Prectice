"use client";
import { motion } from "framer-motion";

export default function Animation3() {
  return (
    <motion.div className="w-40 h-40 bg-green-500 rounded-xl"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    />
  );
}
