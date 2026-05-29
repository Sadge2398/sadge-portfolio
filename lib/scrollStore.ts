"use client";

import { useEffect } from "react";

/**
 * Lightweight, render-free scroll store.
 *
 * The page uses native scrolling, and the 3D scene lives inside an r3f
 * <Canvas/> which is its own React reconciler root (so React context does not
 * cross the boundary cleanly). Instead we share a single mutable object that a
 * window scroll listener writes to and `useFrame` reads from every frame.
 */
export const scrollState = {
  /** Raw scroll progress 0..1 across the whole document. */
  progress: 0,
  /** Eased progress, smoothed toward `progress` inside the render loop. */
  smooth: 0,
  /** Per-frame velocity of the smoothed progress (for motion/streak effects). */
  velocity: 0,
  /** Pointer in normalized device-ish coords (-1..1) for subtle parallax. */
  pointerX: 0,
  pointerY: 0,
};

function computeProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/**
 * Attach global scroll + pointer listeners that feed `scrollState`.
 * Mount this once near the root.
 */
export function useScrollSync() {
  useEffect(() => {
    const onScroll = () => {
      scrollState.progress = computeProgress();
    };
    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
}

/** Advance the eased values. Call once per frame from a single useFrame. */
export function advanceScroll(delta: number) {
  const prev = scrollState.smooth;
  // Frame-rate independent smoothing toward target.
  const k = 1 - Math.pow(0.0015, delta);
  scrollState.smooth += (scrollState.progress - scrollState.smooth) * k;
  scrollState.velocity = (scrollState.smooth - prev) / Math.max(delta, 1e-4);
}
