import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  // Carga del modelo GLB
  const { scene } = useGLTF('3D-models/biodiversity/IslaElefante.glb');

  // Activamos las sombras en cada mesh del modelo
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Proyecta sombra
      node.receiveShadow = true; // Recibe sombra
    }
  });

  return <primitive object={scene} scale={[5, 5, 5]} position={[7, -18, -20]} />;
}

export default function ElephantIland() {
    return (
      <Canvas
        shadows={{ type: 'soft' }} // Habilitar sombras suaves
        camera={{ position: [30, 30, 0], fov: 50 }} // Ajustar la cámara
        style={{ height: '100vh', width: '100vw' }} // Tamaño pantalla completa
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

  