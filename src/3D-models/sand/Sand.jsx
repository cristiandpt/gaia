import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function Sand() {
  const fbx = useLoader(FBXLoader, "3D-models/sand/model.fbx");
  return <primitive object={fbx} />;
}
