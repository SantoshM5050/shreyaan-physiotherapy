"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareOpacity?: number;
}

export default function Card3D({
  children,
  className = "",
  intensity = 5,
  glareOpacity,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Subtle, silky spring physics
  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isClicking) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicking(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="perspective-1000 w-full h-full" ref={ref}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
        style={{
          rotateX: isHovered && !isClicking ? rotateXSpring : 0,
          rotateY: isHovered && !isClicking ? rotateYSpring : 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isClicking ? 0.99 : isHovered ? 1.015 : 1,
          y: isHovered && !isClicking ? -4 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={`relative overflow-hidden transition-shadow duration-300 ${
          isHovered
            ? "shadow-xl shadow-teal/15 border-teal/40"
            : ""
        } ${className}`}
      >
        <div className="relative z-10 h-full w-full preserve-3d">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
