/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";

const Deforestacion = () => {
    return (
        <>
            <Navbar />
            <h1 className="title">Deforestación</h1>
            <div className="canvas-container">
                {/* Pasa el nombre "Deforestación" a Gaia */}
                <Gaia name="Deforestación" />
            </div>
        </>
    );
};

export default Deforestacion;
