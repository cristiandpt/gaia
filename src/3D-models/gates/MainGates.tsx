import { useGLTF } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useNavigate } from "react-router-dom";
import { Object3D } from "three";

const MainGates = () => {
	const { scene } = useGLTF("3D-models/home/Main-gates.glb");

	scene.traverse((child: Object3D) => {
		child.castShadow = true;
		child.receiveShadow = true;
	});

	const navigate = useNavigate();

	const GenerateCuboideCollider = (
		position: Vector3,
		rotation: Euler,
		onEnteringHandler: () => void,
	) => (
		<CuboidCollider
			args={[0.7, 1.75, 0.25]}
			sensor
			position={position}
			rotation={rotation}
			onIntersectionEnter={onEnteringHandler}
		/>
	);

	const CollidersDefinition: {
		position: Vector3;
		rotation: Euler;
		onEnteringHandler: () => void;
	}[] = [
		{
			position: [2.9, -0.5, -3.8],
			rotation: [0, -(Math.PI / 3), 0],
			onEnteringHandler: () => {
				navigate("/deforest");
			},
		},
		{
			position: [1.2, -0.5, -4.7],
			rotation: [0, -(Math.PI / 18), 0],
			onEnteringHandler: () => {
				navigate("/loss - of - biodiversity");
			},
		},
		{
			position: [-1.1, -0.5, -4.6],
			rotation: [0, Math.PI / 8, 0],
			onEnteringHandler: () => {
				navigate("/erosion");
			},
		},
		{
			position: [-2.25, -0.5, -3.3],
			rotation: [0, Math.PI / 2.4, 0],
			onEnteringHandler: () => {},
		},
	];

	const instatieateCubuidsColliders = () =>
		CollidersDefinition.map((collider) =>
			GenerateCuboideCollider(
				collider.position,
				collider.rotation,
				collider.onEnteringHandler,
			),
		);

	return (
		<RigidBody name="gates" colliders="hull" type="fixed" friction={1.5}>
			<primitive
				name="gates"
				object={scene}
				position={[0, -2.5, -3]}
				scale={[0.35, 0.4, 0.5]}
				rotation={[0, -Math.PI / 2, 0]}
			/>
			{instatieateCubuidsColliders()}
		</RigidBody>
	);
};

export default MainGates;
