import React, { useState } from "react";
import { Html } from "@react-three/drei";

const InteractiveBubble = ({ position, text, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      scale={hovered ? [4, 4, 4] : [1, 1, 1]} // Cambia el tamaño al acercarse
      onPointerOver={() => setHovered(true)} // Detecta cuando el mouse está cerca
      onPointerOut={() => setHovered(false)} // Detecta cuando el mouse se aleja
      onClick={() => (window.location.href = link)} // Redirige al hacer clic
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={hovered ? "orange" : "blue"} />
      <Html position={[0, 0, 1.5]}>
        <div style={{ color: "white", textAlign: "center" }}>{text}</div>
      </Html>
    </mesh>
  );
};

export default InteractiveBubble;
