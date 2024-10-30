import React from "react";
import { Navbar } from "../Componenetes/Navbar"; 
import Gates from "../../Modelos3D/Maingates";
import Bienvenida from "./bienvenida"; // Asegúrate de que la ruta sea correcta
import "./Inicio.css"
import CuidadoMedioAmbiente from "./cuidado";

const Inicio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Gates />
            </div>
            <Bienvenida />
            <CuidadoMedioAmbiente/>
        </>
    );
};

export default Inicio;
