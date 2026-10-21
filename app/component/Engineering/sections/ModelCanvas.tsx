"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    </Html>
  );
};

const ModelViewer = ({ url, ...props }: { url: string; position: number[]; scale: number; key: string }) => {
  const gltf = useGLTF(url) as GLTF;

  // ✅ clone scene safely
  const scene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  );

  return <primitive object={scene} {...props} />;
};

const ModelCanvas = ({ url }: { url: string }) => {
  return (
    <Canvas camera={{ position: [0, 1, 15] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls enableZoom={true} />
      <Suspense fallback={<Loader />}>
        <ModelViewer url={url} position={[0, 0, 0]} scale={0.3} key={url} />
      </Suspense>
    </Canvas>
  );
};

export default ModelCanvas;
