"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

interface GalaxyProps {
  rotation?: [number, number, number];
  count: number;
}

export function Galaxy({ rotation = [0, 0, 0], count }: GalaxyProps) {
  const ref = useRef<any>(null);

  const galaxyData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // NASA Hubble palette colors - scientifically accurate and visually appealing
    const nasaColors = [
      new THREE.Color(0x4b0082), // Indigo - H-alpha
      new THREE.Color(0x0000ff), // Blue - O-III
      new THREE.Color(0x00ffff), // Cyan - O-III
      new THREE.Color(0x00ff00), // Green - H-beta
      new THREE.Color(0xffff00), // Yellow - S-II
      new THREE.Color(0xff7f00), // Orange - S-II
      new THREE.Color(0xff0000), // Red - N-II
      new THREE.Color(0xff1493), // Deep Pink - He-II
      new THREE.Color(0x9370db), // Medium Purple - cosmic ray
      new THREE.Color(0x4169e1), // Royal Blue - UV
      new THREE.Color(0xb0e0e6), // Powder Blue - young stars
      new THREE.Color(0xfff8dc), // Cornsilk - white dwarf
      new THREE.Color(0xffd700), // Gold - old stars
      new THREE.Color(0xff8c00), // Dark Orange - dust
      new THREE.Color(0xdc143c), // Crimson - emission
      new THREE.Color(0x00ced1), // Dark Turquoise - nebula
    ];

    // Gargantua black hole parameters
    const outerRadius = 4.0;
    const innerRadius = 0.86;
    const diskThickness = 5.;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Create accretion disk - thin rotating disk around black hole
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * outerRadius + innerRadius;

      // More dense near the center
      const angleVariation = (Math.random() - 0.5) * 0.15;
      const finalAngle = theta + angleVariation;

      // Create thin disk (accretion disk is very thin)
      const diskSpread = (Math.random() - 0.5) * diskThickness;

      // Rotational velocity effect - slightly off-plane for spiral look
      const spiralOffset = Math.sin(theta * 2) * 0.05;

      // Position in 3D space
      positions[i3] =
        Math.cos(finalAngle) * radius + (Math.random() - 0.5) * 0.2;
      positions[i3 + 1] = diskSpread + spiralOffset;
      positions[i3 + 2] =
        Math.sin(finalAngle) * radius + (Math.random() - 0.5) * 0.2;

      // Random NASA color for each star
      const randomColor =
        nasaColors[Math.floor(Math.random() * nasaColors.length)];

      // Add some brightness variation
      const brightness = 0.7 + Math.random() * 0.3;
      const adjustedColor = randomColor.clone().multiplyScalar(brightness);

      colors[i3] = adjustedColor.r;
      colors[i3 + 1] = adjustedColor.g;
      colors[i3 + 2] = adjustedColor.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.15;
      ref.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group rotation={rotation}>
      {/* Black hole event horizon - dark center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 52, 92]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <Points
        ref={ref}
        positions={galaxyData.positions}
        colors={galaxyData.colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          opacity={1.0}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function GalaxyScene() {
  const controlsRef = useRef<any>(null);

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 100 }}
      style={{ background: "black" }}
    >
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        rotateSpeed={0.1}
        autoRotate
        autoRotateSpeed={0.01}
        minDistance={1}
        maxDistance={2}
        enableDamping={true}
        dampingFactor={0.05}
      />
      <Galaxy count={200000} />
    </Canvas>
  );
}
