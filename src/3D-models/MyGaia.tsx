import { useEffect } from "react";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import "./Gaia.css";
import { Object3D } from "three";

function Gaiam() {
	const gltf = useGLTF("3D-models/Gaia4.glb");

	useEffect(() => {
		// Traverse each child mesh to enable casting and receiving shadows
		gltf.scene.traverse((child: Object3D) => {
			child.castShadow = true;
			child.receiveShadow = true;
		});
	}, [gltf]);

	return (
		<primitive
			castShadow
			receiveShadow
			object={gltf.scene}
			scale={10}
			position={[0, 5, 0]}
		/>
	);
}

const MyGaia = () => {
	return (
		<Suspense fallback={null}>
			<Gaiam />
		</Suspense>
	);
};

export default MyGaia;
