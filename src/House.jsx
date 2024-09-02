

const House = () => {
    return (
        <>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} name="HeadBase">
            <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
            <meshStandardMaterial color={"white"} />
            </mesh>

            <mesh position={[-1.5, 0, 0]} rotation={[1, Math.PI / 4, Math.PI / 2]} name="LeftEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshStandardMaterial color={"white"} />
            </mesh>

            <mesh position={[1.5, 0, 0]} rotation={[1, -Math.PI / 4, -Math.PI / 2]} name="RightEar">
                <cylinderGeometry args={[0.50, 0.15, 2.5, 32]} />
                <meshStandardMaterial color={"white"} />
            </mesh>

            <mesh position={[-2.3, 0, 0.8]} rotation={[0, 0, Math.PI / 2]} name="LeftEarEnd">
                <sphereGeometry args={[0.509, 32, 32]} />
                <meshStandardMaterial color={"white"} />
            </mesh>
<mesh position={[2.3, 0, 0.8]} rotation={[0, 0, Math.PI / 2]} name="RightEarEnd">
    <sphereGeometry args={[0.509, 32, 32]} />
    <meshStandardMaterial color={"white"} />
</mesh>
            
            
        </>    
    );
};
export default House;