/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";

const Erosion = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Gaia name="Erosion" />
            </div>
        </>
    );
};

export default Erosion;
