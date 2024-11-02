import React from "react";
import { Navbar } from "../../components/Navbar";
import ElephantIland from "../../Modelos3D/biodiversity/ElephantIsland";
import BirdModel from "../../Modelos3D/biodiversity/Bird-top";
import Gaia from "../../Modelos3D/biodiversity/Gaia-biodiversity";
import Text1 from "../../pages/LossOfDiversity/Text1";
import "./LossOfDiversity.css";

const LossOfDiversity = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <ElephantIland name="Perdidad de Biodiversidad" />
        <BirdModel />
        <Gaia />
        <Text1 />
      </div>
    </>
  );
};

export default LossOfDiversity;
