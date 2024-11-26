import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";
import { MeshLine, MeshLineMaterial } from "three.meshline";

extend({ MeshLine, MeshLineMaterial });

const radiusVariance = () => Random.range(0.3, 1);

function SparkLine({ curve, width, color, speed }) {
	const material = useRef();

	useFrame(() => {
		if (material.current) {
			material.current.uniforms.dashOffset.value -= speed;
		}
	});

	console.log("Lenght ", curve);

	return (
		<mesh>
			<meshLine attach="geometry" points={curve} />
			<meshLineMaterial
				ref={material}
				transparent
				depthTest={false}
				lineWidth={width}
				color={color}
				dashArray={0.1}
				dashRatio={0.95}
			/>
		</mesh>
	);
}

export function Sparks({ count, colors, radius = 10 }) {
	const lines = useMemo(
		() =>
			new Array(count).fill().map((_, index) => {
				const pos = new THREE.Vector3(
					Math.sin(0) * radius * radiusVariance(),
					Math.cos(0) * radius * radiusVariance(),
					Math.sin(0) * Math.cos(0) * radius * radiusVariance(),
				);
				const points = new Array(30).fill().map((_, index) => {
					const angle = (index / 20) * Math.PI * 2;

					return pos
						.add(
							new THREE.Vector3(
								Math.sin(angle) * radius * radiusVariance(),
								Math.cos(angle) * radius * radiusVariance(),
								Math.sin(angle) * Math.cos(angle) * radius * radiusVariance(),
							),
						)
						.clone();
				});
				if (points.length % 3 !== 0) {
					console.error("Points array length is not valid:", points.length);
				}
				// Log points to check for NaN values
				points.forEach((p, i) => {
					if (isNaN(p.x) || isNaN(p.y) || isNaN(p.z)) {
						console.error("Invalid point generated:", p);
					}
				});
				const curve = new THREE.CatmullRomCurve3(points).getPoints(999);
				return {
					color: colors[parseInt(colors.length * Math.random(), 10)],
					width: Math.max(0.1, (0.2 * index) / 10),
					speed: Math.max(0.001, 0.004 * Math.random()),
					curve,
				};
			}),
		[count, colors, radius],
	);

	return (
		<group position={[-radius * 2, -radius, -10]} scale={[1, 1.3, 1]}>
			{lines.map((props, index) => (
				<SparkLine key={index} {...props} />
			))}
		</group>
	);
}
