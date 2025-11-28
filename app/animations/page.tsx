"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { animationsList } from "./data";

export default function AnimationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl">
        {animationsList.map((anim) => (
          <motion.div key={anim.slug} whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="p-2 rounded">
            <Button className="w-40" onClick={() => router.push(`/animations/${anim.slug}`)}>
              {anim.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
