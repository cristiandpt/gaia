/* eslint-disable react/no-unknown-property */
import React from "react";
import {Navbar} from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "../Cinnamoroll/Cinnamoroll"; // Asegúrate de que la ruta sea correcta
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/home/Gaia-inicio";
import Lights from "../../pages/lights/Lights";
import Text from "./Text"
import Gates from "../../Modelos3D/home/Gates"
import "./Inicio.css"

const Inicio = () => {
    return (
        <>
            <Navbar/>
            <div className="canvas-container">
                <Gaia name={"Inicio"} />
                <Gates />
                <Text />
            </div>
        </>
    );
};

export default Inicio;