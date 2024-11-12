/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useLayoutEffect } from "react";
import ErosionPlane from "../../3D-models/ErosionPlane.jsx";
import { Canvas } from "@react-three/fiber";
import MyGaia from "../../3D-models/MyGaia.jsx";
import CherryTree from "../../3D-models/cherry-tree/CherryTree.jsx";
import Loader from "../../shared/3DModelLoader";
import { useFrame } from "@react-three/fiber";

import {
	Environment,
	Html,
	OrbitControls,
	useGLTF,
	useScroll,
} from "@react-three/drei";
import ErosionScrollControl from "../../controls/ErosionScrollControl.js";
import { Soil } from "../../3D-models/soil/Soil.jsx";
import NavbarHome from "../../components/NavbarHome.js";
import GaiaDialog from "../../components/GaiaDialog.js";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

//useGLTF.preload("3D-models/cherry-tree/scene.gltf");

const Erosion = () => {
	const dialog = [
		"Hola Cristian. Ahora seguimos explorando el problema de la erosión.",
		"La erosón degrada mi superficie, hace perder de ésta la vitalidad, la fuerza para producir el fruto de la tierra.",
		"Sin fruto, los animales padecen y la tierra se convierte en árida, desértica y seol de los bioverrsidad.",
		"Haz click para empezar a explorar el problema de la erosión."
	];

	const erosionProblems = [
		"Pérdida de Nutrientes: La erosión arrastra la capa superior del suelo, rica en nutrientes esenciales para las plantas.",
		"Disminución de la Fertilidad: La fertilidad del suelo se ve comprometida, requiriendo más fertilizantes y aumentando la contaminación.",
		"Reducción de la Absorción de Agua: La erosión dificulta la infiltración del agua, provocando escorrentías e inundaciones.",
		"Falta de Biodiversidad: La erosión destruye hábitats naturales, llevando a la pérdida de especies vegetales y animales.",
		"Desarrollo de Arenas y Polvo: La erosión transforma suelos fértiles en desiertos de arena, aumentando la desertificación.",
		"Contaminación por Humo: La quema de residuos agrícolas genera humo, contaminando el aire y contribuyendo al cambio climático."
	];

	const [currentText, setCurrentText] = useState<string>("");
	const [textVisible, setTextVisible] = useState<boolean>(false);
	let textIndex = 0;
	const [index, setIndex] = useState(0);
	

	/* useEffect(() => {
        const interval = setInterval(() => {
			if ( index < erosionProblems.length - 1) {
				setIndex((prevIndex) => (prevIndex + 1) % erosionProblems.length);	
			}
        }, 2000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []); */

	useEffect(() => {
		// Set up a timer
		const timerId = setInterval(() => {
			if (textIndex == 4) {
				setTextVisible(false);
				clearInterval(timerId);
			} else {
				setTextVisible(!textVisible);
				setCurrentText(dialog[textIndex]);
				textIndex++;
			}
		}, 3000); //three seconds for text interleaving

		// Cleanup function to clear the timer on the last text
		return () => {
			clearInterval(timerId);
		};
	}, []);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startPresentation = () => {
        if (!isActive) {
            setIsActive(true);
            const id = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % erosionProblems.length);
            }, 5000);
            setIntervalId(id);
        }
    };

    const stopPresentation = () => {
        if (isActive) {
            if (intervalId) clearInterval(intervalId);
            setIsActive(false);
        }
    };

    useEffect(() => {
        return () => { 
			if (intervalId) {
			clearInterval(intervalId);}
		}
    }, [intervalId]);

	return (
		<>
			<NavbarHome />
				<Canvas
				    className="h-screen w-screen"
					shadows
					camera={{ position: [0, 5, 15] }}
				>
					<ambientLight intensity={0.3} />{" "}
					{/* Low ambient light for softer global illumination */}
					<pointLight
						position={[6, 10, 4]}
						intensity={1.5}
						castShadow
						shadow-mapSize-width={1024}
						shadow-mapSize-height={1024}
						shadow-camera-near={0.1} // Near clip for shadows
						shadow-camera-far={50} // Far clip for shadows
					/>
					{/* Ground plane to receive shadows */}
					<mesh
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -4.09, 0]}
					>
						<planeGeometry args={[500, 500]} />
						<shadowMaterial opacity={0.7} />
					</mesh>
					<Suspense fallback={<Loader />}>
						<group receiveShadow castShadow position={[0, 0, 0]}>
							{/* Puedes ajustar posiciones y rotaciones de cada uno */}
							{textVisible && (
									<Html position={[8, 6, 0]} center>
										<div
											className="px-4 py-4 rounded-md bg-black/[0.5]"
											style={{
												width: "200px",
												color: "white",
												background: "black",
											}}
										>
											{currentText}
											{ (textVisible && !(textIndex >= 3)) && <button onClick={startPresentation} style={{ margin: '5px' }}>
                            Start Presentation
                        </button> }
                        { false && <button onClick={stopPresentation} disabled={!isActive} style={{ margin: '5px' }}>
                            Stop Presentation
                        </button>}
										</div>
									</Html>
							)}
							{isActive && <GaiaDialog say={erosionProblems[index]} position={[4, 5, 0]} /> }
				            <ErosionScrollControl>
								<MyGaia />
								{ isActive &&  <Soil position={[-3, 3, 1]}></Soil> }
								<CherryTree position={[8, -5, -5]} />
							</ErosionScrollControl>
							<ErosionPlane />{" "}
							<OrbitControls  enableZoom={false} />
							
							{/* Posiciona el segundo modelo respecto al primero */}
						</group>
					</Suspense>
					<Environment
					ground={
						{
							height: 20,
						}
					}
					files="/imagenes/qwantani_dusk_2_2k.hdr"
					background
					backgroundIntensity={1} // optional intensity factor
					backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation
					environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
				     
				/>
				</Canvas>
		</>
	);
};

export default Erosion;
