import { useEffect, useLayoutEffect, useRef } from "react";
import { Suspense } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import "./Gaia.css";
import { Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

function Gaiam() {
	const gltf = useGLTF("3D-models/Gaia4.glb");

	useEffect(() => {
		// Traverse each child mesh to enable casting and receiving shadows
		gltf.scene.traverse((child) => {
			//: Object3D
			child.castShadow = true;
			child.receiveShadow = true;
		});
	}, [gltf]);

	const ref = useRef();
	const tl = useRef();
	const libraryRef = useRef();
	//const atticRef = useRef();

	// const scroll = useScroll();

	// useFrame(() => {
	// 	if (tl.current != undefined) {
	// 		tl.current.seek(scroll.offset * tl.current.duration());
	// 	}
	// });

	useLayoutEffect(() => {
		// tl.current = gsap.timeline();
		// // VERTICAL ANIMATION
		// tl.current.to(
		// 	ref.current.position,
		// 	{
		// 		duration: 2,
		// 		y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
		// 	},
		// 	0,
		// );
		// // Office Rotation
		// tl.current.to(
		// 	ref.current.rotation,
		// 	{ duration: 1, x: 0, y: Math.PI / 6, z: 0 },
		// 	0,
		// );
		// tl.current.to(
		// 	ref.current.rotation,
		// 	{ duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
		// 	1,
		// );
		// // Office movement
		// tl.current.to(
		// 	ref.current.position,
		// 	{
		// 		duration: 1,
		// 		x: -1,
		// 		z: 2,
		// 	},
		// 	0,
		// );
		// tl.current.to(
		// 	ref.current.position,
		// 	{
		// 		duration: 1,
		// 		x: 1,
		// 		z: 2,
		// 	},
		// 	1,
		// );
		// // LIBRARY FLOOR
		// tl.current.from(
		// 	libraryRef.current.position,
		// 	{
		// 		duration: 0.5,
		// 		x: -2,
		// 	},
		// 	0.5,
		// );
		// tl.current.from(
		// 	libraryRef.current.rotation,
		// 	{
		// 		duration: 0.5,
		// 		y: -Math.PI / 2,
		// 	},
		// 	0,
		// );
		// ATTIC
		// tl.current.from(
		// 	atticRef.current.position,
		// 	{
		// 		duration: 1.5,
		// 		y: 2,
		// 	},
		// 	0,
		// );
		// tl.current.from(
		// 	atticRef.current.rotation,
		// 	{
		// 		duration: 0.5,
		// 		y: Math.PI / 2,
		// 	},
		// 	1,
		// );
		// tl.current.from(
		// 	atticRef.current.position,
		// 	{
		// 		duration: 0.5,
		// 		z: -2,
		// 	},
		// 	1.5,
		// );
	}, []);

	return (
		<primitive
			ref={libraryRef}
			castShadow
			receiveShadow
			object={gltf.scene}
			scale={10}
			position={[0, 0, 0]}
		/>
	);
}

const MyGaia = () => {
	return (
		<Suspense fallback={null}>
			<Gaiam />
		</Suspense>
	);
};

export default MyGaia;

useGLTF.preload("3D-models/Gaia4.glb");
