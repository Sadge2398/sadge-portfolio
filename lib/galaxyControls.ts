/** Shared camera offsets; animation reads them without React renders. */
export const cameraState = {
  azimuth: 0,
  polar: 0,
  distance: 0,
  smoothAzimuth: 0,
  smoothPolar: 0,
  smoothDistance: 0,
  isDragging: false,
  ctrlActive: false,
  suppressClick: false,
  exploring: false,
};

export function orbitCamera(horizontal: number, vertical: number) {
  cameraState.azimuth = Math.max(-Math.PI, Math.min(Math.PI, cameraState.azimuth + horizontal));
  cameraState.polar = Math.max(-0.6, Math.min(0.6, cameraState.polar + vertical));
}

/** Distance is a proportion of the fitted camera distance on every device. */
export function zoomCamera(amount: number) {
  cameraState.distance = Math.max(-0.45, Math.min(0.65, cameraState.distance + amount));
}

export function resetCamera() {
  cameraState.azimuth = 0;
  cameraState.polar = 0;
  cameraState.distance = 0;
}

export type GalaxyPointer = { x: number; y: number };

export function moveGalaxyPointer(
  pointers: Map<number, GalaxyPointer>,
  id: number,
  x: number,
  y: number,
) {
  const previous = pointers.get(id);
  if (!previous) return;

  if (pointers.size === 1) {
    orbitCamera((x - previous.x) * 0.008, -(y - previous.y) * 0.008);
    pointers.set(id, { x, y });
    return;
  }

  const [firstId, secondId] = Array.from(pointers.keys());
  const first = pointers.get(firstId)!;
  const second = pointers.get(secondId)!;
  const previousDistance = Math.hypot(first.x - second.x, first.y - second.y);
  pointers.set(id, { x, y });
  const nextFirst = pointers.get(firstId)!;
  const nextSecond = pointers.get(secondId)!;
  const distance = Math.hypot(nextFirst.x - nextSecond.x, nextFirst.y - nextSecond.y);
  if (distance > 1 && previousDistance > 1) {
    zoomCamera(Math.log(previousDistance / distance));
  }
}
