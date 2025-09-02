
"use client"

import { Button } from "@/components/ui/button";
import { EllipsisVertical, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu() {
    const [open, setOpen] = useState(false);

    const listVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="flex justify-center items-center h-[100dvh] w-full">
            <div className="relative flex flex-col justify-center items-center border rounded-2xl bg-blue-100 w-[60%] h-[80%] text-lg font-medium">
                <h1 className="text-2xl mb-4">Day 2: Enhanced UI</h1>
                <p className="mb-6">This page showcases a more polished UI with additional features.</p>

                <Button
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-label="Open menu"
                    className="absolute top-2 right-2 rounded-full m-2 bg-transparent text-black hover:bg-gray-300 transition-colors"
                >
                    <EllipsisVertical />
                </Button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            style={{ transformOrigin: "top right" }}
                            className="absolute top-2 right-2 w-[50%] h-[80%] rounded-md bg-gray-300/50 p-8 z-10 flex flex-col shadow-md"
                        >
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close menu"
                                className="absolute top-4 right-4 rounded-full text-black transition-colors"
                            >
                                <X />
                            </button>

                            <motion.ul
                                variants={listVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-2 text-2xl mt-8"
                            >
                                <motion.li
                                    variants={itemVariants}
                                    className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
                                >
                                    Home
                                </motion.li>
                                <motion.li
                                    variants={itemVariants}
                                    className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
                                >
                                    Settings
                                </motion.li>
                                <motion.li
                                    variants={itemVariants}
                                    className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
                                >
                                    Help
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
