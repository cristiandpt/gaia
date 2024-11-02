import React, { useEffect } from "react";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import "./Gaia.css";

function Gaiam() {
  const gltf = useGLTF("3D-models/GAIA.glb");

  useEffect(() => {
    // Traverse each child mesh to enable casting and receiving shadows
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return (
    <primitive
      castShadow
      receiveShadow
      object={gltf.scene}
      scale={4}
      position={[0, 0.5, 0]}
    />
  );
}

const MyGaia = () => {
  return (
    <Suspense fallback={null}>
      <Gaiam />
    </Suspense>
  );
};

export default MyGaia;
