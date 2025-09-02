"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download,
    Copy,
    Code,
    MoreHorizontal,
    Share2,
    Info,
    ArrowLeft,
    X,
} from "lucide-react";

export default function MenuInfo() {
    const [step, setStep] = useState(1);
    const [showInfoPanel, setShowInfoPanel] = useState(false);

    return (
        <div className="flex justify-center items-center h-[100dvh] w-full bg-[#2e5363]">
            <div className="flex relative flex-col items-center justify-center border border-transparent rounded-2xl h-1/2 w-1/2 p-6 shadow-2xl bg-[#101e1f]"
                onClick={() => {
                    if (step === 2) setStep(1); // ✅ click background → reset to step 1
                }}
            >

                {/* ✅ Shared bottom container */}
                <div className="absolute bottom-6">
                    <AnimatePresence mode="wait">
                        {!showInfoPanel && (
                            <motion.div
                                key="menu"
                                layoutId="menu"  // shared with info panel
                                className="flex items-center border border-gray-500/50 rounded-full px-4 py-2 shadow-2xl text-white bg-black"
                            >
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                        exit={{
                                            filter: "blur(6px)",
                                            opacity: 0,
                                            transition: { duration: 0.3 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Install Theme */}
                                        <button className="flex items-center p-2 gap-2 rounded-full hover:bg-[#012c3e] transition">
                                            <Download size={18} />
                                            <span>Install Theme</span>
                                        </button>

                                        <span className="text-gray-500">|</span>

                                        <button className="p-3 rounded-full hover:bg-[#012c3e] transition">
                                            <Copy size={18} />
                                        </button>
                                        <button className="p-3 rounded-full hover:bg-[#012c3e] transition">
                                            <Code size={18} />
                                        </button>
                                        <button
                                            onClick={() => setStep(2)}
                                            className="p-3 rounded-full hover:bg-[#012c3e] transition"
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                        exit={{
                                            filter: "blur(6px)",
                                            opacity: 0,
                                            transition: { duration: 0.3 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button
                                            onClick={() => setStep(1)}
                                            className="p-3 rounded-full hover:bg-[#012c3e] transition"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>

                                        <span className="text-gray-500">|</span>

                                        <button className="flex items-center p-2 gap-2 rounded-full hover:bg-[#012c3e] transition">
                                            <Share2 size={18} />
                                            <span>Share</span>
                                        </button>

                                        <button
                                            onClick={() => setShowInfoPanel(true)}
                                            className="flex items-center p-2 gap-2 rounded-full hover:bg-[#012c3e] transition"
                                        >
                                            <Info size={18} />
                                            <span>Info</span>
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ✅ Info Panel (morphs both open and close) */}
                    <AnimatePresence mode="popLayout">
                        {showInfoPanel && (
                            <motion.div
                                key="infoPanel"
                                layoutId="menu"  // same ID as menu
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}  // 👈 keep this but light (so it fades + morphs)
                                transition={{ duration: 0.4 }}
                                className="rounded-2xl shadow-2xl bg-black text-white p-6 relative w-[400px]"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setShowInfoPanel(false);
                                        setStep(1); // back to step 1
                                    }}
                                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-[#012c3e] transition"
                                >
                                    <X size={16} />
                                </button>

                                <h2 className="text-xl font-bold mb-2">VS Code</h2>
                                <p className="text-gray-400 text-center mb-4">
                                    The most popular code editor with extensive theme support
                                </p>

                                {/* Tags */}
                                <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] text-sm">editor</span>
                                    <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] text-sm">editor</span>
                                    <span className="px-3 py-1 rounded-lg bg-[#1a1a1a] text-sm">microsoft</span>
                                </div>

                                {/* Format + Size */}
                                <div className="w-full flex justify-between text-gray-400">
                                    <span>
                                        Format: <span className="text-white">.json</span>
                                    </span>
                                    <span>
                                        Size: <span className="text-white">40KB</span>
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
