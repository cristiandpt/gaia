import { Navbar } from "../../components/Navbar.jsx";
import Gaia from "../../3D-models/Gaia.jsx";
import Deforestation from "../../3D-models/deforestation/Deforestation.jsx";
import "./Deforest.css"; // CSS adicional para los textos fijos

const DeforestationPage = () => {
	return (
		<>
			<Navbar />
			<div className="canvas-container">
				<Deforestation name="Deforestación Mundial" />
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
