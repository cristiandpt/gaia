import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import ElephantIland from "../../Modelos3D/biodiversity/ElephantIsland";
import BirdModel from "../../Modelos3D/biodiversity/Bird-top";
import Text1 from "../../pages/Perdida-de-biodiversidad/Text1";
import "./Perdidabio.css"


const Perdidabio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <ElephantIland name='Perdidad de Biodiversidad' />
                <BirdModel />
                <Text1 />
            </div>
        </>
    );
};

export default Perdidabio;
