import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { Points } from "./Fog";
import { useFrame } from "@react-three/fiber";

export default function PointsWithPhysics() {
  let speed = { x: 0.01, y: 0.005, z: 0.003 };
  const cloudRef = useRef();

  useFrame(() => {
    if (cloudRef.current) {
      // Get current position
      const position = cloudRef.current.translation();

      if (position.x < 100000 || position.x > -100000) {
        // Update position (simple linear movement)
        cloudRef.current.setTranslation({
          x: position.x - speed.x,
          y: position.y - speed.y,
          z: position.z - speed.z,
        });
      }
    }
  });

  return (
    <RigidBody
      ref={cloudRef}
      mass={1}
      linearDamping={0.5} // Reduces movement over time
      angularDamping={0.5}
      type="dynamic" // Makes the body movable
      position={[0, 0, 0]} // Initial position
    >
      <Points />
    </RigidBody>
  );
}
