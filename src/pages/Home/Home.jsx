import React from "react";
import { Navbar } from "../../components/Navbar";
import Gates from "../../3D-models/Maingates";
import Welcome from "./Welcome"; // Asegúrate de que la ruta sea correcta
import "./Home.css";
import EnvironmentalCare from "./EnvironmentalCare";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="canvas-container">
        <Gates />
        <EnvironmentalCare />
      </div>
      <Welcome />
      
    </>
  );
};

export default LandingPage;
