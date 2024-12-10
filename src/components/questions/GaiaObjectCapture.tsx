import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "../../3D-models/Gaia.css";
import Lights from "../../pages/lights/Inicio-lights.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import DialogType from "../../types/MainDialogs";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { GaiaCapturePlane } from "./GaiaCapturePlane";
import { Drop } from "./models/Drop";

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

const GaiaObjectCapture = () => {
	const [dialogType, setDialogType] = useState<DialogType>(DialogType.HELP);
	const [route, setRoute] = useState<string>("");

	const handleOnClickDialog = () => {};

	const onPortalEntered = (route: string) => {};

	useEffect(() => {}, []);

	return (
		<div className="canvas-container">
			<Canvas camera={{ position: [0, 5, 20] }} shadows>
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
				<Suspense fallback={null}>
					<Physics>
						<Drop />
						<GaiaCapturePlane position={[0, -11, 2]} scale={[10, 10, 10]} />
						<GaiaModel />
					</Physics>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default GaiaObjectCapture;