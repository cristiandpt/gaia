import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <>
      <Environment 
      ground={{
        height: 0,
        radius: 0,
        scale: 0,
      }}
      background
      files={"/hdri/Biodiversity-sky.hdr"}
      />
    </>
  );
};

export default Staging;