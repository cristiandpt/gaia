/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HatChet(props) {
  const { nodes, materials } = useGLTF("hatchet_2k.gltf/hatchet_2k.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hatchet.geometry}
        material={materials.hatchet}
      />
    </group>
  );
}

useGLTF.preload("/hatchet_2k.gltf");
