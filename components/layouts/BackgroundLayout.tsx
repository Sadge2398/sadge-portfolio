"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { MotionConfig, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useRef } from "react";
import { Galaxy } from "@/components/threeD/Galaxy";
import { GalaxyExploreButton, GalaxyExplorerProvider, useGalaxyExplorer } from "@/components/threeD/GalaxyExplorer";
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
  const { camera, size } = useThree();
  const reducedMotion = useReducedMotion();
  const initialized = useRef(false);

  useFrame((_, delta) => {
    advanceScroll(delta);
    advanceCamera(delta);

    const s = reducedMotion || cameraState.exploring ? 0 : scrollState.smooth;
    // Fit the whole spiral to the narrower field of view on phones, rather
    // than pushing a desktop-sized star field through a portrait viewport.
    const aspect = size.width / Math.max(size.height, 1);
    const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 52;
    const halfFov = Math.atan(Math.tan(THREE.MathUtils.degToRad(fov / 2)) * Math.min(aspect, 1));
    const viewingDistance = 5.0 / Math.sin(halfFov);
    const parallax = !reducedMotion && !cameraState.exploring;
    const baseX = parallax ? scrollState.pointerX * 0.18 : 0;
    const baseY = viewingDistance * 0.23 + s * 0.4 + (parallax ? scrollState.pointerY * -0.12 : 0);
    const baseZ = viewingDistance + s * 0.6;

    const baseR = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
    let polar = Math.acos(clamp(baseY / baseR, -1, 1));
    let azimuth = Math.atan2(baseX, baseZ);

    azimuth += cameraState.smoothAzimuth;
    polar += cameraState.smoothPolar;

    const finalR = clamp(baseR * (1 + cameraState.smoothDistance), viewingDistance * 0.55, viewingDistance * 1.7);
    polar = clamp(polar, 0.28, 1.52);

    const targetX = finalR * Math.sin(polar) * Math.sin(azimuth);
    const targetY = finalR * Math.cos(polar);
    const targetZ = finalR * Math.sin(polar) * Math.cos(azimuth);

    const k = initialized.current ? Math.min(1, delta * 2.2) : 1;
    initialized.current = true;
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    // As content fills the viewport, let the spiral sit below the copy so
    // its shape stays visible rather than disappearing behind the panels.
    camera.lookAt(0, s * viewingDistance * 0.28, 0);
  });

  return null;
}

export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GalaxyExplorerProvider><PortfolioScene>{children}</PortfolioScene></GalaxyExplorerProvider>;
}

function PortfolioScene({ children }: { children: React.ReactNode }) {
  useScrollSync();
  useCameraControls();
  const reducedMotion = useReducedMotion();
  const { exploring } = useGalaxyExplorer();

  return (
    <MotionConfig reducedMotion="user">
    <main id="main-content" className="w-full relative">
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-black pointer-events-none">
        <Canvas
          camera={{ position: [0, 3, 13], fov: 52 }}
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
            speed={reducedMotion ? 0 : 0.15}
          />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
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
      <div className={`relative z-10 portfolio-content${exploring ? " portfolio-content-hidden" : ""}`}>
        <GalaxyExploreButton className="galaxy-launcher" />
        {children}
      </div>
    </main>
    </MotionConfig>
  );
}
