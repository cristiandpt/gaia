import { Navbar } from "../../components/Navbar.jsx";
import Gaia from "../../3D-models/Gaia.jsx";
import {
  DeforestationModel1,
  DeforestationModel2,
} from "../../3D-models/deforestation/Deforestation.jsx";
import "./Deforest.css"; // CSS adicional para los textos fijos
import { useRef } from "react";
import { Canvas, useFrame , useThree } from "@react-three/fiber";
import { Suspense , useEffect  } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import Lights from "../lights/Desforest-light.jsx";
import Staging from "../../3D-models/deforestation/staging/Staging.jsx";
import GaiaModel from "../../3D-models/deforestation/Gaia-desforest.jsx";

const DeforestationPage = () => {
  return (
    <>
      <Navbar />
      <div className="canvas-container">
        <div className="canvas-container">
          <Canvas shadows camera={{ position: [0, 0, 15] }}>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={0.7}
              castShadow
            />
            <Staging/>
            <Lights />
            <CameraMovement />
            <Suspense fallback={null}>
              <group receiveShadow castShadow position={[0, 0, 0]}>
              <GaiaModel />
              <DeforestationModel1 />
              <DeforestationModel2 />
              </group>
              <OrbitControls enableZoom={false} />
            </Suspense>
            <Environment preset="sunset" />
          </Canvas>
          <div className="fixed-text">{name}</div>
        </div>
        <div className="info-text">
          <h2>Impacto de la Deforestación</h2>
          <p>
            La deforestación causa la pérdida de biodiversidad, el cambio
            climático y la destrucción de hábitats esenciales.
          </p>
          <p>
            Cada año, millones de hectáreas de bosques son taladas, amenazando
            la vida de innumerables especies.
          </p>
        </div>
      </div>
    </>
  );
};

const CameraMovement = () => {
  const { camera } = useThree(); // Accede a la cámara dentro del Canvas

  const positions = [
    [0, 20, 30],
    [20, 0, 30],
    [-20, 0, 20],
    [0, 0, 40]
  ]; // Definir las posiciones a las que se moverá la cámara

  let currentPositionIndex = 0; // Variable para llevar el control de la posición actual

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a" || event.key === "ArrowLeft") {
        // Mover a la posición anterior
        currentPositionIndex =
          (currentPositionIndex - 1 + positions.length) % positions.length;
      }
      if (event.key === "d" || event.key === "ArrowRight") {
        // Mover a la siguiente posición
        currentPositionIndex = (currentPositionIndex + 1) % positions.length;
      }

      // Cambiar la posición de la cámara
      camera.position.set(...positions[currentPositionIndex]);

      // También puedes ajustar el zoom cambiando el 'fov' de la cámara
      camera.fov = 50; // Ajusta el zoom aquí
      camera.updateProjectionMatrix(); // Asegúrate de actualizar la proyección para que el cambio de fov surta efecto
    };

    window.addEventListener("keydown", handleKeyDown); // Escuchar eventos de teclado
    return () => window.removeEventListener("keydown", handleKeyDown); // Limpiar al desmontar
  }, [camera]);

  return null; // Este componente no renderiza nada, solo maneja la lógica de la cámara
};

export default DeforestationPage;
