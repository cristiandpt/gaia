import { OrbitControls } from "@react-three/drei";

const MainSceneControl = () => {
  return (
    <OrbitControls
      maxPolarAngl={Math.PI / 16} // Limita la rotación hacia abajo
      minAzimuthAngle={-Math.PI / 4} // -45 grados a la izquierda
      maxAzimuthAngle={Math.PI / 4} // 45 grados a la derecha
      maxDistance={6} // Ajusta para acercar/alejar más finamente
      minDistance={3}
      enablePan={false} // Deshabilita el paneo
    />
  );
};
export default MainSceneControl;
