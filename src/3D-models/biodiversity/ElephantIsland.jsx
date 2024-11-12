import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ElephantIlandModel = (props) => {
  // Carga del modelo GLB
  const { scene } = useGLTF("3D-models/biodiversity/IslaElefante.glb");

  // Activamos las sombras en cada mesh del modelo
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  return (
    <primitive object={scene} scale={[5, 5, 5]} position={[0, -15, -20]} />
  );
};

export default ElephantIlandModel;
