const Lights = () => {
  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight position={[0, 100, 10]} intensity={1} castShadow />
    </>
  );
};

export default Lights;
