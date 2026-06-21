"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// A futuristic stylized placeholder representing a product
const StylizedProductModel = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color={color === 'White' ? '#ffffff' : '#111111'} 
          metalness={0.8}
          roughness={0.2}
          wireframe={true}
          emissive={color === 'White' ? '#ffffff' : '#ff003c'}
          emissiveIntensity={0.2}
        />
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.4}
          color="#ff003c"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff"
        >
          ZACMO
        </Text>
      </mesh>
    </Float>
  );
};

interface ProductViewer3DProps {
  color?: string;
}

const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ color = 'Black' }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle, #222 0%, #050505 100%)', borderRadius: '8px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <StylizedProductModel color={color} />
        
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
        <Environment preset="city" />
      </Canvas>
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'var(--color-white-muted)', fontSize: '0.8rem', pointerEvents: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '50px', backdropFilter: 'blur(4px)' }}>
        Left Click: Rotate | Scroll: Zoom
      </div>
    </div>
  );
};

export default ProductViewer3D;
