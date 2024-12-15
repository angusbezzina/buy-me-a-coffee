import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

extend({ OrbitControls });

const vertexShader = `
uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;

  vec3 transformed = position;

  // Twist logic
  float twistAmount = texture2D(uNoiseTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r * 10.0;
  float angle = twistAmount;
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);

  vec2 twistedXZ = vec2(
    transformed.x * cosAngle - transformed.z * sinAngle,
    transformed.x * sinAngle + transformed.z * cosAngle
  );
  transformed.xz = twistedXZ;

  // Wind logic
  vec2 windOffset = vec2(
    texture2D(uNoiseTexture, vec2(0.25, uTime * 0.01)).r - 0.5,
    texture2D(uNoiseTexture, vec2(0.75, uTime * 0.01)).r - 0.5
  ) * pow(uv.y, 2.0) * 2.0;

  transformed.xz += windOffset;

  // Pass alpha for fading edges
  vAlpha = smoothstep(0.0, 0.1, uv.x) *
           smoothstep(0.0, 0.1, 1.0 - uv.x) *
           smoothstep(0.0, 0.1, uv.y) *
           smoothstep(0.0, 0.1, 1.0 - uv.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uNoiseTexture;

varying vec2 vUv;
varying float vAlpha;

void main() {
  vec2 noiseUv = vUv * vec2(0.5, 0.3) + vec2(0.0, -uTime * 0.03);
  float noiseAlpha = texture2D(uNoiseTexture, noiseUv).r;

  float alpha = noiseAlpha * vAlpha;

  vec3 baseColor = mix(vec3(0.6, 0.3, 0.2), vec3(1.0, 1.0, 1.0), pow(alpha, 3.0));

  gl_FragColor = vec4(baseColor, alpha);
}
`;

function Smoke() {
  const smokeRef = React.useRef<THREE.ShaderMaterial>(null!);
  const noiseTexture = useLoader(TextureLoader, "./models/textures/smoke.png");

  useFrame(({ clock }) => {
    if (smokeRef.current) {
      smokeRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 1.83, 0]} scale={[1.5, 6, 1.5]}>
      <planeGeometry args={[1, 1, 16, 64]} />
      <shaderMaterial
        ref={smokeRef}
        attach="material"
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uNoiseTexture: { value: noiseTexture },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

function Coffee() {
  const gltf = useLoader(GLTFLoader, "./models/coffeeMug.glb");

  return (
    <>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
      <Smoke />
    </>
  );
}

export function CoffeeScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        style={{ height: "40dvh" }}
        camera={{
          position: [8, 15, 28],
          fov: 25,
          near: 0.1,
          far: 100,
        }}
      >
        <color attach="background" args={["#fefefe"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Coffee />
        <OrbitControls enableDamping target={[0, 3, 0]} minDistance={0.1} maxDistance={50} />
      </Canvas>
    </div>
  );
}
