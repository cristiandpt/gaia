import { Navbar } from "../../components/Navbar.jsx";
import Gaia from "../../3D-models/Gaia.jsx";
import {
	DeforestationModel1,
	DeforestationModel,
} from "../../3D-models/deforestation/Deforestation.jsx";
import "./Deforest.css"; // CSS adicional para los textos fijos
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

const DeforestationPage = () => {
	return (
		<>
			<Navbar />
			<div className="canvas-container">
				<div className="canvas-container">
					<Canvas shadows camera={{ position: [0, 0, 15] }}>
						<ambientLight intensity={0.5} />
						<directionalLight
							position={[10, 10, 10]}
							intensity={0.7}
							castShadow
						/>
						<Suspense fallback={null}>
							<DeforestationModel1 />
							<DeforestationModel2 />
							<OrbitControls enableZoom={false} />
						</Suspense>
						<Environment preset="sunset" />
					</Canvas>
					<div className="fixed-text">{name}</div>
				</div>
				<div className="info-text">
					<h2>Impacto de la Deforestación</h2>
					<p>
						La deforestación causa la pérdida de biodiversidad, el cambio
						climático y la destrucción de hábitats esenciales.
					</p>
					<p>
						Cada año, millones de hectáreas de bosques son taladas, amenazando
						la vida de innumerables especies.
					</p>
				</div>
			</div>
		</>
	);
};

export default DeforestationPage;
