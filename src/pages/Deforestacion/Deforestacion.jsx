// DeforestacionPage.jsx
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";
import Desforestation from "../../Modelos3D/desforestation/Desforestation1.jsx";
import './DeforestacionPage.css'; // CSS adicional para los textos fijos

const DeforestacionPage = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Desforestation name="Deforestación Mundial"/>
                <div className="info-text">
                    <h2>Impacto de la Deforestación</h2>
                    <p>La deforestación causa la pérdida de biodiversidad, el cambio climático y la destrucción de hábitats esenciales.</p>
                    <p>Cada año, millones de hectáreas de bosques son taladas, amenazando la vida de innumerables especies.</p>
                </div>
            </div>
        </>
    );
};

export default DeforestacionPage;
