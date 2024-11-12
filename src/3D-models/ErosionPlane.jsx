import React, { useEffect } from "react";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

function ErosionLoader() {
  const gltf = useGLTF("3D-models/erosion/ground/ground.glb");

  useEffect(() => {
    // Ensure all child meshes receive shadows
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true; // Set to receive shadows
      }
    });
  }, [gltf]);

  return (
    <primitive
      receiveShadow
      object={gltf.scene}
      scale={20}
      position={[0, -5, 0]}
    >
      <shadowMaterial opacity={0.7} />
    </primitive>
  );
}

const ErosionPlane = () => {
  return (
    <Suspense fallback={null}>
      <ErosionLoader />
    </Suspense>
  );
};
export default ErosionPlane;
