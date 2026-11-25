"use client";

import { useEffect } from "react";
import { cameraState, orbitCamera, zoomCamera } from "./galaxyControls";
export { cameraState } from "./galaxyControls";

/** Manual orbit offsets layered on top of scroll-driven camera motion. */
const DRAG_THRESHOLD = 5;

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return !!target.closest(
    "a, button, input, textarea, select, [role='button']"
  );
}

/** Smooth manual offsets toward their targets each frame. */
export function advanceCamera(delta: number) {
  const k = 1 - Math.pow(0.0015, delta);
  cameraState.smoothAzimuth +=
    (cameraState.azimuth - cameraState.smoothAzimuth) * k;
  cameraState.smoothPolar +=
    (cameraState.polar - cameraState.smoothPolar) * k;
  cameraState.smoothDistance +=
    (cameraState.distance - cameraState.smoothDistance) * k;
}

/** Call from button/link handlers to ignore clicks that follow a drag. */
export function consumeClickIfDragged() {
  if (cameraState.suppressClick) {
    cameraState.suppressClick = false;
    return true;
  }
  return false;
}

/**
 * Global Ctrl + drag / Ctrl + scroll listeners so the galaxy can be explored
 * even when the canvas sits behind page content.
 */
export function useCameraControls() {
  useEffect(() => {
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragStarted = false;
    let savedOverflow = "";
    let pageLocked = false;
    let clickTimer: ReturnType<typeof setTimeout> | undefined;

    const setCursor = (cursor: string) => {
      document.body.style.cursor = cursor;
    };

    const clearSelection = () => {
      window.getSelection()?.removeAllRanges();
    };

    const lockPage = () => {
      if (pageLocked) return;
      pageLocked = true;
      document.body.classList.add("galaxy-exploring");
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      clearSelection();
    };

    const unlockPage = () => {
      if (!pageLocked) return;
      pageLocked = false;
      document.body.classList.remove("galaxy-exploring");
      document.body.style.overflow = savedOverflow;
    };

    const endGesture = (didDrag: boolean) => {
      pointerId = null;
      dragStarted = false;
      cameraState.isDragging = false;
      unlockPage();
      setCursor(cameraState.ctrlActive ? "grab" : "");

      if (didDrag) {
        cameraState.suppressClick = true;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { cameraState.suppressClick = false; }, 250);
        clearSelection();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (cameraState.exploring) return;
      if (e.key === "Control") {
        cameraState.ctrlActive = true;
        if (!cameraState.isDragging) setCursor("grab");
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        cameraState.ctrlActive = false;
        endGesture(dragStarted);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (cameraState.exploring || !e.ctrlKey || isInteractiveTarget(e.target)) return;

      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      dragStarted = false;

      // Stop the browser from starting a text-selection or scroll gesture.
      e.preventDefault();
      clearSelection();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;

      if (!e.ctrlKey) {
        endGesture(dragStarted);
        return;
      }

      const totalDx = e.clientX - startX;
      const totalDy = e.clientY - startY;

      if (!dragStarted) {
        if (Math.hypot(totalDx, totalDy) < DRAG_THRESHOLD) return;

        dragStarted = true;
        cameraState.isDragging = true;
        lockPage();
        setCursor("grabbing");
        e.preventDefault();
      }

      e.preventDefault();
      clearSelection();

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      orbitCamera(dx * 0.004, -dy * 0.004);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      endGesture(dragStarted);
    };

    const onWheel = (e: WheelEvent) => {
      if (cameraState.exploring || !e.ctrlKey) return;
      e.preventDefault();

      zoomCamera(e.deltaY * 0.001);
    };

    const onSelectStart = (e: Event) => {
      if (cameraState.isDragging || cameraState.ctrlActive) {
        e.preventDefault();
      }
    };

    const onBlur = () => {
      cameraState.ctrlActive = false;
      endGesture(dragStarted);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("selectstart", onSelectStart);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("selectstart", onSelectStart);
      window.removeEventListener("blur", onBlur);
      unlockPage();
      clearTimeout(clickTimer);
      cameraState.suppressClick = false;
      setCursor("");
    };
  }, []);
}
