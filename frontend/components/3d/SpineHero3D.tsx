"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, MeshWobbleMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface SpineHero3DProps {
  onSelectTreatment?: (spot: string) => void;
}

function SpineModel({ onSelectTreatment }: { onSelectTreatment?: (spot: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.2 + state.pointer.x * 0.25;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.08 - state.pointer.y * 0.15;
    }
    if (orbRef.current) {
      orbRef.current.rotation.z = t * 0.3;
      orbRef.current.rotation.y = t * 0.5;
    }
  });

  const vertebrae = [
    { id: "cervical", y: 2.1, label: "Cervical (Neck Pain)", color: "#0aa6a6" },
    { id: "shoulder", y: 1.3, label: "Shoulder & Thoracic", color: "#38bdf8" },
    { id: "lumbar", y: 0.3, label: "Lumbar (Lower Back)", color: "#0aa6a6" },
    { id: "sciatica", y: -0.7, label: "Sciatica & Sacrum", color: "#38bdf8" },
    { id: "knee", y: -1.7, label: "Knee & Leg Mobility", color: "#0aa6a6" },
  ];

  return (
    <group ref={groupRef}>
      {/* Central Therapeutic Healing Orb */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={orbRef} position={[0, 0.2, 0]}>
          <icosahedronGeometry args={[1.0, 2]} />
          <MeshWobbleMaterial
            factor={0.3}
            speed={1.5}
            color="#0aa6a6"
            roughness={0.15}
            metalness={0.8}
            wireframe={false}
            emissive="#078d8d"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Orbital Energy Rings */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.025, 16, 100]} />
          <meshStandardMaterial color="#0aa6a6" emissive="#0aa6a6" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.7, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      {/* 3D Anatomical Vertebrae Stack */}
      {vertebrae.map((v) => {
        const isHovered = hoveredNode === v.id;
        return (
          <group key={v.id} position={[0, v.y, 0]}>
            <mesh
              onPointerOver={() => setHoveredNode(v.id)}
              onPointerOut={() => setHoveredNode(null)}
              onClick={() => onSelectTreatment && onSelectTreatment(v.id)}
            >
              <cylinderGeometry args={[0.42, 0.46, 0.2, 20]} />
              <meshStandardMaterial
                color={isHovered ? "#38bdf8" : v.color}
                metalness={0.8}
                roughness={0.2}
                emissive={isHovered ? "#38bdf8" : "#073b5c"}
                emissiveIntensity={isHovered ? 0.9 : 0.25}
              />
            </mesh>

            <mesh position={[0, -0.13, 0]}>
              <cylinderGeometry args={[0.38, 0.38, 0.06, 16]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.7} />
            </mesh>

            {/* Interactive HTML Tooltip Marker */}
            <Html position={[0.65, 0, 0]} distanceFactor={8} zIndexRange={[100, 0]}>
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("services") || document.getElementById("appointment");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredNode(v.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`group flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition-all backdrop-blur-md cursor-pointer whitespace-nowrap shadow-md ${
                  isHovered
                    ? "scale-110 border-teal bg-navy text-white shadow-teal/40"
                    : "border-teal/30 bg-white/95 text-navy hover:bg-teal hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isHovered ? "bg-cyan-400 animate-ping" : "bg-teal"}`} />
                <span>{v.label}</span>
              </button>
            </Html>
          </group>
        );
      })}

      <Sparkles count={50} scale={5.5} size={2.5} speed={0.4} opacity={0.5} color="#0aa6a6" />
    </group>
  );
}

export default function SpineHero3D({ onSelectTreatment }: SpineHero3DProps) {
  return (
    <div className="relative w-full h-[450px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-navy via-[#073B5C] to-[#042135] shadow-2xl border border-white/15">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#0aa6a6" />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />

        <SpineModel onSelectTreatment={onSelectTreatment} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-semibold text-white pointer-events-none flex items-center gap-2 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
        <span>3D Interactive Spinal Visualizer — Drag to Rotate</span>
      </div>
    </div>
  );
}
