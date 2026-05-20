"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Text, Center, Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function LightningBolt() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shape = useMemo(() => {
    const s = new THREE.Shape();
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

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Intro drop animation
      const elapsedTime = state.clock.elapsedTime;
      const progress = Math.min(elapsedTime / 1.5, 1);
      
      // Easing function (easeOutBounce approximation or just exponential easeOut)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      const startY = 30;
      const endY = 0;
      
      // Basic hover after landing
      const hoverY = Math.sin(elapsedTime * 2) * 0.5;
      
      meshRef.current.position.y = startY + (endY - startY) * easeOut + (progress === 1 ? hoverY : 0);
      meshRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.3;
      
      if (progress < 1) {
         meshRef.current.rotation.x = Math.PI * (1 - easeOut);
         meshRef.current.scale.setScalar(0.5 + 0.3 * easeOut);
      } else {
         meshRef.current.scale.setScalar(0.8);
         meshRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#ff0000"
        emissive="#ff0000"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function AnimatedText() {
  const zacRef = useRef<THREE.Group>(null);
  const moRef = useRef<THREE.Group>(null);
  const zacMatRef = useRef<any>(null);
  const moMatRef = useRef<any>(null);

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;
    // Fade in after 1.5 seconds (when lightning lands)
    if (elapsedTime > 1.5) {
      const fadeProgress = Math.min((elapsedTime - 1.5) / 1.0, 1);
      const easeOut = 1 - Math.pow(1 - fadeProgress, 3);
      
      if (zacRef.current && moRef.current) {
        zacRef.current.position.x = -10 + (1 * easeOut);
        moRef.current.position.x = 10 - (1 * easeOut);
      }
      
      if (zacMatRef.current) {
        zacMatRef.current.opacity = easeOut;
      }
      if (moMatRef.current) {
        moMatRef.current.opacity = easeOut;
      }
    } else {
      if (zacMatRef.current) zacMatRef.current.opacity = 0;
      if (moMatRef.current) moMatRef.current.opacity = 0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={zacRef} position={[-10, 0, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          fontSize={6}
          fontWeight={900}
          letterSpacing={-0.05}
          color="#f4f4f4"
        >
          ZAC
          <meshBasicMaterial ref={zacMatRef} attach="material" transparent opacity={0} color="#f4f4f4" />
        </Text>
      </group>

      <group ref={moRef} position={[10, 0, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          fontSize={6}
          fontWeight={900}
          letterSpacing={-0.05}
          color="#f4f4f4"
        >
          MO
          <meshBasicMaterial ref={moMatRef} attach="material" transparent opacity={0} color="#f4f4f4" />
        </Text>
      </group>
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
