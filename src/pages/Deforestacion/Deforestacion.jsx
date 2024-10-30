/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";
import Desforestation from "../../Modelos3D/desforestation/Desforestation1.jsx"

const DeforestacionPage = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Desforestation/>
            </div>
        </>
    );
};

export default DeforestacionPage;
