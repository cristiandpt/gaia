function Sun() {
    return (
      <mesh position={[10, 15, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="yellow" emissive="orange" emissiveIntensity={0.5} />
      </mesh>
    );
  }

  export default Sun;