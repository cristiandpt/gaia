import { Navbar } from "../../components/Navbar.jsx";
import {
  DeforestationModel1,
  DeforestationModel2,
} from "../../3D-models/deforestation/Deforestation.jsx";
import "./Deforest.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Html, Environment, OrbitControls } from "@react-three/drei";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import Lights from "../lights/Desforest-light.jsx";
import Staging from "../../3D-models/deforestation/staging/Staging.jsx";
import GaiaModel from "../../3D-models/deforestation/Gaia-desforest.jsx";
import BubbleCanvas from "../Bubbles-Desforest/BubblesCanvas.jsx";
import Title from "./Title-3D.jsx";

const DeforestationPage = () => {
  return (
    <>
      <Navbar />
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={0.7}
            castShadow
          />
          <Physics gravity={[0, -9.8, 0]} allowSleep>
            <Staging />
            <Lights />
            <CameraMovement />
            <Suspense fallback={null}>
              <group receiveShadow castShadow position={[0, 0, 0]}>
                <Gaia />
                <RigidDeforestationModel1 />
                <RigidDeforestationModel2 />
                <Html position={[0, -5, 5]}>
                  <BubbleCanvas />
                </Html>
              </group>
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Physics>
          <Environment preset="sunset" />
          <Title />
        </Canvas>
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

// Componente para el modelo de Gaia con movimiento
const Gaia = () => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 0, 0],
    args: [1],
  }));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    api.position.set(Math.sin(time) * 2, Math.cos(time) * 2, 0);
  });

  return (
    <mesh ref={ref} castShadow>
      <GaiaModel />
    </mesh>
  );
};

// Modelo de Deforestación 1 con cuerpo rígido
const RigidDeforestationModel1 = () => {
  const [ref] = useBox(() => ({
    mass: 0, // Estático
    position: [-2, 0, 0],
    args: [1, 1, 1],
  }));

  return (
    <mesh ref={ref} castShadow>
      <DeforestationModel1 />
    </mesh>
  );
};

// Modelo de Deforestación 2 con cuerpo rígido
const RigidDeforestationModel2 = () => {
  const [ref] = useBox(() => ({
    mass: 0, // Estático
    position: [2, 0, 0],
    args: [1, 1, 1],
  }));

  return (
    <mesh ref={ref} castShadow>
      <DeforestationModel2 />
    </mesh>
  );
};

const CameraMovement = () => {
  const { camera } = useThree();
  const positions = [
    [0, 20, 30],
    [20, 0, 30],
    [-20, 0, 20],
    [0, 0, 40],
  ];

  let currentPositionIndex = 0;

  useFrame(() => {
    // Actualiza la posición de la cámara automáticamente si es necesario
  });

  return null;
};

export default DeforestationPage;
