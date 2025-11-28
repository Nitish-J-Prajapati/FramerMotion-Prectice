"use client"

import { EllipsisVertical, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { style } from "framer-motion/client"

export default function Menu() {
  const [open, setOpen] = useState(false)

  const menuVariants: Variants = {
    closed: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      transition: { type: "spring", duration: 0.6, bounce: 0 },
    },
    open: {
      width: "90%",
      height: "auto",
      borderRadius: "16px",
      transition: { type: "spring", duration: 0.6, bounce: 0 },
    },
  }
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 },
    },
  }

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full bg-white">
      {/* Card on desktop, full bg on mobile */}
      <div
        className="relative flex flex-col justify-center items-center w-full h-full 
                   md:w-[60%] md:h-[80%] md:rounded-2xl md:shadow-lg 
                   bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      >
        <h1 className="text-2xl mb-4 text-white drop-shadow md:text-white md:drop-shadow-none">
          Day 2: Expanding Menu
        </h1>
        <p className="mb-6 text-white drop-shadow md:text-white md:drop-shadow-none">
          This page showcases a smoother expanding menu.
        </p>

        {/* Expanding container */}
        <motion.div
          className="absolute top-6 right-6 bg-gray-300/80 shadow-lg overflow-hidden md:w-1/2" 
          variants={menuVariants}
          animate={open ? "open" : "closed"}
          initial="closed"
          style={{ transformOrigin: "top right" }}
        >
          {/* Toggle buttons */}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.button
                key="close-btn"
                onClick={() => setOpen(false)}
                className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 z-50 rounded-full text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X />
              </motion.button>
            ) : (
              <motion.button
                key="menu-btn"
                onClick={() => setOpen(true)}
                className="absolute top-1 right-1 flex items-center justify-center w-8 h-8 rounded-full text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <EllipsisVertical />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Show content when open */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="menu-content"
                className="relative w-full h-full p-8 flex flex-col"
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <motion.ul
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  className="flex flex-col gap-2 text-2xl mt-6 text-black"
                >
                  {["Home", "Settings", "Help"].map((item) => (
                    <motion.li
                      key={item}
                      variants={contentVariants}
                      className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
