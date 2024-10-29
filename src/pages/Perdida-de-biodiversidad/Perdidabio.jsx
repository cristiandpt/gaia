/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import { Canvas } from "@react-three/fiber";
import ElephantIland from "../../Modelos3D/biodiversity/ElephantIsland";


const Perdidabio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <ElephantIland name='Perdidad de Biodiversidad' />
            </div>
        </>
    );
};

export default Perdidabio;
