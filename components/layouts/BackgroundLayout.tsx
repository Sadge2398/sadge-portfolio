"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Galaxy } from "@/components/threeD/Galaxy";
import { scrollState, advanceScroll, useScrollSync } from "@/lib/scrollStore";

/**
 * Drives the camera each frame from the shared scroll store: as the user
 * scrolls the camera pulls back and cranes upward (revealing the spiral from a
 * higher angle), with a soft pointer parallax on top.
 */
function CameraRig() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    advanceScroll(delta);
    const s = scrollState.smooth;

    const targetX = scrollState.pointerX * 0.6;
    const targetY = 0.4 + s * 2.6 + scrollState.pointerY * -0.3;
    const targetZ = 6.2 + s * 3.2;

    const k = Math.min(1, delta * 2.2);
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollSync();

  return (
    <main className="w-full relative">
      <div className="fixed inset-0 -z-10 h-screen bg-black">
        <Canvas
          camera={{ position: [0, 0.4, 6.2], fov: 62 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          performance={{ min: 0.5 }}
          style={{ background: "black" }}
        >
          <color attach="background" args={["#02010a"]} />
          <fog attach="fog" args={["#02010a", 9, 22]} />

          <CameraRig />

          <Galaxy count={45000} arms={2} />

          <Stars
            radius={120}
            depth={60}
            count={3500}
            factor={4}
            saturation={0}
            fade
            speed={0.4}
          />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.05}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.85}
              kernelSize={KernelSize.MEDIUM}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.3} darkness={0.9} />
          </EffectComposer>

          <AdaptiveDpr pixelated />
        </Canvas>
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
