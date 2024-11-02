import { DirectionalLightHelper } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Lights from "../../pages/lights/Lights";

function Model() {
  // Carga del modelo GLB
  const { scene } = useGLTF("3D-models/home/Main-gates.glb");

  // Activamos las sombras en cada mesh del modelo
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  return (
    <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, -10, 0]} />
  );
}

export default function Gates() {
  return (
    <Canvas
      shadows={{ type: "soft" }} // Habilitar sombras suaves
      camera={{ position: [30, 30, 0], fov: 50 }} // Ajustar la cámara
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
      }} // Tamaño pantalla completa
    >
      {/* Luz ambiental para iluminación general */}

      <Lights />
      <Model />

      {/* OrbitControls con movimiento solo horizontal */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
