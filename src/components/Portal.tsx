import {
	CameraControls,
	Environment,
	MeshPortalMaterial,
	RoundedBox,
	Text,
	useCursor,
	useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SpackDust from "./particles-v1/Particles";
import { Sparks } from "./particles-v1/Sparks";

interface Props extends React.ComponentProps<typeof RoundedBox> {
	// Extend props from RoundedBox
	children: ReactNode;
	texture: string;
	name: string;
	color: string;
	colorPortal: string;
	active: string | null; // Assuming active can be a string or null
	setActive: (name: string | null) => void; // Function to set active state
	hovered: string | null; // Assuming hovered can be a string or null
	setHovered: (name: string | null) => void; // Function to set hovered state
}

const PortalStage: React.FC<Props> = ({
	children,
	texture,
	name,
	color,
	colorPortal,
	active,
	setActive,
	hovered,
	setHovered,
	...props
}) => {
	//const map = useTexture(texture);
	const portalMaterial = useRef(null); // Adjust type based on actual material used

	useFrame((_state, delta) => {
		const worldOpen = active === name;
		easing.damp(
			portalMaterial.current!,
			"blend",
			worldOpen ? 1 : 0,
			0.2,
			delta,
		);
	});

	const colors = {
		malevolentIllusion: [
			"#c06995",
			"#de77c7",
			"#df86df",
			"#d998ee",
			"#ceadf4",
			"#c6bff9",
		],
		sunnyRainbow: [
			"#fbe555",
			"#fb9224",
			"#f45905",
			"#be8abf",
			"#ffeed0",
			"#feff89",
		],
	};

	return (
		<group {...props}>
			<Text fontSize={0.4} position={[0, 1.9, 0.051]} anchorY="bottom">
				{name}
				<meshBasicMaterial color={color} toneMapped={false} />
			</Text>
			<RoundedBox
				name={name}
				args={[1.6, 2.2, 0.1]}
				onDoubleClick={() => setActive(active === name ? null : name)}
				onPointerEnter={() => setHovered(name)}
				onPointerLeave={() => setHovered(null)}
			>
				<MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
					<ambientLight intensity={1} />
					<Environment preset="sunset" />
					<mesh>
						<sphereGeometry args={[1.4, 24, 24]} />
						<meshBasicMaterial
							color={new THREE.Color(colorPortal)}
							side={THREE.BackSide}
						/>
						<SpackDust count={10000} />
						<Sparks
							count={10}
							colors={colors.malevolentIllusion}
							radius={0.75}
						/>
					</mesh>
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
};

export default PortalStage;
