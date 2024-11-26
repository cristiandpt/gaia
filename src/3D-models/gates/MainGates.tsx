import { useGLTF } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Object3D } from "three";
import PortalStage from "../../components/Portal";

interface Props {
	onEnterPortal: (route: string) => void;
	onExitPortal: () => void;
}

const MainGates = ({ onEnterPortal, onExitPortal }: Props) => {
	const { scene } = useGLTF("3D-models/home/Main-gates.glb");

	scene.traverse((child: Object3D) => {
		child.castShadow = true;
		child.receiveShadow = true;
	});

	const GenerateCuboideCollider = (
		position: Vector3,
		rotation: Euler,
		onEnteringHandler: () => void,
		onExitingHandler: () => void,
	) => (
		<CuboidCollider
			args={[0.7, 1.75, 0.25]}
			sensor
			position={position}
			rotation={rotation}
			onIntersectionEnter={onEnteringHandler}
			onIntersectionExit={onExitingHandler}
		/>
	);

	const CollidersDefinition: {
		position: Vector3;
		rotation: Euler;
		onEnteringHandler: () => void;
		onExitHandler: () => void;
	}[] = [
		{
			position: [2.9, -0.5, -3.8],
			rotation: [0, -(Math.PI / 3), 0],
			onEnteringHandler: () => {
				onEnterPortal("/deforest");
			},
			onExitHandler: onExitPortal,
		},
		{
			position: [1.2, -0.5, -4.7],
			rotation: [0, -(Math.PI / 18), 0],
			onEnteringHandler: () => {
				onEnterPortal("/loss-of-biodiversity");
			},
			onExitHandler: onExitPortal,
		},
		{
			position: [-1.1, -0.5, -4.6],
			rotation: [0, Math.PI / 8, 0],
			onEnteringHandler: () => {
				onEnterPortal("/erosion");
			},
			onExitHandler: onExitPortal,
		},
		{
			position: [-2.25, -0.5, -3.3],
			rotation: [0, Math.PI / 2.4, 0],
			onEnteringHandler: () => {
				onEnterPortal("");
			},
			onExitHandler: onExitPortal,
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
				colorPortal="#2a0f09"
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
				colorPortal={"#1e2c01"}
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
				colorPortal={"#3b2d37"}
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
				colorPortal={"#23180f"}
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
