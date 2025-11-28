"use client";

import { useParams } from "next/navigation";
import type { ComponentType } from "react";
import { animationsList } from "../data";
import Animation1 from "../components/Animation1";
import Animation2 from "../components/Animation2";
import Animation3 from "../components/Animation3";

const componentsMap: Record<string, ComponentType> = {
  Animation1,
  Animation2,
  Animation3,
};

export default function AnimationPage() {
  const { slug } = useParams();
  const anim = animationsList.find((a) => a.slug === slug);

  if (!anim)
    return (
      <div className="flex items-center justify-center h-screen text-3xl font-bold">
        Animation not found.
      </div>
    );

  const Component = componentsMap[anim.component];

  return (
    <Component />  // <-- no wrapper, let animation fill screen
  );
}
