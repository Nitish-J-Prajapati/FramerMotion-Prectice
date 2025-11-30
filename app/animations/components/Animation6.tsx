"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// =========================================================
// 1. TODO LIST COMPONENT
// =========================================================

const initialTodos = [
  { id: 1, text: "Content planning", checked: true },
  { id: 2, text: "Budgeting", checked: true },
  { id: 3, text: "Tidy up", checked: false },
  { id: 4, text: "Emails", checked: false },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <div className="w-[340px] bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col gap-2">
      {todos.map((todo) => (
        <motion.div
          key={todo.id}
          layout
          initial={false}
          onClick={() => toggleTodo(todo.id)}
          className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors hover:bg-gray-50 group"
        >
          {/* Animated Checkbox Container */}
          <motion.div
            className={`
              relative flex items-center justify-center w-8 h-8 rounded-md border-2 transition-colors duration-300
              ${
                todo.checked
                  ? "bg-emerald-400 border-emerald-400"
                  : "bg-gray-100 border-transparent group-hover:border-emerald-200"
              }
            `}
          >
            <AnimatePresence>
              {todo.checked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: [0, -15, 15, -10, 10, 0] // 🟢 Shake Animation
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "backOut",
                    rotate: { duration: 0.5, ease: "linear" } 
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white pointer-events-none"
                    style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                  >
                    <motion.path
                      d="M20 6L9 17l-5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }} // Slight delay for the shake to start first
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Text with Animated Strikethrough */}
          <div className="relative">
            <span
              className={`text-lg font-medium transition-colors duration-300 ${
                todo.checked ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>

            {/* The Strikethrough Line */}
            <motion.div
              initial={false}
              animate={{ width: todo.checked ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 h-[2px] bg-gray-300 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// =========================================================
// 2. ANIMATED SUBMIT BUTTON COMPONENT
// =========================================================

function SubmitButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = () => {
    if (status !== "idle") return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 2500);
    }, 2000);
  };

  return (
    <div className="h-40 flex items-center justify-center">
      <motion.button
        layout
        onClick={handleClick}
        className={`
          relative flex items-center justify-center rounded-full border-2 text-lg font-medium overflow-hidden
          ${
            status === "success"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-50"
          }
        `}
        style={{
          minWidth: status === "loading" ? "60px" : "180px",
          height: "60px",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {status === "idle" && (
            <motion.span
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              Submit
            </motion.span>
          )}

          {status === "loading" && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="animate-spin w-6 h-6" />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Checkmark SVG for Button */}
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white"
                style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// =========================================================
// MAIN EXPORT
// =========================================================

export default function Animation6() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center gap-16 py-20 font-sans">
      {/* 1. List is now ABOVE */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
          Interactive List
        </h2>
        <TodoList />
      </section>

      {/* 2. Button is now BELOW */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
          Animated Button
        </h2>
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-200 w-[400px] h-[300px] flex items-center justify-center">
          <SubmitButton />
        </div>
      </section>
    </div>
  );
}