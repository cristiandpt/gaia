import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

export default function Untitle() {
  const obj = useLoader(OBJLoader, "3D-models/sand/untitled2_79.obj");
  return <primitive position={[0, 0, 5]} object={obj} />;
}
