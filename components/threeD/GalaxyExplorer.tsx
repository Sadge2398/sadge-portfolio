"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { Minus, Orbit, Plus, RotateCcw, X } from "lucide-react";
import {
  cameraState,
  moveGalaxyPointer,
  orbitCamera,
  resetCamera,
  zoomCamera,
  type GalaxyPointer,
} from "@/lib/galaxyControls";

const ExplorerContext = createContext<{
  exploring: boolean;
  open: () => void;
  close: () => void;
} | null>(null);

export function useGalaxyExplorer() {
  const context = useContext(ExplorerContext);
  if (!context) throw new Error("Galaxy explorer requires its provider.");
  return context;
}

export function GalaxyExplorerProvider({ children }: { children: ReactNode }) {
  const [exploring, setExploring] = useState(false);
  const open = useCallback(() => {
    resetCamera();
    cameraState.exploring = true;
    setExploring(true);
  }, []);
  const close = useCallback(() => {
    cameraState.exploring = false;
    cameraState.isDragging = false;
    resetCamera();
    setExploring(false);
  }, []);
  const value = useMemo(() => ({ exploring, open, close }), [exploring, open, close]);

  return (
    <ExplorerContext.Provider value={value}>
      {children}
      <GalaxyExplorerDialog exploring={exploring} close={close} />
    </ExplorerContext.Provider>
  );
}

function GalaxyExplorerDialog({ exploring, close }: { exploring: boolean; close: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, GalaxyPointer>());

  useEffect(() => {
    if (!exploring) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const activePointers = pointers.current;

    return () => {
      activePointers.clear();
      cameraState.isDragging = false;
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [exploring]);

  useEffect(() => {
    if (!exploring) return;
    const surface = surfaceRef.current;
    if (!surface) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomCamera(event.deltaY * 0.001);
    };
    surface.addEventListener("wheel", onWheel, { passive: false });
    return () => surface.removeEventListener("wheel", onWheel);
  }, [exploring]);

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    cameraState.isDragging = pointers.current.size > 0;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="galaxy-explorer"
      aria-labelledby="galaxy-explorer-title"
      aria-describedby="galaxy-explorer-help"
      onCancel={(event) => { event.preventDefault(); close(); }}
    >
      <div
        ref={surfaceRef}
        className="galaxy-gesture-surface"
        role="group"
        aria-label="Interactive galaxy. Use arrow keys to orbit, plus and minus to zoom, or Home to reset."
        tabIndex={0}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          cameraState.isDragging = true;
        }}
        onPointerMove={(event) => moveGalaxyPointer(pointers.current, event.pointerId, event.clientX, event.clientY)}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onLostPointerCapture={endPointer}
        onKeyDown={(event) => {
          switch (event.key) {
            case "ArrowLeft": orbitCamera(-0.12, 0); break;
            case "ArrowRight": orbitCamera(0.12, 0); break;
            case "ArrowUp": orbitCamera(0, -0.12); break;
            case "ArrowDown": orbitCamera(0, 0.12); break;
            case "+": case "=": zoomCamera(-0.12); break;
            case "-": zoomCamera(0.12); break;
            case "Home": resetCamera(); break;
            default: return;
          }
          event.preventDefault();
        }}
      />

      <header className="galaxy-explorer-header">
        <div>
          <p className="eyebrow">Take a closer look</p>
          <h2 id="galaxy-explorer-title">Explore the galaxy</h2>
        </div>
        <button onClick={close} className="galaxy-close" aria-label="Return to portfolio" title="Return to portfolio">
          <X size={22} aria-hidden="true" />
        </button>
      </header>

      <div className="galaxy-explorer-footer">
        <p id="galaxy-explorer-help">
          Drag to orbit · Pinch or scroll to zoom
        </p>
        <div className="galaxy-toolbar" role="group" aria-label="Galaxy view controls">
          <button onClick={() => zoomCamera(0.12)} aria-label="Zoom out" title="Zoom out"><Minus size={22} aria-hidden="true" /></button>
          <button onClick={resetCamera} className="galaxy-reset"><RotateCcw size={18} aria-hidden="true" /> Reset view</button>
          <button onClick={() => zoomCamera(-0.12)} aria-label="Zoom in" title="Zoom in"><Plus size={22} aria-hidden="true" /></button>
        </div>
        <button onClick={close} className="galaxy-return">Return to portfolio</button>
      </div>
    </dialog>
  );
}

export function GalaxyExploreButton({ className = "button-quiet" }: { className?: string }) {
  const { open } = useGalaxyExplorer();
  return <button onClick={open} className={className} aria-haspopup="dialog"><Orbit size={18} aria-hidden="true" /> Explore galaxy</button>;
}
