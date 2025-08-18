"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function Page() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        className="p-4 rounded"
      >
        <Button onClick={() => router.push("/day-1")}>Day-1</Button>
      </motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        className="p-4 rounded"
      >
        <Button onClick={() => router.push("/day-2")}>Day-2</Button>
      </motion.div>
    </div>
  );
}
