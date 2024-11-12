import { RigidBody } from "@react-three/rapier";

const Floor = (props) => {
  return (
    <RigidBody
      name="rbFloor"
      friction={2}
      position={[0, -2.7, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <mesh {...props}>
        <circleGeometry args={[10, 32]} />
        <meshStandardMaterial color={"steal"} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
