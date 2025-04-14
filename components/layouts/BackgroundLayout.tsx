'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as random from "maath/random";
import { inSphere } from "maath/random";
import { PointMaterial, Points } from '@react-three/drei';

function Galaxy({ count = 5000 }) {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    random.inSphere(positions, { radius: 1.5 });
    return positions;
  }, [count]);

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

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'black' }}>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Galaxy />
          <Stars 
            radius={100}
            depth={50}
            count={7000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.3}
          />
        </Canvas>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 