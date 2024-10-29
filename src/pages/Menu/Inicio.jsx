/* eslint-disable react/no-unknown-property */
import React from "react";
import {Navbar} from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta// Asegúrate de que la ruta sea correcta
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/Gaia";
import Lights from "../../pages/lights/Lights";
import "./Inicio.css"


const Menu = () => {
    return (
        <>
            <Navbar/>
            <div className="canvas-container">
                <Lights />
                <Gaia />
            </div>
        </>
    );
};

export default Menu;
