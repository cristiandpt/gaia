/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/Gaia";

const Perdidabio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Gaia name='Perdidad de Biodiversidad' />
            </div>
        </>
    );
};

export default Perdidabio;
