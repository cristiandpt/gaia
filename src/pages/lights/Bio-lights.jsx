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
        shadow-mapSize={[1024, 1024]} // Aumenta si necesitas más resolución de sombra
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={1}
      />
    </>
  );
};

export default Lights;
