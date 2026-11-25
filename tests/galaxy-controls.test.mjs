import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../lib/galaxyControls.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { cameraState, orbitCamera, zoomCamera, resetCamera, moveGalaxyPointer } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

beforeEach(() => resetCamera());

test("one finger orbits the scene without changing zoom", () => {
  const points = new Map([[1, { x: 100, y: 100 }]]);
  moveGalaxyPointer(points, 1, 160, 130);
  assert.ok(cameraState.azimuth > 0);
  assert.ok(cameraState.polar < 0);
  assert.equal(cameraState.distance, 0);
});

test("spreading two fingers zooms in; bringing them together zooms out", () => {
  const points = new Map([[1, { x: 100, y: 100 }], [2, { x: 200, y: 100 }]]);
  moveGalaxyPointer(points, 2, 250, 100);
  const spreadZoom = cameraState.distance;
  assert.ok(spreadZoom < 0);
  assert.equal(cameraState.azimuth, 0);
  moveGalaxyPointer(points, 2, 180, 100);
  assert.ok(cameraState.distance > spreadZoom);
});

test("a remaining finger continues without a jump after a pinch", () => {
  const points = new Map([[1, { x: 100, y: 100 }], [2, { x: 200, y: 100 }]]);
  moveGalaxyPointer(points, 1, 95, 100);
  points.delete(2);
  moveGalaxyPointer(points, 1, 95, 100);
  assert.equal(cameraState.azimuth, 0);
  assert.equal(cameraState.polar, 0);
});

test("missing and coincident pointers do not corrupt the camera", () => {
  const points = new Map([[1, { x: 100, y: 100 }], [2, { x: 100, y: 100 }]]);
  moveGalaxyPointer(points, 3, 500, 500);
  moveGalaxyPointer(points, 1, 100, 100);
  assert.equal(cameraState.distance, 0);
  assert.equal(points.size, 2);
});

test("extreme gestures stay bounded and reset restores the fitted view", () => {
  orbitCamera(1000, -1000);
  zoomCamera(-1000);
  assert.ok(Math.abs(cameraState.azimuth) <= Math.PI);
  assert.ok(Math.abs(cameraState.polar) < 1);
  assert.ok(cameraState.distance > -1);
  zoomCamera(1000);
  assert.ok(cameraState.distance < 1);
  resetCamera();
  assert.equal(cameraState.azimuth, 0);
  assert.equal(cameraState.polar, 0);
  assert.equal(cameraState.distance, 0);
});
