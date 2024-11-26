import { useGLTF } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useNavigate } from "react-router-dom";
import { Object3D } from "three";
import PortalStage from "../../components/Portal";

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
				navigate("/loss-of-biodiversity");
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
		<>
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
			<PortalStage
				texture={"imagenes/near.hdr"}
				name="Erosion"
				color={"#df8d52"}
				active={""}
				setActive={(her) => console.log(her)}
				hovered={""}
				setHovered={(her) => console.log(her)}
				position={[
					CollidersDefinition[1].position[0] + 0.05,
					CollidersDefinition[1].position[1] - 0.8,
					CollidersDefinition[1].position[2],
				]}
				rotation={CollidersDefinition[1].rotation}
			>
				<></>
			</PortalStage>
			<PortalStage
				texture={"imagenes/near.hdr"}
				name="Bioversidad"
				color={"#df8d52"}
				active={""}
				setActive={(her) => console.log(her)}
				hovered={""}
				setHovered={(her) => console.log(her)}
				position={[
					CollidersDefinition[0].position[0],
					CollidersDefinition[0].position[1] - 0.8,
					CollidersDefinition[0].position[2],
				]}
				rotation={CollidersDefinition[0].rotation}
			>
				<></>
			</PortalStage>
			<PortalStage
				texture={"imagenes/near.hdr"}
				name="Deforestación"
				color={"#df8d52"}
				active={""}
				setActive={(her) => console.log(her)}
				hovered={""}
				setHovered={(her) => console.log(her)}
				position={[
					CollidersDefinition[2].position[0],
					CollidersDefinition[2].position[1] - 0.8,
					CollidersDefinition[2].position[2],
				]}
				rotation={CollidersDefinition[2].rotation}
			>
				<></>
			</PortalStage>
			<PortalStage
				texture={"imagenes/near.hdr"}
				name="Ayuda"
				color={"#df8d52"}
				active={""}
				setActive={(her) => console.log(her)}
				hovered={""}
				setHovered={(her) => console.log(her)}
				position={[
					CollidersDefinition[3].position[0],
					CollidersDefinition[3].position[1] - 0.8,
					CollidersDefinition[3].position[2],
				]}
				rotation={CollidersDefinition[3].rotation}
			>
				<></>
			</PortalStage>
		</>
	);
};

export default MainGates;
