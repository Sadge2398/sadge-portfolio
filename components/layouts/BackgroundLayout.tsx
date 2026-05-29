"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Galaxy } from "@/components/threeD/Galaxy";
import { scrollState, advanceScroll, useScrollSync } from "@/lib/scrollStore";
import {
  cameraState,
  advanceCamera,
  useCameraControls,
} from "@/lib/cameraStore";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Scroll-driven base position + optional Ctrl orbit/zoom, always looking at
 * the galaxy centre and clamped to a reasonable viewing shell.
 */
function CameraRig() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    advanceScroll(delta);
    advanceCamera(delta);

    const s = scrollState.smooth;

    const baseX = scrollState.pointerX * 0.6;
    const baseY = 0.4 + s * 2.6 + scrollState.pointerY * -0.3;
    const baseZ = 6.2 + s * 3.2;

    const baseR = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
    let polar = Math.acos(clamp(baseY / baseR, -1, 1));
    let azimuth = Math.atan2(baseX, baseZ);

    azimuth += cameraState.smoothAzimuth;
    polar += cameraState.smoothPolar;

    const finalR = clamp(baseR + cameraState.smoothDistance, 3.8, 10.5);
    polar = clamp(polar, 0.28, 1.52);

    const targetX = finalR * Math.sin(polar) * Math.sin(azimuth);
    const targetY = finalR * Math.cos(polar);
    const targetZ = finalR * Math.sin(polar) * Math.cos(azimuth);

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
  useCameraControls();

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
