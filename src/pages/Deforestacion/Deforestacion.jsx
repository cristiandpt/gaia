/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";

const Deforestacion = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Gaia name="Deforestación" />
            </div>
        </>
    );
};

export default Deforestacion;
