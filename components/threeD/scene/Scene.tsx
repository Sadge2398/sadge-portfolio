import { Galaxy } from "@/components/threeD/Galaxy";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate
          autoRotateSpeed={0.2}
          minDistance={3}
          maxDistance={12}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <Galaxy count={20000} />
      </Canvas>
    </div>
  );
}
  