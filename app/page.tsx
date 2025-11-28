"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center h-[100dvh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl">

        {/* 🔥 NEW: Animations Button */}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 rounded col-span-3 flex justify-center"
        >
          <Button className="w-40" onClick={() => router.push("/animations")}>
            Animations
          </Button>
        </motion.div>

        {/* Days */}
        {["Day-1", "Day-2", "Day-3", "Day-4", "Day-5", "Day-6"].map(
          (day, index) => (
            <motion.div
              key={day}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 rounded"
            >
              <Button
                className="w-32"
                onClick={() => router.push(`/day-${index + 1}`)}
              >
                {day}
              </Button>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
