/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function RustedSpade(props) {
	const { nodes, materials } = useGLTF(
		"rusted_spade_01_2k.gltf/rusted_spade_01_2k.gltf",
	);
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.rusted_spade_01.geometry}
				material={materials.rusted_spade_01}
			/>
		</group>
	);
}

useGLTF.preload("/rusted_spade_01_2k.gltf");
