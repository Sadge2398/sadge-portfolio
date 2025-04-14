'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Stars, Points } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as random from "maath/random";
import { inSphere } from "maath/random";

// Background stars component
function SpaceBackground() {
  return (
    <Stars 
      radius={100}
      depth={50}
      count={7000}
      factor={4}
      saturation={0.5}
      fade
      speed={0.3}
    />
  );
}

interface GalaxyProps {
  rotation?: [number, number, number];
  count: number;
}

function Galaxy({ rotation = [0, 0, 0], count }: GalaxyProps) {
  const ref = useRef<any>();
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    random.inSphere(positions, { radius: 1.5 });
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'black' }}>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Galaxy count={5000} />
    </Canvas>
  );
}
