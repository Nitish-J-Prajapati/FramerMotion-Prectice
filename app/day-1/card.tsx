"use client";

import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type MotionCSSVars = TargetAndTransition & {
    [key: `--${string}`]: string | number;
};

export default function CardAnimation() {
    const [showPremium, setShowPremium] = useState(false);

    const listVariants = {
        initial: { opacity: 0, y: 25 },
        animate: {
            opacity: 1,
            y: 0,
        },
        exit: { opacity: 0, y: -25 },
    };

    return (
        <div className="flex gap-6 bg-gray-100 justify-center items-center h-[100dvh] w-full">
            <motion.div
                animate={{ borderColor: showPremium ? "#be185d" : "#d1d5db" }}
                transition={{ duration: 0.3 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    border: "1px solid", 
                    paddingLeft: "1.5rem", 
                    paddingRight: "1.5rem",
                    paddingBottom: "1.5rem", 
                    gap: "8rem",
                    borderRadius: "48px",
                }}
            >
                <div className="relative w-full">
                    <AnimatePresence
                        mode="wait"
                        custom={showPremium ? 1 : -1}
                        initial={false}
                    >
                        {showPremium ? (
                            <motion.div
                                key="premium-plan"
                                initial={{ "--mask": "radial-gradient(circle at top left, black 0%, transparent 50%)" } as MotionCSSVars}
                                animate={{ "--mask": "radial-gradient(circle at top left, black 100%, transparent 100%)" } as MotionCSSVars}
                                exit={{ "--mask": "radial-gradient(circle at bottom right, black 0%, transparent 50%)" } as MotionCSSVars}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                style={{
                                    WebkitMaskImage: "var(--mask)",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                    WebkitMaskSize: "200% 200%",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "#be185d",
                                    width: "12rem",
                                    height: "12rem",
                                    borderRadius: "50%",
                                    zIndex: 50,
                                }}
                            />
                        ) : (
                            <motion.div
                                key="free-plan"
                                initial={{ "--mask": "radial-gradient(circle at bottom right, black 0%, transparent 50%)" } as MotionCSSVars}
                                animate={{ "--mask": "radial-gradient(circle at bottom right, black 100%, transparent 100%)" } as MotionCSSVars}
                                exit={{ "--mask": "radial-gradient(circle at top left, black 0%, transparent 50%)" } as MotionCSSVars}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                style={{
                                    WebkitMaskImage: "var(--mask)",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                    WebkitMaskSize: "200% 200%",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "#6b7280",
                                    width: "12rem",
                                    height: "12rem",
                                    borderRadius: "50%",
                                    zIndex: 50,
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="content flex flex-col gap-6 items-center">
                    <h1
                        className="font-bold text-3xl"
                        style={{ filter: "contrast(200) blur(0.2px)" }}
                    >
                        <AnimatePresence mode="wait">
                            {showPremium ? (
                                <motion.span
                                    key="Premium-text"
                                    initial={{ opacity: 0.4, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0.4, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4 }}
                                >
                                    Premium Plan
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="Free-text"
                                    initial={{ opacity: 0.4, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0.4, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4 }}
                                >
                                    Free Plan
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </h1>

                    <div className="flex flex-col w-[22rem] text-lg">
                        <div className="flex font-semibold">
                            <motion.span layoutId="price1">$</motion.span>
                            {/* <motion.div
                                layout
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            > */}
                                <AnimatePresence mode="popLayout">
                                {showPremium ? (
                                    <motion.span
                                        key="12"
                                        initial={{ y: 5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -5, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        12
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="0"
                                        initial={{ y: 5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -5, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        0
                                    </motion.span>
                                )}
                                </AnimatePresence>
                            {/* </motion.div> */}
                            <motion.span layoutId="price">/month</motion.span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.ul
                                key={showPremium ? "premium-list" : "free-list"}
                                variants={listVariants}
                                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{
                                    listStyleType: "disc",
                                    width: "100%",
                                    paddingLeft: "3rem",
                                    paddingRight: "3rem",
                                }}
                            >
                                {showPremium ? (
                                    <>
                                        <li>Everything is Free, plus:</li>
                                        <li>Unlimited tasks & projects</li>
                                        <li>100GB cloud storage</li>
                                    </>
                                ) : (
                                    <>
                                        <li>Basic access to core features</li>
                                        <li>Limited cloud storage (5GB)</li>
                                        <li>10 task/projects per month</li>
                                    </>
                                )}
                            </motion.ul>
                        </AnimatePresence>
                    </div>

                    <motion.button
                        animate={{ backgroundColor: showPremium ? "#8d19e0" : "#111111" }}
                        transition={{ duration: 0.3 }}
                        style={{
                            color: "white",
                            fontSize: "1.125rem",
                            borderRadius: "999px",
                            width: "100%",
                            padding: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        {/* <motion.div
                            layout
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                                width: "fit-content",
                            }}
                        > */}
                            <AnimatePresence mode="popLayout">
                            {showPremium ? (
                                <motion.span
                                    key="upgrade"
                                    initial={{ opacity: 0, transition: { duration: 0.3 } }}
                                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Upgrade
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="start"
                                    initial={{ opacity: 0, transition: { duration: 0.3 } }}
                                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Start
                                </motion.span>
                            )}
                            </AnimatePresence>
                        {/* </motion.div> */}
                        <motion.span layoutId="cta-text">&nbsp;Now</motion.span>
                    </motion.button>
                </div>
            </motion.div>

            <div onClick={() => setShowPremium((prev) => !prev)}>
                <ArrowRight />
            </div>
        </div>
    );
}