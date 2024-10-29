import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./Gaia.css"

function Globe() {
  const gltf = useGLTF('3D-models/GAIA.glb'); 
  return <primitive object={gltf.scene} scale={2.5} />;
}

const Gaia = () => {
  return (
    <div className="canvas-container"> {/* Asegúrate de aplicar la clase aquí */}
      <Canvas
        camera={{ position: [0, 1, 6] }} // Ajusta la posición de la cámara aquí
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Globe />
          <OrbitControls enableZoom={false} />
        </Suspense>
        <Environment preset='sunset' />
      </Canvas>
    </div>
  );
};

export default Gaia;
