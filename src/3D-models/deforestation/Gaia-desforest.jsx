import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./Deforestation.css";

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
      scale={[5, 5, 5]}
      position={[0, 5, -4]}
      rotation={[0, 1.5 * Math.PI, 0 * Math.PI]}
    />
  );
};

export default GaiaModel;
