import React from "react";
import { Navbar } from "../Componenetes/Navbar";
import ElephantIland from "../../Modelos3D/biodiversity/ElephantIsland";
import Text1 from "../../pages/Perdida-de-biodiversidad/Text1";
import "./Perdidabio.css"


const Perdidabio = () => {
    return (
        <>
            <Navbar />
            <div className="canvas-container">
                <ElephantIland name='Perdidad de Biodiversidad' />
                
                <Text1 />
            </div>
        </>
    );
};

export default Perdidabio;
