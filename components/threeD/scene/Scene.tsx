import Galaxy from "@/components/threeD/Galaxy";
import { Canvas } from "@react-three/fiber";
export default function Scene() {
  
    return (
      <div className="w-screen h-screen bg-black">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Galaxy />
        </Canvas>
      </div>
    );
  }
  