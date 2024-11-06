import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // Asegúrate de importar THREE
import "./Gaia.css";
import Lights from "../pages/lights/Inicio-lights.jsx";

function GaiaModel() {
  const { scene } = useGLTF("3D-models/Gaia4.glb");
  const gaiaRef = useRef();
  const [canMove, setCanMove] = useState(true); // Estado para controlar el movimiento

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  // Parámetros para el movimiento oscilatorio
  const floatSpeed = 0.02; // Velocidad de movimiento
  const floatHeight = 0.1; // Altura de oscilación
  const floatFrequency = 2; // Frecuencia de oscilación

  // Guardar la posición inicial en el eje Y
  const initialPositionY = -0.85; // La posición inicial en Y de Gaia

  // Movimiento de Gaia con teclas de flecha
  useFrame(() => {
    if (canMove) {
      const rotationSpeed = 0.05; // Velocidad de rotación
      document.onkeydown = (e) => {
        switch (e.key) {
          case "ArrowLeft":
            gaiaRef.current.position.x -= floatSpeed;
            break;
          case "ArrowRight":
            gaiaRef.current.position.x += floatSpeed;
            break;
          case "ArrowUp":
            gaiaRef.current.position.z -= floatSpeed;
            break;
          case "ArrowDown":
            gaiaRef.current.position.z += floatSpeed;
            break;
          case "a": // Girar a la izquierda
            gaiaRef.current.rotation.y += rotationSpeed;
            break;
          case "d": // Girar a la derecha
            gaiaRef.current.rotation.y -= rotationSpeed;
            break;
          default:
            break;
        }
        checkCollision(); // Comprobar colisión después de mover
      };
    }

    // Movimiento oscilatorio en el eje Y, usando la posición inicial
    gaiaRef.current.position.y =
      initialPositionY +
      Math.sin(Date.now() * floatFrequency * 0.001) * floatHeight; // Movimiento oscilatorio
  });

  const checkCollision = () => {
    const gaiaPosition = gaiaRef.current.position;
    // Aquí puedes agregar lógica para verificar colisiones con otros modelos.
    // Por simplicidad, vamos a considerar una colisión ficticia con MainGates.
    const gatesPosition = [0, -2.5, -2]; // Cambia esto con la posición real de MainGates

    const distance = gaiaPosition.distanceTo(
      new THREE.Vector3(...gatesPosition),
    );

    if (distance < 1) {
      // Cambia el valor para ajustar la distancia de colisión
      setCanMove(false); // Detenemos el movimiento si hay colisión
    } else {
      setCanMove(true);
    }
  };

  return (
    <primitive
      object={scene}
      scale={[3, 3, 3]}
      position={[0, initialPositionY, -2]} // Usar la posición inicial
      ref={gaiaRef}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

function MainGatesModel() {
  const { scene } = useGLTF("3D-models/home/Main-gates.glb");

  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, -2.5, -2]}
      scale={[0.35, 0.4, 0.5]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

const MainScene = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, -5, 20] }} shadows>
        <Lights />
        {/* Aumentada la intensidad */}
        {/* Modelos de Gaia y MainGates */}
        <MainGatesModel />
        <GaiaModel />
        {/* Controles de la cámara */}
        <OrbitControls
          maxPolarAngle={Math.PI / 2} // Limita la rotación hacia abajo
          minAzimuthAngle={-Math.PI / 4} // -45 grados a la izquierda
          maxAzimuthAngle={Math.PI / 4} // 45 grados a la derecha
          maxDistance={6} // Ajusta para acercar/alejar más finamente
          minDistance={3}
          enablePan={false} // Deshabilita el paneo
        />
      </Canvas>
    </div>
  );
};

export default MainScene;
