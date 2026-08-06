"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[4, 1]} />
        <meshBasicMaterial color="#0aa6a6" wireframe transparent opacity={0.08} />
      </mesh>
      <Sparkles count={50} scale={10} size={2.5} speed={0.3} opacity={0.4} color="#0aa6a6" />
    </group>
  );
}

export default function ParticleBackground3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <FloatingMesh />
      </Canvas>
    </div>
  );
}
