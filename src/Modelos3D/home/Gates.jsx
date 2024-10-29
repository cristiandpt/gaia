import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

function Globe() {
  const gltf = useGLTF('3D-models/home/Main-gates.glb'); 
  return <primitive object={gltf.scene} scale={0.5} />;
}

const Gates = () => {
    const { nodes, materials } = useGLTF("/3D-models/home/Main-gates.glb");
    
    return (
        <div className="canvas-container"> {/* Asegúrate de aplicar la clase aquí */}
        <Canvas
          camera={{position:[15, 8, 0]}} // Camera position
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
  
  export default Gates;