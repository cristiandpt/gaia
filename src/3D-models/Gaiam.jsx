import { useEffect, useRef, useState, useCallback } from "react";
import { Suspense } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Gaiam() {
	const gltf = useGLTF("3D-models/Gaia4.glb");

	useEffect(() => {
		gltf.scene.traverse((child) => {
			child.castShadow = true;
			child.receiveShadow = true;
		});
	}, [gltf]);

	return <primitive object={gltf.scene} scale={10} />;
}
