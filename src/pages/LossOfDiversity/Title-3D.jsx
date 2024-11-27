import { Center, Text3D } from "@react-three/drei";

const Title = () => {
  return (
    <Center position={[0, 13, 0]}>
      <Text3D
        font="fonts/Nostalgic Whispers-Regular.json"
        rotation={[0, Math.PI / 2, 0]}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.01}
        height={0.5}
        lineHeight={0.75}
        letterSpacing={0.05}
        size={1.2}
      >
        PÉRDIDA DE BIODIVERSIDAD
        <meshStandardMaterial color="green" />
      </Text3D>
    </Center>
  );
};

export default Title;
