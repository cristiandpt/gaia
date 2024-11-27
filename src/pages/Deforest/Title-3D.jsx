import { Center, Text3D } from "@react-three/drei";

const Title = () => {
  return (
    <Center position={[0, 8, 0]}>
      <Text3D
        font="public/fonts/Nostalgic Whispers-Regular.json"
        rotation={[0, 0, 0]}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.01}
        height={0.5}
        lineHeight={0.75}
        letterSpacing={0.05}
        size={1.2}
      >
        DESFORESTACIÓN
        <meshStandardMaterial color="green" />
      </Text3D>
    </Center>
  );
};

export default Title;
