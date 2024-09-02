import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import House from "./House";

const Cinnamoroll = () => {
    return (
        <>
        <h1 className="title">Cinnamoroll</h1>
        <Canvas
            camera={{
                position: [2, 0, 5]
            }}
        >
            <OrbitControls />
            <ambientLight intensity={1.2} />
            <directionalLight position={[0, 10, 10]} />
        <House/>
        </Canvas>
        </>
    );
};
export default Cinnamoroll;