import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";

export default function SpaceDust({ count }) {
  const mesh = useRef();
  const light = useRef();

  // Generate some random positions, speed factors, and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Random.range(0, 100);
      const factor = Random.range(20, 120);
      const speed = Random.range(0.01, 0.015) / 6;
      // Generate random spherical coordinates
      const theta = Math.random() * Math.PI * 2; // Random angle around the vertical axis
      const phi = Math.acos(2 * Math.random() - 1); // Random angle for uniform distribution

      // Convert spherical coordinates to Cartesian coordinates
      const x = 4 * Math.sin(phi) * Math.cos(theta);
      const y = 4 * Math.sin(phi) * Math.sin(theta);
      const z = 4 * Math.cos(phi);

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      );

      // Derive an oscillating value which will be used for the particle size and rotation
      const s = Math.cos(t);
      dummy.scale.set(0.1 * s, 0.1 * s, 0.1 * s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // Apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="lightblue" />
      </instancedMesh>
    </>
  );
}
