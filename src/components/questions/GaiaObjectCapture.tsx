import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
	Suspense,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "../../3D-models/Gaia.css";
import Lights from "../../pages/lights/Inicio-lights.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import DialogType from "../../types/MainDialogs";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { GaiaCapturePlane } from "./GaiaCapturePlane";
import { Drop } from "./models/Drop";
import { Trowel } from "./models/Trowel";
import { HatChet } from "./models/HatChet";
import { WaterCan } from "./models/WaterCan";
import { FallingBall } from "../../pages/Deforest/Deforest";
import useQuizStore from "../../pages/Quiz/quiz-store";

function GaiaModel() {
	const { scene } = useGLTF("3D-models/Gaia4.glb");
	const gaiaRef = useRef();
	const [canMove, setCanMove] = useState(true); // Estado para controlar el movimiento
	// Parameters for oscillatory movement
	const floatSpeed = 0.5; // Movement speed
	const floatHeight = 0.1; // Oscillation height
	const floatFrequency = 2; // Oscillation frequency
	// Initial Y position
	const initialPositionY = 0; // Initial Y position of Gaia

	const { increaseScore } = useQuizStore();

	useFrame((state, delta) => {
		if (gaiaRef.current) {
			const gaiaPosition = gaiaRef.current.translation();
			const newY =
				initialPositionY +
				Math.sin(Date.now() * floatFrequency * 0.001) * floatHeight; // Oscillatory movement

			gaiaRef.current.setTranslation(
				{
					x: gaiaPosition.x,
					y: newY,
					z: gaiaPosition.z,
				},
				true,
			);
		}
	});

	const handleKeyDown = useCallback(
		(e) => {
			if (!gaiaRef.current) return;

			const translation = gaiaRef.current.translation();
			switch (e.key) {
				case "ArrowLeft":
					if (translation.x > -10) {
						gaiaRef.current.setTranslation(
							{
								x: translation.x - floatSpeed,
								y: translation.y,
								z: translation.z,
							},
							true,
						);
					}
					break;
				case "ArrowRight":
					if (translation.x < 10) {
						gaiaRef.current.setTranslation(
							{
								x: translation.x + floatSpeed,
								y: translation.y,
								z: translation.z,
							},
							true,
						);
					}
					break;
				case "a": // Turn left
					gaiaRef.current.setRotation(
						{
							x: 0,
							y: gaiaRef.current.rotation().y + 0.05,
							z: 0,
						},
						true,
					);
					break;
				case "d": // Turn right
					gaiaRef.current.setRotation(
						{
							x: 0,
							y: gaiaRef.current.rotation().y - 0.05,
							z: 0,
						},
						true,
					);
					break;
				default:
					break;
			}
		},
		[canMove],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<RigidBody
			ref={gaiaRef}
			name="gaia"
			colliders="cuboid"
			type="dynamic"
			gravityScale={0}
			onCollisionEnter={({ manifold, target, other }) => {
				increaseScore(20);
				console.log("Collision point", manifold.solverContactPoint(0));
				console.log(target);
				console.log(other);
			}}
		>
			<primitive
				object={scene}
				scale={[5, 5, 5]}
				position={[0, initialPositionY, 12]} // Usar la posición inicial
				rotation={[0, -Math.PI / 2, 0]}
			/>
		</RigidBody>
	);
}

const ModelFactory = (index: number, position: number[]) => {
	switch (index) {
		case 1:
			return (
				<RigidBody
					name="drop"
					colliders="cuboid"
					type="dynamic"
					gravityScale={0}
					friction={1.5}
					onCollisionEnter={({ manifold, target, other }) => {
						console.log("Collision drop", manifold.solverContactPoint(0));
						console.log(target);
						console.log(other);
					}}
				>
					<Drop position={position} scale={60} />
				</RigidBody>
			);
		case 2:
			return (
				<RigidBody
					name="trowel"
					colliders="cuboid"
					type="dynamic"
					gravityScale={0}
					friction={1.5}
					onCollisionEnter={({ manifold, target, other }) => {
						console.log("Collision trowel", manifold.solverContactPoint(0));
						console.log(target);
						console.log(other);
					}}
				>
					<Trowel position={position} scale={20} rotation={[0.7, 0, 0]} />;
				</RigidBody>
			);
		case 3:
			return (
				<RigidBody
					name="hatchet"
					colliders="cuboid"
					type="dynamic"
					gravityScale={0}
					friction={1.5}
					onCollisionEnter={({ manifold, target, other }) => {
						console.log("Collision hatchet", manifold.solverContactPoint(0));
						console.log(target);
						console.log(other);
					}}
				>
					<HatChet position={position} scale={20} rotation={[0, 2, 0]} />;
				</RigidBody>
			);
		case 4:
			return (
				<RigidBody
					name="watercan"
					colliders="cuboid"
					type="dynamic"
					gravityScale={0}
					friction={1.5}
					onCollisionEnter={({ manifold, target, other }) => {
						console.log("Collision watercan", manifold.solverContactPoint(0));
						console.log(target);
						console.log(other);
					}}
				>
					<WaterCan position={position} scale={15} rotation={[0, 2, 0]} />;
				</RigidBody>
			);
		default:
			return <></>;
	}
};

const RandonizeComponent = () => {
	const { size } = useThree();
	const [instances, setInstances] = useState([]);
	const [indices, setIndices] = useState([1, 2, 3, 4]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (indices.length === 0) {
				setIndices([1, 2, 3, 4]); // Reset the indices array
			}

			const randomIndex = Math.floor(Math.random() * indices.length);
			const selectedIndex = indices[randomIndex];
			const newIndices = indices.filter((_, i) => i !== randomIndex);
			setIndices(newIndices);

			const randomX = (Math.random() - 0.5) * 60;
			const newInstance = {
				component: ModelFactory(selectedIndex, [randomX, 15, 10]),
				position: [randomX, 800 / 2, 0],
				id: Date.now(), // Unique ID for each instance
			};
			setInstances((prevInstances) => [...prevInstances, newInstance]);

			// Remove the instance after a certain time
			setTimeout(() => {
				setInstances((prevInstances) =>
					prevInstances.filter((instance) => instance.id !== newInstance.id),
				);
			}, 5000); // Remove after 5 seconds
		}, 2000); // Instantiate a new model every 2 seconds

		return () => clearInterval(interval);
	}, [size]);
	return instances.map((c) => <RigidBody key={c.id}> {c.component}</RigidBody>);
};

const GaiaObjectCapture = () => {
	const [ballDropped, setBallDropped] = useState(false);
	const [balls, setBalls] = useState([]);
	const [gameSpeed, setGameSpeed] = useState(1);
	const { score } = useQuizStore();

	const handleBallDrop = () => {
		if (!ballDropped) {
			setBallDropped(true);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const newBall = {
				position: [
					Math.random() * 10 - 5, // x
					10, // y (empezar arriba de la pantalla)
					Math.random() * 10 - 5, // z
				],
				type: Math.random() > 0.5 ? "positive" : "negative",
			};
			setBalls((prev) => [...prev, newBall]);
		}, 5000); // cada 20 segundos

		return () => clearInterval(interval);
	}, []);

	return (
		<Canvas
			camera={{
				position: [0, 5, 20],
			}}
			shadows
		>
			<Html position={[12, 10, 0]}>
				<p>{score}</p>
			</Html>
			<Html
				center
				style={{
					width: "90vw",
					display: "flex",
					justifyContent: "space-between",
				}}
				position={[0, 0, 0]}
			>
				<FaArrowCircleLeft
					style={{
						height: "7rem",
						width: "7rem",
						color: "rgba(255, 255, 255, 0.25)",
					}}
				/>
				<FaArrowCircleRight
					style={{
						height: "7rem",
						width: "7rem",
						color: "rgba(255, 255, 255, 0.25)",
					}}
				/>
			</Html>
			<Lights />
			{/* Aumentada la intensidad */}
			{/* Modelos de Gaia y MainGates */}
			<Environment
				files="imagenes/satara_night_no_lamps_4k.hdr"
				background
				backgroundIntensity={1} // optional intensity factor
				backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation
				environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
				environmentRotation={[0, Math.PI / 2, 0]}
			/>
			<OrbitControls />
			<Suspense fallback={null}>
				<Physics debug>
					<RandonizeComponent />
					{balls.map((a) => (
						<FallingBall position={[8, 10, 8]} />
					))}
					<GaiaCapturePlane position={[0, -11, 2]} scale={[10, 10, 10]} />
					<GaiaModel />
				</Physics>
			</Suspense>
		</Canvas>
	);
};

export default GaiaObjectCapture;