import { Navbar } from "../../components/Navbar";
import ElephantIlandModel from "../../3D-models/biodiversity/ElephantIsland";
import Text1 from "./Text1";
import BirdModel from "../../3D-models/biodiversity/Bird-top.jsx";
import Bird from "../../3D-models/biodiversity/Bird.jsx";
import { Canvas, useThree } from "@react-three/fiber";
import Lights from "../lights/Bio-lights.jsx";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../shared/3DModelLoader";
import GaiaModel from "../../3D-models/biodiversity/Gaia-biodiversity.jsx";
import Title from "./Title-3D.jsx";
import Staging from "../../3D-models/biodiversity/staging/Staging.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import BubbleCanvas from "../Bubbles-Biodiversidad/BubblesCanvas.jsx";

const LossOfDiversity = () => {
  const [ballDropped, setBallDropped] = useState(false); // Estado para controlar si ya cayó la bola

  const handleBallDrop = () => {
    if (!ballDropped) {
      setBallDropped(true); // Cambiar estado para evitar múltiples bolas
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: [40, 0, 0], fov: 50 }}
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            background: "transparent",
          }}
        >
          <Staging />
          <Physics>
            <Bird />
            {ballDropped && <FallingBall position={[3, 10, 14]} />} {/* Bola */}
          </Physics>
          <Lights />
          <CameraMovement onCameraAtTarget={handleBallDrop} />{" "}
          {/* Detectar posición */}
          <Suspense fallback={<Loader />}>
            <group receiveShadow castShadow position={[0, 0, 0]}>
              <BirdModel />
              <GaiaModel />
              <Html position={[0, -12, 35]}>
                <BubbleCanvas />
              </Html>
              <ElephantIlandModel />
            </group>
          </Suspense>
          <OrbitControls enableZoom enablePan={false} />
          <Title />
        </Canvas>
        <Text1 />
      </div>
    </>
  );
};

const CameraMovement = ({ onCameraAtTarget }) => {
  const { camera } = useThree();

  const positions = [
    [40, 0, 0],
    [10, 0, -30],
    [10, 20, -40],
    [10, 0, 30],
  ];

  let currentPositionIndex = 0;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a" || event.key === "ArrowLeft") {
        currentPositionIndex =
          (currentPositionIndex - 1 + positions.length) % positions.length;
      }
      if (event.key === "d" || event.key === "ArrowRight") {
        currentPositionIndex = (currentPositionIndex + 1) % positions.length;
      }

      // Cambiar la posición de la cámara
      camera.position.set(...positions[currentPositionIndex]);
      camera.fov = 50;
      camera.updateProjectionMatrix();

      // Verificar si la cámara está en la posición objetivo [10, 0, 30]
      if (
        positions[currentPositionIndex][0] === 10 &&
        positions[currentPositionIndex][2] === 30
      ) {
        onCameraAtTarget(); // Llamar a la función si se alcanza la posición
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera, onCameraAtTarget]);

  return null;
};

const FallingBall = ({ position }) => {
  return (
    <RigidBody
      colliders="ball"
      position={position}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "bird") {
          console.log("Bola golpeó al pájaro");
          other.rigidBodyObject?.applyImpulse({ x: 0, y: -5, z: 0 }); // Simula caída
        }
      }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};

export default LossOfDiversity;
