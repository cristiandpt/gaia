import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Bird(props) {
  const bird = useRef(); // Referencia al pájaro
  const rigidBody = useRef(); // Referencia al cuerpo rígido
  const { nodes, materials, animations } = useGLTF(
    "3D-models/biodiversity/bird.glb",
  );
  const { actions } = useAnimations(animations, bird);

  const [isCollided, setIsCollided] = useState(false); // Estado de colisión

  useEffect(() => {
    if (actions) {
      actions["Flying"]?.play(); // Inicia la animación de vuelo
    }
  }, [actions]);

  const handleCollision = (other) => {
    if (other.rigidBodyObject?.name === "ball" && !isCollided) {
      console.log("La bola golpeó al pájaro");
      setIsCollided(true); // Actualiza el estado de colisión
    }
  };

  useEffect(() => {
    if (isCollided) {
      // Habilitar gravedad y aplicar un impulso inicial
      rigidBody.current?.api.setGravityScale(1); // Activa la gravedad
      rigidBody.current?.api.applyImpulse({ x: 0, y: -5, z: 0 }); // Impulso hacia abajo
    }
  }, [isCollided]);

  return (
    <RigidBody
      ref={rigidBody}
      type="dynamic" // Siempre dinámico
      colliders="cuboid"
      name="bird"
      position={[3, 0, 14]} // Posición inicial
      gravityScale={0} // Gravedad desactivada inicialmente
      {...props}
      onCollisionEnter={({ other }) => handleCollision(other)} // Manejar colisión
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
