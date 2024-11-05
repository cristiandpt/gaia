import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./bio.css";

const GaiaModel = (props) => {
  // Carga del modelo GLB
  const { scene } = useGLTF("3D-models/Gaia4.glb");

  // Activamos las sombras en cada mesh del modelo
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  return (
    <primitive
      object={scene}
      scale={[20, 20, 20]}
      position={[0, -5, 10]}
      rotation={[0, 2 * Math.PI, 0]}
    />
  );
};

export default GaiaModel;
