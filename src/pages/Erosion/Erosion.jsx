/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState } from "react";
import { Navbar } from "../Componenetes/Navbar";
import Gaia from "../../Modelos3D/Gaia";
import ErosionPlane from "../../Modelos3D/ErosionPlane";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MyGaia from "../../Modelos3D/MyGaia";
import Sun from "./Sun";

const Erosion = () => { 
    
    const dialog = [" Hola Cristian. Ahora seguimos explorando el problema de la erosión.", 
    "La erosón degrada mi superficie, hace perder de ésta la vitalidad, la fuerza para producir el fruto de la tierra.", 
    "Sin fruto, los animales padecen y la tierra se convierte en árida, desértica y seol de los bioverrsidad."]
    
    const [currentText, setCurrentText] = useState("");
    const [textVisible, setTextVisible] = useState(false);
    var textIndex = 0;

    useEffect(() => {
        // Set up a timer
        const timerId = setInterval(() => {
          if (textIndex == 3) {
            setTextVisible(false)
            //clearTimeout(timerId);
          } else {
            setTextVisible(true);
            setCurrentText(dialog[textIndex]);
            textIndex++;
          }
        }, 3000); // Adjust time as needed
    
        // Cleanup function to clear the timer on unmount
        return () => {
          clearInterval(timerId);
        };
      }, []); 

    return (
        <>
            <Navbar />
            <h1 className="title text-primary">Erosión</h1>
            <div className="mt-24 h-screen w-screen">
            <Canvas 
                shadows
                camera={{ position: [0, 5, 15] }} 
                className="bg-beige h-screen w-screen">
                  
                <ambientLight intensity={0.3} /> {/* Low ambient light for softer global illumination */}
                
                <pointLight
                  position={[6, 10, 4]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  shadow-camera-near={0.1}    // Near clip for shadows
                  shadow-camera-far={50}      // Far clip for shadows
                />

      {/* Ground plane to receive shadows */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.001, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.7} />
      </mesh>


                    <Suspense fallback={null}>
                  <group receiveShadow castShadow position={[0, 0, 0]}>
             
                  {/* Puedes ajustar posiciones y rotaciones de cada uno */}
                  {textVisible && <Html position={[8, 8, 0]} center>
                    <div 
                    className="px-4 py-4"
                    style={{ width:"200px",  color: 'white', background: 'black' }}>
                       {currentText}  
                    </div>   
                </Html>
                }
                <MyGaia />
                <ErosionPlane /> {/* Posiciona el segundo modelo respecto al primero */}
            </group>
            </Suspense>
            <OrbitControls />
                    <Environment preset="sunset"/>
                </Canvas>
            </div>
        </>
    );
};

export default Erosion;
