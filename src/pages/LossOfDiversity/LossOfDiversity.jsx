import { Navbar } from "../../components/Navbar";
import ElephantIlandModel from "../../3D-models/biodiversity/ElephantIsland";
import Text1 from "./Text1";
import "./LossOfDiversity.css";
import BirdModel from "../../3D-models/biodiversity/Bird-top.jsx";
import { Canvas } from "@react-three/fiber";
import Lights from "../lights/Bio-lights.jsx";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "../../shared/3DModelLoader";
import GaiaModel from "../../3D-models/biodiversity/Gaia-biodiversity.jsx";
import { BoxGeometry, Mesh } from "three";
import Title from "./Title-3D.jsx";

const LossOfDiversity = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Canvas
          shadows // Habilitar sombras suaevs
          gl={{ alpha: true }}
          camera={{ position: [40, 0, 0], fov: 50 }} // Ajustar la cámara
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            background: "transparent",
          }} // Tamaño pantalla completa
        >
          <Lights />

          <Suspense fallback={<Loader />}>
            <group receiveShadow castShadow position={[0, 0, 0]}>
              <BirdModel />
              <GaiaModel />
              <ElephantIlandModel />
            </group>
          </Suspense>
          {/* OrbitControls con movimiento solo horizontal */}
          <OrbitControls
            enableZoom
            enablePan={false}
          //minPolarAngle={Math.PI / 2}
          //maxPolarAngle={Math.PI / 2}
          />
          <Title />
        </Canvas>

        <Text1 />
      </div>
    </>
  );
};

export default LossOfDiversity;
