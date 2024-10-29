/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";

const Erosion = () => {
    return (
        <>
            <Navbar />
            <h1 className="title">Deforestación</h1>
            <div className="canvas-container">
                {/* Pasa el nombre "Deforestación" a Gaia */}
                <Gaia name="Erosion" />
            </div>
        </>
    );
};

export default Erosion;
