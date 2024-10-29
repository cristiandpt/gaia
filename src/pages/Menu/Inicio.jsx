/* eslint-disable react/no-unknown-property */
import React from "react";
import {Navbar} from "../Componenetes/Navbar"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "../Cinnamoroll/Cinnamoroll"; // Asegúrate de que la ruta sea correcta
import { Canvas } from "@react-three/fiber";

const Menu = () => {
    return (
    <>
    <Navbar/>
    <Cinnamoroll/>
    </>
    );
};

export default Menu;
