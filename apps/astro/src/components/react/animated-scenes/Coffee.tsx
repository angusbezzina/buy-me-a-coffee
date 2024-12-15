import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export function CoffeeScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}
