import { Navbar } from "../../components/Navbar";
import {
  DeforestationModel1,
  DeforestationModel2,
} from "../../3D-models/deforestation/Deforestation.jsx";
import GaiaModel from "../../3D-models/deforestation/Gaia-desforest.jsx";
import Gruu from "../../3D-models/deforestation/Gruu.jsx";
import Lights from "../lights/Desforest-light.jsx";
import Staging from "../../3D-models/deforestation/staging/Staging.jsx";
import Title from "./Title-3D.jsx";
import BubbleCanvas from "../Bubbles-Desforest/BubblesCanvas.jsx";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import "./Deforest.css";
import Text1 from "./Text1";

const DeforestationPage = () => {
  const [ballDropped, setBallDropped] = useState(false);

  const handleBallDrop = () => {
    if (!ballDropped) {
      setBallDropped(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="canvas-container">
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 25], fov: 50 }}
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
            <Gruu />
            {ballDropped && <FallingBall position={[7.5, 10, 2.5]} />}{" "}
            {/* Bola */}
          </Physics>
          <Lights />
          <CameraMovement onCameraAtTarget={handleBallDrop} />
          <Suspense fallback={null}>
            <group receiveShadow castShadow position={[0, 0, 0]}>
              <GaiaModel />
              <DeforestationModel1 />
              <DeforestationModel2 />
              <Html position={[0, -5, 5]}>
                <BubbleCanvas />
              </Html>
            </group>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
          <Environment preset="sunset" />
          <Title />
        </Canvas>

        <div className="text1-container">
          <Text1 />
        </div>
      </div>
    </>
  );
};

const CameraMovement = ({ onCameraAtTarget }) => {
  const { camera } = useThree();

  const positions = [
    [0, 20, 30],
    [20, 0, 30],
    [-20, 0, 20],
    [10, 0, 25]
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

      camera.position.set(...positions[currentPositionIndex]);
      camera.fov = 50;
      camera.updateProjectionMatrix();

      if (
        positions[currentPositionIndex][0] === 10 &&
        positions[currentPositionIndex][2] === 25
      ) {
        onCameraAtTarget();
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
        if (other.rigidBodyObject?.name === "gru") {
          console.log("Bola golpeó a Gruu");
          other.rigidBodyObject?.applyImpulse({ x: 7.5, y: -1.8, z: 2.5 });
        }
      }}
    >
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};

export default DeforestationPage;
