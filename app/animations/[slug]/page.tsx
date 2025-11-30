"use client";

import { useParams } from "next/navigation";
import type { ComponentType } from "react";
import { animationsList } from "../data";
import Animation1 from "../components/Animation1";
import Animation2 from "../components/Animation2";
import Animation3 from "../components/Animation3";
import Animation4 from "../components/Animation4";
import Animation5 from "../components/Animation5";
import Animation6 from "../components/Animation6";
import Animation7 from "../components/Animation7";
import Animation8 from "../components/Animation8";
import Animation9 from "../components/Animation9";
import Animation10 from "../components/Animation10";
import Animation11 from "../components/Animation11";
import Animation12 from "../components/Animation12";
import Animation13 from "../components/Animation13";
import Animation14 from "../components/Animation14";
import Animation15 from "../components/Animation15";

const componentsMap: Record<string, ComponentType> = {
  Animation1,
  Animation2,
  Animation3,
  Animation4,
  Animation5,
  Animation6,
  Animation7,
  Animation8,
  Animation9,
  Animation10,
  Animation11,
  Animation12,
  Animation13,
  Animation14,
  Animation15,
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
