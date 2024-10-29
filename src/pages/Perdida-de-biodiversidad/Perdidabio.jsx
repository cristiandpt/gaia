/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/Gaia";

const Perdidabio = () => {
    return (
        <>
            <Navbar />
            <h1 className="title">Deforestación</h1>
            <div className="canvas-container">
                {/* Pasa el nombre "Deforestación" a Gaia */}
                <Gaia name='Perdidad de Biodiversidad' />
            </div>
        </>
    );
};

export default Perdidabio;
