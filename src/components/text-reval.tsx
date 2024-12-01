"use client";
import React from "react";
import {
  TextRevealCard,

} from "./ui/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center  h-auto rounded-2xl w-full">
    <TextRevealCard
      text=" You know the syntax"
      revealText="  I Teach Code "
    >
   
    </TextRevealCard>
  </div>
  );
}
