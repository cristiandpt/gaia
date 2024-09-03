/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * The CinnamorollHead component creates a 3D model of a character's head with animated movement.
 * It uses React Three Fiber for rendering 3D objects and animates the position and rotation 
 * of the head based on the elapsed time.
 *
 * @returns {JSX.Element} The 3D model of Cinnamoroll's head with animated features.
 */
const CinnamorollHead = () => {

    // Ref to store a reference to the group containing the entire head model
    const cinnamorollRef = useRef();

    // This hook runs on every frame, animating the position and rotation of the head
    useFrame(({ clock }) => {
        if (cinnamorollRef.current) {
            const t = clock.getElapsedTime();
            
            // Set the position of the head, making it move in a circular path
            cinnamorollRef.current.position.x = Math.sin(t) * 3;
            cinnamorollRef.current.position.y = Math.cos(3 * t) * 1;
            
            // Apply rotation to the head over time
            cinnamorollRef.current.rotation.x = t * 0.5;
            cinnamorollRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <group ref={cinnamorollRef} name="cinnamoroll" scale={[1, 1, 1]}>
            {/* The base of the head */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} name="HeadBase">
                <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            {/* The left ear */}
            <mesh position={[-1.5, 0, 0]} rotation={[1, Math.PI / 4, Math.PI / 2]} name="LeftEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            {/* The right ear */}
            <mesh position={[1.5, 0, 0]} rotation={[1, -Math.PI / 4, -Math.PI / 2]} name="RightEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            {/* The left ear end */}
            <mesh position={[-2.5, -0.8, 0.5]} rotation={[0, 0, Math.PI / 2]} name="LeftEarEnd">
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            {/* The right ear end */}
            <mesh position={[2.5, -0.8, 0.5]} rotation={[0, 0, Math.PI / 2]} name="RightEarEnd">
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            {/* The left eye */}
            <mesh position={[-0.5, 0.3, 0.7]} name="LeftEye">
                <capsuleGeometry args={[0.1, 0.15, 10, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>
            
            {/* The right eye */}
            <mesh position={[0.5, 0.3, 0.7]} name="RightEye">
                <capsuleGeometry args={[0.1, 0.15, 10, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>

            {/* The right cheek */}
            <mesh position={[-0.7, 0, 0.7]} name="RightCheek">
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshToonMaterial color={"pink"} />
            </mesh>

            {/* The left cheek */}
            <mesh position={[0.7, 0, 0.7]} name="LeftCheek">
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshToonMaterial color={"pink"} />
            </mesh>

            {/* The mouth */}
            <mesh position={[0, 0, 0.8]} rotation={[0, 0, Math.PI / 2]} name="Mouth">
                <capsuleGeometry args={[0.05, 0.15, 20, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>
        </group>    
    );
};

export default CinnamorollHead;