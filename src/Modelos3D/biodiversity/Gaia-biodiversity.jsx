import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./bio.css";

function Model() {
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
      className="bg-transparent"
      object={scene}
      scale={[20, 20, 20]}
      position={[0, -5, 10]}
    />
  );
}

export default function Gaia() {
  return (
    <Canvas
      shadows={{ type: "soft" }} // Habilitar sombras suaves
      camera={{ position: [30, 30, 0], fov: 50 }} // Ajustar la cámara
      gl={{ alpha: true }}
      className="parent"
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        background: "transparent",
      }} // Tamaño pantalla complet
    >
      {/* Luz ambiental para iluminación general */}
      <ambientLight intensity={2} />

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
