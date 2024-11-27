import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, Physics } from "@react-three/rapier"; // Import Ground and Physics from Rapier

// Function to create the leaves with physics
export function Leaves({ instances }) {
	const { nodes, materials } = useGLTF("3D-models/dry_leaf_.rawscan.glb");
	const meshRef = useRef();

	useEffect(() => {
		if (meshRef.current) {
			const matrix = new THREE.Matrix4();
			const euler = new THREE.Euler();

			instances.forEach(({ position, scale }, i) => {
				matrix.identity(); // Reset matrix

				// Apply random rotation
				const randomRotation = [
					Math.random() * Math.PI * 2, // Random X-axis rotation
					Math.random() * Math.PI * 2, // Random Y-axis rotation
					Math.random() * Math.PI * 2, // Random Z-axis rotation
				];

				euler.set(...randomRotation);
				matrix.makeRotationFromEuler(euler);

				// Apply position and scale
				matrix.setPosition(position[0], position[1], position[2]);
				matrix.scale(new THREE.Vector3(scale[0], scale[1], scale[2]));

				// Set transformation matrix for the instance
				meshRef.current.setMatrixAt(i, matrix);
			});

			// Notify Three.js to update
			meshRef.current.instanceMatrix.needsUpdate = true;
		}
	}, [instances]);

	return (
		<>
			<Physics gravity={[0, -5.81, 0]}>
				{/* Ground to catch the falling leaves */}
				<RigidBody type="fixed">
					<mesh receiveShadow>
						<planeGeometry args={[100, 100]} />{" "}
						{/* Large plane to act as the barrier */}
						<meshStandardMaterial
							color="white"
							opacity={0} // Fully transparent
							transparent={true} // Ensures transparency
							roughness={1}
							metalness={0}
						/>
					</mesh>
				</RigidBody>

				{/* Leaves Instances */}
				{instances.map((instance, index) => (
					<RigidBody
						key={index}
						type="dynamic" // Makes the leaf fall with physics
						position={instance.position} // Position from the parent instances
						scale={instance.scale} // Scale from the parent instances
						restitution={0.4} // Soft bounce effect (low restitution for soft fall)
						friction={0.4} // Low friction for a softer landing
						linearDamping={0.9} // Apply linear damping to simulate slow fall
						angularDamping={0.9} // Apply angular damping to prevent spinning out of control
					>
						<instancedMesh
							ref={meshRef}
							args={[nodes.Object_2.geometry, materials.material_0, 1]} // Geometry and material for each leaf
							castShadow
							receiveShadow
						/>
					</RigidBody>
				))}
			</Physics>
		</>
	);
}

useGLTF.preload("/dry_leaf_.rawscan..glb");
