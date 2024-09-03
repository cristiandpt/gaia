

const CinnamorollHead = () => {
    return (
        <>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} name="HeadBase">
            <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
            <meshToonMaterial color={"white"} />
            </mesh>

            <mesh position={[-1.5, 0, 0]} rotation={[1, Math.PI / 4, Math.PI / 2]} name="LeftEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            <mesh position={[1.5, 0, 0]} rotation={[1, -Math.PI / 4, -Math.PI / 2]} name="RightEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            <mesh position={[-2.5, -0.8, 0.5]} rotation={[0, 0, Math.PI / 2]} name="LeftEarEnd">
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>
            <mesh position={[2.5, -0.8, 0.5]} rotation={[0, 0, Math.PI / 2]} name="RightEarEnd">
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshToonMaterial color={"white"} />
            </mesh>

            <mesh position={[-0.5, 0.3, 0.7]} name="LeftEye">
                <capsuleGeometry args={[0.1, 0.15, 10, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>
            
            <mesh position={[0.5, 0.3, 0.7]} name="RightEye">
                <capsuleGeometry args={[0.1, 0.15, 10, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>

            <mesh position={[-0.7, 0, 0.7]} name="RigthChek">
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshToonMaterial color={"pink"} />
            </mesh>

            <mesh position={[0.7, 0, 0.7]} name="LeftChek">
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshToonMaterial color={"pink"} />
            </mesh>

            <mesh position={[0, 0, 0.8]} rotation={[0, 0, Math.PI / 2]} name="Mouth">
                <capsuleGeometry args={[0.05, 0.15, 20, 20]} />
                <meshToonMaterial color={"blue"} />
            </mesh>
            
        </>    
    );
};
export default CinnamorollHead;