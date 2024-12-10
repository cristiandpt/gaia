/* eslint-disable react/no-unknown-property */
import React from "react";
import { Navbar } from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "../Cinnamoroll/Cinnamoroll"; // Asegúrate de que la ruta sea correcta
import { Canvas } from "@react-three/fiber";
import Gaia from "../../Modelos3D/home/Gaia-inicio";
import Text from "./Text";
import Gates from "../../Modelos3D/home/Gates";
import { A11y, A11yAnnouncer } from "@react-three/a11y";
import "./Inicio.css";

const Inicio = () => {
  return (
    <>
      {/* Anunciador de accesibilidad */}
      <A11yAnnouncer />

      <Navbar />

      <div className="canvas-container">
        {/* Modelo Gaia con accesibilidad */}
        <A11y
          role="button"
          description="Modelo Gaia interactivo, haga clic para explorar más"
          actionCall={() => console.log("Interacción con Gaia")}
        >
          <Gaia name={"Inicio"} />
        </A11y>

        {/* Modelo Gates con accesibilidad */}
        <A11y
          role="button"
          description="Modelo Gates interactivo, haga clic para explorar detalles"
          actionCall={() => console.log("Interacción con Gates")}
        >
          <Gates />
        </A11y>

        {/* Texto con accesibilidad */}
        <A11y
          role="contentinfo"
          description="Texto descriptivo sobre el proyecto Gaia"
        >
          <Text />
        </A11y>
      </div>
    </>
  );
};

export default Inicio;
