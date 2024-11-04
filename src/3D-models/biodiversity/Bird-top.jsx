import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./bio.css";

const BirdModel = (props) => {
	// Carga del modelo GLB
	const { scene } = useGLTF("3D-models/biodiversity/Bird-top.glb");

	// Activamos las sombras en cada mesh del modelo
	scene.traverse((node) => {
		if (node.isMesh) {
			node.castShadow = true; // Proyecta sombra
			node.receiveShadow = true; // Recibe sombra
		}
	});

	return <primitive object={scene} scale={[3, 3, 3]} position={[5, 8, -18]} />;
};

export default BirdModel;
