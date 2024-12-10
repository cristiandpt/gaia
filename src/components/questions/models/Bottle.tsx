/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: plaggy (https://sketchfab.com/plaggy)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/cc0-drops-f8f24228aebf41f297c878ad82ea7db0
Title: CC0 - Drops
*/
import { useGLTF } from "@react-three/drei";

export function Botlle(props) {
  const { nodes, materials } = useGLTF("3D-models/quiz-models/bottle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drops_Drops_0.geometry}
        material={materials.Drops}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  );
}

useGLTF.preload("3D-models/quiz-models/bottle.glb");