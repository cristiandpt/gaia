/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Q.Cola (https://sketchfab.com/FA.Q.Cola)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/flat--rock-d900686b94d344708087352c1bd0a498
Title: Flat_ Rock
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function FlatRock(props) {
  const { nodes, materials } = useGLTF("/flat__rock.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.lambert3SG}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/flat__rock.glb");
