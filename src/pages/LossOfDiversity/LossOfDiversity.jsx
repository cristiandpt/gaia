import { Navbar } from "../../components/Navbar";
import ElephantIlandModel from "../../3D-models/biodiversity/ElephantIsland";
import Text1 from "./Text1";
import BirdModel from "../../3D-models/biodiversity/Bird-top.jsx";
import { Canvas, useThree } from "@react-three/fiber";
import Lights from "../lights/Bio-lights.jsx";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import Loader from "../../shared/3DModelLoader";
import GaiaModel from "../../3D-models/biodiversity/Gaia-biodiversity.jsx";
import Title from "./Title-3D.jsx";
import Staging from "../../3D-models/biodiversity/staging/Staging.jsx";

const LossOfDiversity = () => {
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
          <Lights />
          <CameraMovement />
          <Suspense fallback={<Loader />}>
            <group receiveShadow castShadow position={[0, 0, 0]}>
              <BirdModel />
              <GaiaModel />
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

const CameraMovement = () => {
  const { camera } = useThree(); // Accede a la cámara dentro del Canvas

  const positions = [
    [40, 0, 0],
    [10, 0, -30],
    [10, 20, -40],
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

export default LossOfDiversity;
