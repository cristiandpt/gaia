import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SoilTypes(props) {
	const { nodes, materials } = useGLTF("/soil_types.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Sphere.geometry}
				material={materials.ground_1}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Sphere001.geometry}
				material={materials.erosion}
				position={[2.517, 0, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Sphere002.geometry}
				material={materials.brown}
				position={[-2.525, 0, 0]}
			/>
		</group>
	);
}

useGLTF.preload("/soil_types.glb");
