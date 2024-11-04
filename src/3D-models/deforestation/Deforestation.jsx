// Desforestation1.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./Deforestation.css";

// Componente para cargar el primer modelo
function DeforestationModel1() {
  const gltf = useGLTF("3D-models/desforestation/Arboles.glb");
  return (
    <primitive
      object={gltf.scene}
      scale={10}
      position={[5, -1, 0]}
      castShadow
    />
  );
}

// Componente para cargar el segundo modelo con rotación
function DeforestationModel2() {
  const gltf = useGLTF("3D-models/desforestation/mundos.glb");
  const modelRef = useRef();

  // Rotación en el eje Y (24 segundos por vuelta)
  useFrame((state, delta) => {
    modelRef.current.rotation.y += ((2 * Math.PI) / 24) * delta;
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={10}
      position={[-5, -1, 0]}
      castShadow
    />
  );
}

export { DeforestationModel1, DeforestationModel2 };
