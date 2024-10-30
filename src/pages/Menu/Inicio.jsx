/* eslint-disable react/no-unknown-property */
import React from "react";
import {Navbar} from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "../Cinnamoroll/Cinnamoroll"; // Asegúrate de que la ruta sea correcta
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/Gaia";
import Lights from "../../pages/lights/Lights";
import "./Inicio.css"

<<<<<<< HEAD
const Inicio = () => {
=======

const Menu = () => {
>>>>>>> 0ea1773 (Biodiversity changes)
    return (
        <>
            <Navbar/>
            <div className="canvas-container">
<<<<<<< HEAD
                <Gaia name={"Inicio"} />
=======
                <Lights />
                <Gaia />
>>>>>>> 0ea1773 (Biodiversity changes)
            </div>
        </>
    );
};

export default Inicio;
