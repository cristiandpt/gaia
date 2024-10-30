import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./Gaia.css";

function Gaiam() {
  const gltf = useGLTF('3D-models/Gaia4.glb'); 
  return <primitive object={gltf.scene} scale={10} position={[0, -1, 0]} />;
}

const Gaia = ({ name }) => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Gaiam />
          <OrbitControls enableZoom={false} />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
      {/* Texto fijo en la esquina superior derecha */}
      <div className="fixed-text">
        {name}
      </div>
    </div>
  );
};

export default Gaia;
