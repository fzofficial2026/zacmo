"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Text, Center, Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function LightningBolt() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Define a sharp, aggressive lightning bolt shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Centered around 0,0
    s.moveTo(2, 10);
    s.lineTo(-6, -2);
    s.lineTo(0, -2);
    s.lineTo(-4, -14);
    s.lineTo(8, 2);
    s.lineTo(2, 2);
    s.lineTo(2, 10);
    return s;
  }, []);

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      initial={{ y: 30, scale: 0.5, rotationX: Math.PI }}
      animate={{ y: 0, scale: 0.8, rotationX: 0 }}
      transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 }}
    >
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#ff0000"
        emissive="#ff0000"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.2}
      />
    </motion.mesh>
  );
}

function AnimatedText() {
  return (
    <group position={[0, 0, 0]}>
      <motion.group
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: -9 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          fontSize={6}
          fontWeight={900}
          letterSpacing={-0.05}
          color="#f4f4f4"
          material-transparent
        >
          ZAC
        </Text>
      </motion.group>

      <motion.group
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 9 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          fontSize={6}
          fontWeight={900}
          letterSpacing={-0.05}
          color="#f4f4f4"
          material-transparent
        >
          MO
        </Text>
      </motion.group>
    </group>
  );
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="hero-3d-canvas" style={{ background: "#050505", width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 25], fov: 40 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Center>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <LightningBolt />
          </Float>
          <AnimatedText />
        </Center>

        <Sparkles count={50} scale={20} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -10, 0]} opacity={0.6} scale={40} blur={2.5} far={15} color="#000000" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
