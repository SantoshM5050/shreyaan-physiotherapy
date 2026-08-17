"use client";

import React from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareOpacity?: number;
}

/**
 * Card3D Component - Flattened wrapper for 100% reliable click events
 * and instant touch/mouse responsiveness across all devices.
 */
export default function Card3D({
  children,
  className = "",
}: Card3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
}
