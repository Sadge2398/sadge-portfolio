"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Galaxy } from "@/components/threeD/Galaxy";

export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full relative">
      <div className="fixed inset-0 -z-10 h-screen">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          style={{ background: "black" }}
        >
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.3}
            autoRotate
            autoRotateSpeed={0.2}
            minDistance={2}
            maxDistance={8}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Galaxy count={15000} />
          <Stars
            radius={100}
            depth={50}
            count={10000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.2}
          />
        </Canvas>
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
