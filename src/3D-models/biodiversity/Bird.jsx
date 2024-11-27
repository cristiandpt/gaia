import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Bird(props) {
  const bird = useRef();
  const { nodes, materials, animations } = useGLTF(
    "3D-models/biodiversity/bird.glb",
  );
  const { actions } = useAnimations(animations, bird);

  useEffect(() => {
    if (actions) {
      actions["Flying"]?.play();
    }
  }, [actions]);

  return (
    <RigidBody
     type="fixed" // Hace que el pájaro sea estático
      colliders="cuboid" // Tipo de colisionador
      name="bird" // Nombre para identificarlo en la colisión
      position={[3, 0, 14]} // Posición inicial
      {...props}
    >

      <group ref={bird} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Armature_62"
                position={[0, 0, 0]}
                rotation={[1.485, 0, 5]}
                scale={0.4}
              >
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                      name="Object_7"
                      geometry={nodes.Object_7.geometry}
                      material={materials.Bird_Body}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.Bird_Eye}
                      skeleton={nodes.Object_8.skeleton}
                    />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Bird_Yellow}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <skinnedMesh
                      name="Object_10"
                      geometry={nodes.Object_10.geometry}
                      material={materials.Bird_White}
                      skeleton={nodes.Object_10.skeleton}
                    />
                    <group name="Plane_61" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("3D-models/biodiversity/bird.glb");

export default Bird;
