// Credits:
/*
  "Cherry tree" (https://skfb.ly/6ZIBu) by matousekfoto is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 */
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "../Gaia.css";
import Lights from "../../pages/lights/Inicio-lights.jsx";
import MainGates from "../gates/MainGates";
import Floor from "../Floor.jsx";
import { Physics, RigidBody } from "@react-three/rapier";
import MainSceneControl from "../../controls/MainSceneControl";
import GaiaDialog from "../../components/GaiaDialog";
import Say from "react-say";
import DialogType from "../../types/MainDialogs";
import MainDialog from "../../components/main-dialog/MainDialog";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const gaiaDialogs = [
	"Hola, soy Gaia: La Tierra progenitora, fecunda y antepasada común de todos los dioses, hombres y seres vivos: Soy la  «madre universal», «madre de todos» o «gran madre». Seré tu acompañante en este viaje del cuidado",
	"Voy a cantar a la Tierra, madre universal, de sólidos cimientos, la más augusta, que nutre en su suelo todo cuanto existe. Cuanto camina por la divina tierra o por el ponto, o cuanto vuela, se nutre de tu exuberancia. Por ti se vuelven prolíficos y fructíferos, soberana, de ti depende dar la vida o quitársela a los hombres mortales»​",
];

function GaiaModel() {
	const { scene } = useGLTF("3D-models/Gaia4.glb");
	const gaiaRef = useRef();
	const [canMove, setCanMove] = useState(true); // Estado para controlar el movimiento
	// Parameters for oscillatory movement
	const floatSpeed = 0.1; // Movement speed
	const floatHeight = 0.1; // Oscillation height
	const floatFrequency = 2; // Oscillation frequency

	// Initial Y position
	const initialPositionY = -0.25; // Initial Y position of Gaia

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
					gaiaRef.current.setTranslation(
						{
							x: translation.x - floatSpeed,
							y: translation.y,
							z: translation.z,
						},
						true,
					);
					break;
				case "ArrowRight":
					gaiaRef.current.setTranslation(
						{
							x: translation.x + floatSpeed,
							y: translation.y,
							z: translation.z,
						},
						true,
					);
					break;
				case "ArrowUp":
					gaiaRef.current.setTranslation(
						{
							x: translation.x,
							y: translation.y,
							z: translation.z - floatSpeed,
						},
						true,
					);
					break;
				case "ArrowDown":
					gaiaRef.current.setTranslation(
						{
							x: translation.x,
							y: translation.y,
							z: translation.z + floatSpeed,
						},
						true,
					);
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
			friction={1.5}
			onCollisionEnter={({ manifold, target, other }) => {
				console.log("Collision point", manifold.solverContactPoint(0));
				console.log(target);
				console.log(other);
			}}
		>
			<primitive
				object={scene}
				scale={[3, 3, 3]}
				position={[0, initialPositionY, -2]} // Usar la posición inicial
				rotation={[0, -Math.PI / 2, 0]}
			/>
		</RigidBody>
	);
}

const dialogFactory = (type: DialogType) => {
	switch (type) {
		case DialogType.EROSION:
			return {
				title: "Erosion",
				say: "Vamos a explorar los problemas asociados con la erosión",
				position: [0, 0, 0],
				route: "/erosion",
			};
		case DialogType.BIOVERSITY:
			return {
				title: "Deforestación",
				say: "Vamos a explorar los problemas asociados a la deforestación",
				position: [1, 1, 0],
				route: "/loss-of-biodiversity",
			};
		case DialogType.DEFOREST:
			return {
				title: "Pérdida de la bioversidad",
				say: "Vamos a explorar los problemas asociados a la pérdida de biodiversidad",
				position: [-1, -1, 0],
				route: "/deforest",
			};
		default:
			return {
				title: "Ayuda",
				say: "Necesitas saber como navegar en la aplicación.",
				position: [0, 0, 0],
				route: "/help",
			};
	}
};

const MainScene = () => {
	const [isDialogVisible, setDialogVisible] = useState<boolean>(false);
	const [isDialogGaiaVisible, setDialogGaiaVisible] = useState<boolean>(true);
	const [dialogType, setDialogType] = useState<DialogType>(DialogType.HELP);
	const [route, setRoute] = useState<string>("");
	const navigate = useNavigate();
	const handleOnClickDialog = () => {
		navigate(route);
	};

	const handleCloseDialog = () => {
		setDialogVisible(false);
	};

	const onPortalEntered = (route: string) => {
		setRoute(route);
		setDialogVisible(true);
		switch (route) {
			case "/deforest":
				setDialogType(DialogType.DEFOREST);
				break;
			case "/loss-of-biodiversity":
				setDialogType(DialogType.BIOVERSITY);
				break;
			case "/erosion":
				setDialogType(DialogType.EROSION);
				break;
			default:
				setDialogType(DialogType.HELP);
				return null; // or some default configuration
		}
	};

	const dialogProps = dialogFactory(dialogType);

	useEffect(() => {
		if (isDialogGaiaVisible) {
			const timer = setTimeout(() => {
				setDialogGaiaVisible(false);
			}, 10000);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<div className="canvas-container">
			<Canvas camera={{ position: [0, 5, 20] }} shadows>
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
						<MainGates
							onEnterPortal={onPortalEntered}
							onExitPortal={handleCloseDialog}
						/>
						<GaiaModel />
						{/* Controles de la cámara */}
						<MainSceneControl />
						{/*<Floor />*/}
					</Physics>
				</Suspense>
				{isDialogGaiaVisible && (
					<GaiaDialog say={gaiaDialogs[0]} position={[3, 1, 0]} />
				)}
				{true && (
					<Html position={[1, 2.2, 0]}>
						<iframe
							className="custom-focus-outline"
							width="598"
							height="336"
							src={"videos/la_vida_del suelo.mp4"}
							title="¡La vida del suelo! Cortometraje🌎 - FAO"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</Html>
				)}
				{isDialogVisible && (
					<MainDialog
						title={dialogProps.title}
						say={dialogProps.say}
						position={dialogProps.position}
						onClickHandler={handleOnClickDialog}
					/>
				)}
				<Say
					pitch={1.1}
					rate={1.5}
					speak="A quick brown fox jumped over the lazy dogs."
					volume={0.8}
					text="A quick brown fox jumped over the lazy dogs"
				/>
			</Canvas>
		</div>
	);
};

export default MainScene;
