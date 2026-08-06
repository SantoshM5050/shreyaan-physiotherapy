"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

interface BodyVisualizer3DProps {
  onSelectSpot: (spot: string) => void;
  selectedSpot: string | null;
}

function AnatomicalModel({ onSelectSpot, selectedSpot }: BodyVisualizer3DProps) {
  const bodyGroup = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (bodyGroup.current && !selectedSpot) {
      bodyGroup.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  const bodyParts = [
    { id: "neck", name: "Cervical & Neck", pos: [0, 2.1, 0] as [number, number, number], size: 0.35 },
    { id: "shoulder", name: "Shoulders & Arms", pos: [0.85, 1.55, 0] as [number, number, number], size: 0.38 },
    { id: "shoulder-left", name: "Shoulder (L)", pos: [-0.85, 1.55, 0] as [number, number, number], size: 0.38 },
    { id: "back", name: "Lower Back / Spine", pos: [0, 0.75, 0] as [number, number, number], size: 0.5 },
    { id: "hip", name: "Hip & Pelvis", pos: [0, -0.15, 0] as [number, number, number], size: 0.55 },
    { id: "knee", name: "Knee Joints", pos: [0.45, -1.25, 0] as [number, number, number], size: 0.38 },
    { id: "knee-left", name: "Knee (L)", pos: [-0.45, -1.25, 0] as [number, number, number], size: 0.38 },
    { id: "ankle", name: "Ankle & Foot", pos: [0.45, -2.35, 0] as [number, number, number], size: 0.32 },
  ];

  return (
    <group ref={bodyGroup} position={[0, 0.1, 0]}>
      {/* Head Sphere */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#073b5c" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Torso Cylinder */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.6, 0.48, 1.15, 24]} />
        <meshStandardMaterial color="#12374b" roughness={0.4} metalness={0.6} transparent opacity={0.8} />
      </mesh>

      {/* Interactive Anatomical Pain Nodes */}
      {bodyParts.map((part) => {
        const isSelected = selectedSpot === part.id;
        const isHovered = hovered === part.id;

        return (
          <group key={part.id} position={part.pos}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(part.id);
              }}
              onPointerOut={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectSpot(part.id);
              }}
            >
              <sphereGeometry args={[part.size * (isSelected ? 1.2 : 1), 24, 24]} />
              <meshStandardMaterial
                color={isSelected ? "#38bdf8" : isHovered ? "#0aa6a6" : "#0aa6a6"}
                emissive={isSelected ? "#38bdf8" : isHovered ? "#0aa6a6" : "#073b5c"}
                emissiveIntensity={isSelected ? 1.0 : isHovered ? 0.6 : 0.2}
                metalness={0.8}
                roughness={0.1}
                wireframe={!isSelected && !isHovered}
              />
            </mesh>

            {(isSelected || isHovered) && (
              <Float speed={2} rotationIntensity={0.5}>
                <mesh>
                  <torusGeometry args={[part.size * 1.35, 0.025, 16, 32]} />
                  <meshBasicMaterial color="#38bdf8" />
                </mesh>
              </Float>
            )}

            {!part.id.endsWith("-left") && (
              <Html position={[0.65, 0, 0]} distanceFactor={7}>
                <button
                  type="button"
                  onClick={() => onSelectSpot(part.id)}
                  onMouseEnter={() => setHovered(part.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "border-teal bg-teal text-white scale-105 shadow-teal/40"
                      : isHovered
                      ? "border-cyan-400 bg-navy text-white scale-105"
                      : "border-slate-200 bg-white/90 text-navy hover:bg-slate-100"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-teal"}`} />
                  <span>{part.name}</span>
                </button>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function BodyVisualizer3D({ onSelectSpot, selectedSpot }: BodyVisualizer3DProps) {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl border border-teal/20 bg-gradient-to-b from-mist/80 via-white to-mist/60 overflow-hidden shadow-lg">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#0aa6a6" />
        <pointLight position={[5, 5, 5]} intensity={1.0} color="#38bdf8" />

        <AnatomicalModel onSelectSpot={onSelectSpot} selectedSpot={selectedSpot} />
        <OrbitControls enableZoom={false} autoRotate={!selectedSpot} autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <span className="rounded-full bg-navy/90 border border-white/20 px-3 py-1 text-xs font-bold text-teal shadow-md">
          3D Interactive Body Map
        </span>
        {selectedSpot && (
          <button
            type="button"
            onClick={() => onSelectSpot("")}
            className="pointer-events-auto rounded-full bg-white/90 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
          >
            Clear Selection ✕
          </button>
        )}
      </div>
    </div>
  );
}
