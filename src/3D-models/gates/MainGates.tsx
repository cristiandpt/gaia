import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Object3D } from "three";

const MainGates = () => {
	const { scene } = useGLTF("3D-models/home/Main-gates.glb");

	scene.traverse((child: Object3D) => {
		child.castShadow = true; // Proyecta sombra
		child.receiveShadow = true; // Recibe sombra
	});

	return (
		<RigidBody
			name="gates"
			colliders="hull"
			type="fixed"
			onCollisionEnter={({ manifold, target, other }) => {
				console.log("Collision point", manifold.solverContactPoint(0));
				console.log(target);
				console.log(other);
			}}
		>
			<primitive
				name="gates"
				object={scene}
				position={[0, -2.5, -2]}
				scale={[0.35, 0.4, 0.5]}
				rotation={[0, -Math.PI / 2, 0]}
			/>
		</RigidBody>
	);
};

export default MainGates;
