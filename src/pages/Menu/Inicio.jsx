import React from "react";
import { Navbar } from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "../Cinnamoroll/Cinnamoroll"; // Asegúrate de que la ruta sea correcta
import Gates from "../../Modelos3D/Maingates";
import Bienvenida from "./bienvenida"; // Asegúrate de que la ruta sea correcta
import CuidadoMedioAmbiente from "./cuidado"; // Asegúrate de que la ruta sea correcta
import "./Inicio.css"

const Inicio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <Gates />
            </div>
            <Bienvenida />
            <CuidadoMedioAmbiente />
        </>
    );
};

export default Inicio;
