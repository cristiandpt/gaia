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

interface Props extends React.ComponentProps<typeof RoundedBox> {
	// Extend props from RoundedBox
	children: ReactNode;
	texture: string;
	name: string;
	color: string;
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
					<Environment
						files="imagenes/near.hdr"
						background
						near={2}
						far={10}
						backgroundIntensity={1} // optional intensity factor
						backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation
						environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
						environmentRotation={[0, Math.PI / 2, 0]}
						ground={{
							scale: 0.05,
						}}
					/>
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
};

export default PortalStage;
