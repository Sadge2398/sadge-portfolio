"use client";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { scrollState } from "@/lib/scrollStore";

interface GalaxyProps {
  /** Number of disk stars. */
  count?: number;
  /** Number of spiral arms. */
  arms?: number;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uWaveAmp;
  uniform float uWaveFreq;
  uniform float uWaveSpeed;
  uniform float uSpin;
  uniform float uScroll;
  uniform float uPixelRatio;

  attribute vec3 aColor;
  attribute float aScale;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vDist;

  void main() {
    vec3 p = position;
    float r = length(p.xz);
    float baseAngle = atan(p.z, p.x);

    // Differential rotation: inner stars sweep faster than the outskirts.
    float angle = baseAngle + uTime * uSpin / (r * 0.6 + 0.35);
    p.x = cos(angle) * r;
    p.z = sin(angle) * r;

    // Wavy, warped disk: a vertical ripple travels outward and a second,
    // slower swell rolls across so the plane never looks flat.
    float wave = sin(r * uWaveFreq - uTime * uWaveSpeed + baseAngle * 2.0);
    float wave2 = cos(r * uWaveFreq * 0.5 + uTime * uWaveSpeed * 0.6 + aSeed * 6.2831);
    float amp = uWaveAmp * (0.35 + r * 0.22) * (1.0 + uScroll * 0.9);
    p.y += (wave * 0.7 + wave2 * 0.3) * amp;

    vColor = aColor;
    vDist = r;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vDist;

  void main() {
    // Soft round sprite with a hot core that falls off to a glow.
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float strength = pow(1.0 - d * 2.0, 2.4);

    // Push energy into the galactic centre so bloom blossoms there.
    vec3 col = vColor * (1.0 + (1.0 - smoothstep(0.0, 1.3, vDist)) * 1.1);
    gl_FragColor = vec4(col, strength);
  }
`;

export function Galaxy({ count = 60000, arms = 2 }: GalaxyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    const outerRadius = 5.0;
    const spin = 0.85;
    const randomness = 0.32;
    const randomPower = 2.6;

    // Milky-Way-ish palette: warm core -> cool blue arms -> magenta rim.
    const insideColor = new THREE.Color("#ffe2ad");
    const midColor = new THREE.Color("#6fc0ff");
    const outsideColor = new THREE.Color("#bf6bff");
    const white = new THREE.Color("#fff6e8");

    const bulgeCount = Math.floor(count * 0.14);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x: number, y: number, z: number, radius: number;

      if (i < bulgeCount) {
        // Dense, bright central bulge (gaussian-ish blob).
        const u = Math.random();
        radius = Math.pow(u, 2.2) * 1.1;
        const phi = Math.random() * Math.PI * 2;
        const costheta = Math.random() * 2 - 1;
        const sintheta = Math.sqrt(1 - costheta * costheta);
        x = radius * sintheta * Math.cos(phi);
        z = radius * sintheta * Math.sin(phi);
        y = radius * costheta * 0.35;
      } else {
        const radiusRand = Math.pow(Math.random(), 1.7);
        radius = radiusRand * outerRadius;
        const branch = ((i % arms) / arms) * Math.PI * 2;
        const spinAngle = radius * spin;

        const scatter = () =>
          Math.pow(Math.random(), randomPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          randomness *
          (radius + 0.3);

        const rx = scatter();
        const rz = scatter();
        const ry = scatter() * 0.18; // keep the disk thin

        x = Math.cos(branch + spinAngle) * radius + rx;
        z = Math.sin(branch + spinAngle) * radius + rz;
        y = ry;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Colour by radius with a whitened hot centre.
      const t = Math.min(radius / outerRadius, 1);
      const c =
        t < 0.5
          ? insideColor.clone().lerp(midColor, t / 0.5)
          : midColor.clone().lerp(outsideColor, (t - 0.5) / 0.5);
      c.lerp(white, Math.max(0, 1 - radius * 1.4) * 0.5);
      // Subtle per-star brightness sparkle.
      c.multiplyScalar(0.75 + Math.random() * 0.45);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      // Bigger, brighter points toward the core.
      scales[i] = (i < bulgeCount ? 1.1 : 0.7) + Math.random() * 1.2;
      seeds[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [count, arms]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 20 },
      uWaveAmp: { value: 0.22 },
      uWaveFreq: { value: 1.4 },
      uWaveSpeed: { value: 0.9 },
      uSpin: { value: 0.12 },
      uScroll: { value: 0 },
      uPixelRatio: { value: 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uTime.value += delta;
      u.uScroll.value = scrollState.smooth;
      u.uPixelRatio.value = Math.min(viewport.dpr || 1, 2);
    }
    if (groupRef.current) {
      // Gentle overall drift + a scroll-driven tilt toward edge-on.
      groupRef.current.rotation.y += delta * 0.03;
      const tilt = -0.5 - scrollState.smooth * 0.55;
      groupRef.current.rotation.x +=
        (tilt - groupRef.current.rotation.x) * Math.min(1, delta * 2);
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.5, 0, 0]}>
      {/* Event horizon — a small dark core that the bright bulge halos. */}
      <mesh>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
