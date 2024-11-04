import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Lights = () => {
  const directionalLightRef = useRef();

  {
    /*useHelper(directionalLightRef, DirectionalLightHelper, 10, "red");*/
  }

  return (
    <>
      <ambientLight color={"white"} intensity={1} />
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[0, 50, 50]}
        intensity={5}
        castShadow
        shadow-mapSize={[512, 512]} // Aumenta si necesitas más resolución de sombra
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={1}
      />
    </>
  );
};

export default Lights;
