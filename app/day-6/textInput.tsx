"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Zap,
  ImageIcon,
  CirclePlay,
  Mic,
  ArrowUp,
  Globe,
} from "lucide-react";

function Header({ onClose }: { onClose: () => void }) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-6 left-5 p-0.5 bg-gray-200 rounded-sm text-black hover:bg-gray-300 transition"
      >
        <X size={18} />
      </button>
      <span className="absolute top-6 right-5 text-gray-800 text-sm font-bold">
        Drafts
      </span>
    </>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="flex flex-wrap gap-1"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
          className="text-gray-800 text-base font-normal leading-relaxed"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function TextInput() {
  const [step, setStep] = useState<"button" | "draft" | "submitted">("button");
  const [mediaType, setMediaType] = useState<"image" | "video">("video");
  const [isTyping, setIsTyping] = useState(false);

  const handleMouseMove = () => {
    if (isTyping) setIsTyping(false);
  };

  return (
    <div
      className="flex justify-center items-center h-[100dvh] w-full bg-gray-200"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="popLayout">
        {step === "button" && (
          <motion.div
            key="globe"
            layoutId="popLayout"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="border rounded-full p-2 shadow-lg bg-white cursor-pointer"
            onClick={() => setStep("draft")}
          >
            <Globe size={24} />
          </motion.div>
        )}

        {step === "draft" && (
          <motion.div
            key="draft"
            layoutId="popLayout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[400px] bg-white rounded-2xl shadow-lg p-4"
          >
            <Header onClose={() => setStep("button")} />

            <textarea
              placeholder="Write whats on your mind ..."
              className="w-full min-h-[200px] border-none outline-none resize-none text-gray-800 text-base font-normal pt-6 ml-1 my-4"
              rows={3}
              onChange={(e) => setIsTyping(e.target.value.length > 0)}
            />

            <div className="flex justify-between items-center border rounded-lg bg-gray-200 p-1 mt-3">
              <div className="flex gap-2">
                <button className="w-10 aspect-square flex items-center justify-center rounded-lg bg-gray-100 all-sides-shadow">
                  <Plus size={22} />
                </button>
                <button className="w-10 aspect-square flex items-center justify-center rounded-lg bg-gray-100 all-sides-shadow">
                  <Zap size={20} />
                </button>

                <div className="relative flex all-sides-shadow bg-gray-100 rounded-lg overflow-hidden w-36 h-10">
                  <motion.div
                    layoutId="media-toggle"
                    transition={{ bounce: 0, duration: 0.45 }}
                    className={`absolute top-1 bottom-1 left-1 right-1 w-[calc(50%-4px)] rounded-md bg-gray-300 ${
                      mediaType === "image" ? "left-1" : "left-[calc(50%+1px)]"
                    }`}
                  />
                  <button
                    onClick={() => setMediaType("image")}
                    className={`relative z-10 flex items-center gap-1 w-1/2 justify-center text-sm transition-colors ${
                      mediaType === "image" ? "text-black" : "text-gray-500"
                    }`}
                  >
                    <ImageIcon size={18} />
                    Image
                  </button>
                  <button
                    onClick={() => setMediaType("video")}
                    className={`relative z-10 flex items-center gap-1 w-1/2 justify-center text-sm transition-colors ${
                      mediaType === "video" ? "text-black" : "text-gray-500"
                    }`}
                  >
                    <CirclePlay size={18} />
                    Video
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2">
                  <Mic size={18} />
                </button>
                <button
                  onClick={() => setStep("submitted")}
                  className="w-10 aspect-square flex items-center justify-center rounded-lg text-white bg-gray-900 all-sides-shadow"
                >
                  <ArrowUp size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "submitted" && (
          <motion.div
            key="submitted"
            layoutId="popLayout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[400px] bg-white rounded-2xl shadow-lg p-4"
          >
            <Header onClose={() => setStep("button")} />
            <div className="pt-6 ml-1 my-6 w-full">
              <WordReveal text="This is a static placeholder. No action was taken." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
