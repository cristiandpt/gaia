import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Text from "./Text";
import Effects from "./Effects";
import Sparks from "./Sparks";
import Particles from "./Particles";
import "./styles.css";

function Ellipse(props) {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 10, 3, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);
  return (
    <line geometry={geometry} {...props}>
      <meshBasicMaterial />
    </line>
  );
}

function ReactAtom(props) {
  return (
    <group {...props}>
      <Ellipse />
      <Ellipse rotation={[0, 0, Math.PI / 3]} />
      <Ellipse rotation={[0, 0, -Math.PI / 3]} />
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}

function Number({ hover }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        state.mouse.x * 2,
        0.1,
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        state.mouse.y / 2,
        0.1,
      );
      ref.current.rotation.y = 0.8;
    }
  });
  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Text
          size={10}
          onClick={(e) =>
            window.open(
              "https://github.com/react-spring/react-three-fiber/blob/master/whatsnew.md",
              "_blank",
            )
          }
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          4
        </Text>
        <ReactAtom position={[35, -20, 0]} scale={[1, 0.5, 1]} />
      </group>
    </Suspense>
  );
}

export default function ParticlesEffect() {
  return (
    <>
      <fog attach="fog" args={["white", 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Number />
      <Particles count={5000} />
      <Sparks
        count={20}
        colors={[
          "#A2CCB6",
          "#FCEEB5",
          "#EE786E",
          "#e0feff",
          "lightpink",
          "lightblue",
        ]}
      />
      <Effects />
    </>
  );
}
