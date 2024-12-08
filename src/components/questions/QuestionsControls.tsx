import { OrbitControls } from "@react-three/drei";

const QuestionControl = () => {
  return (
    <OrbitControls
      maxPolarAngle={Math.PI / 2} // Limit the rotation downwards
      minPolarAngle={Math.PI / 2} // Lock the rotation upwards
      minAzimuthAngle={-Math.PI / 2} // -45 grados a la izquierda
      maxAzimuthAngle={Math.PI / 2} // 45 grados a la derecha
      maxDistance={14} // Ajusta para acercar/alejar más finamente
      minDistance={14}
      enableZoom={false}
      enablePan={false} // Deshabilita el paneo
    />
  );
};
export default QuestionControl;
