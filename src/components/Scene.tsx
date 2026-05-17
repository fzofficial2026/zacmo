"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AbstractClothing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Placeholder for a cool 3D apparel model */}
        <torusKnotGeometry args={[1, 0.4, 256, 32]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="hero-3d-canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <AbstractClothing />
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
