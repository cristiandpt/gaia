import * as THREE from "three";
import { useEffect, useCallback, useRef, useState, Suspense } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import Gaiam from "./Gaiam"; // Replace with your model import path

const MyGaia = () => {
  const gaiaRef = useRef(); // Reference to the character's body
  const { camera } = useThree(); // Access Three.js camera
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const moveSpeed = 0.1;

  // Handle keyboard input for movement
  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        setMovement((prev) => ({ ...prev, forward: true }));
        break;
      case "s":
      case "ArrowDown":
        setMovement((prev) => ({ ...prev, backward: true }));
        break;
      case "a":
      case "ArrowLeft":
        setMovement((prev) => ({ ...prev, left: true }));
        break;
      case "d":
      case "ArrowRight":
        setMovement((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        setMovement((prev) => ({ ...prev, forward: false }));
        break;
      case "s":
      case "ArrowDown":
        setMovement((prev) => ({ ...prev, backward: false }));
        break;
      case "a":
      case "ArrowLeft":
        setMovement((prev) => ({ ...prev, left: false }));
        break;
      case "d":
      case "ArrowRight":
        setMovement((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Update character and camera each frame
  useFrame(() => {
    if (!gaiaRef.current) return;

    // Character translation
    const translation = gaiaRef.current.translation();

    // Compute direction vectors based on camera rotation
    const forwardVector = new THREE.Vector3(
      -Math.sin(camera.rotation.y),
      0,
      -Math.cos(camera.rotation.y),
    );
    const rightVector = new THREE.Vector3(
      Math.cos(camera.rotation.y),
      0,
      -Math.sin(camera.rotation.y),
    );

    // Calculate movement delta
    const moveDelta = new THREE.Vector3();
    if (movement.forward) moveDelta.add(forwardVector);
    if (movement.backward) moveDelta.sub(forwardVector);
    if (movement.left) moveDelta.sub(rightVector);
    if (movement.right) moveDelta.add(rightVector);

    // Normalize and scale the movement vector
    moveDelta.normalize().multiplyScalar(moveSpeed);

    // Apply movement to character
    gaiaRef.current.setTranslation(
      {
        x: translation.x + moveDelta.x,
        y: translation.y,
        z: translation.z + moveDelta.z,
      },
      true,
    );

    // Camera positioning (further back and higher)
    const cameraOffset = { y: 4, z: 8 }; // Customize offsets here
    camera.position.set(
      translation.x - forwardVector.x * cameraOffset.z,
      translation.y + cameraOffset.y,
      translation.z - forwardVector.z * cameraOffset.z,
    );

    // Make the camera look at the character
    camera.lookAt(translation.x, translation.y + 1.8, translation.z);
  });

  return (
    <Suspense fallback={null}>
      <RigidBody ref={gaiaRef} type="dynamic" position={[0, 1, 18]}>
        <Gaiam />
      </RigidBody>
    </Suspense>
  );
};

export default MyGaia;
