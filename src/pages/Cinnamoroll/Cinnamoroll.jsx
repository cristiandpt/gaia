/* eslint-disable react/no-unknown-property */
import './Cinnamoroll.css';
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import CinnamorollHead from "./CinnamorollHead";

/**
 * The Cinnamoroll component sets up a 3D scene using React Three Fiber,
 * featuring the animated CinnamorollHead and controls for interacting with the scene.
 *
 * @returns {JSX.Element} The complete Cinnamoroll scene with a 3D head model and user controls.
 */
const Cinnamoroll = () => {
    return (
        <>
        {/* Title displayed above the canvas */}
        <h1 className="title">Cinnamoroll</h1>
        
        {/* Canvas where the 3D scene is rendered */}
        <Canvas
            camera={{
                position: [2, 0, 5],  // Initial camera position
            }}
        >
            {/* Lighting setup */}
            <ambientLight intensity={1.4} />
            <directionalLight position={[0, 10, 10]} />
            
            {/* Include the CinnamorollHead component in the scene */}
            <CinnamorollHead />
            
            {/* Add trackball controls to enable user interaction with the scene */}
            <TrackballControls />
        </Canvas>
        </>
    );
};

export default Cinnamoroll;
