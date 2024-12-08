import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CropsType(props) {
	const { nodes, materials } = useGLTF("/activity.glb");
	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_2.geometry}
					material={materials.tornado_cow_material}
					position={[-2.733, 2.47, -0.153]}
					rotation={[0, 0, -0.604]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_2001.geometry}
					material={materials.tornado_cow_material}
					position={[-2.445, -0.072, -0.22]}
					rotation={[0, 0, -0.604]}
				/>
			</group>
			<group position={[3.083, 0.249, 2.545]} rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
					<group
						position={[-6.92, 0, 412.444]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F2_Wheat_0.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F2_Wheat_0001.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F2_Wheat_0002.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F2_Wheat_0003.geometry}
							material={materials.Wheat}
						/>
					</group>
					<group
						position={[232.465, 0, 412.444]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F3_Wheat_0.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F3_Wheat_0001.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F3_Wheat_0002.geometry}
							material={materials.Wheat}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Wheat_F3_Wheat_0003.geometry}
							material={materials.Wheat}
						/>
					</group>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Carrot_F1_Carrot_0.geometry}
						material={materials.Carrot}
						position={[-238.946, 0, -130.434]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Carrot_F2_Carrot_0.geometry}
						material={materials.Carrot}
						position={[-22.354, 0, -130.434]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Carrot_F3_Carrot_0.geometry}
						material={materials.Carrot}
						position={[212.959, 0, -130.434]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Potatoe_F1_Potatoe_0.geometry}
						material={materials.Potatoe}
						position={[-232.821, 0, 144.612]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Potatoe_F2_Potatoe_0.geometry}
						material={materials.Potatoe}
						position={[-9.487, 0, 144.612]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Potatoe_F3_Potatoe_0.geometry}
						material={materials.Potatoe}
						position={[222.597, 0, 144.612]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Soil_Dirt_0.geometry}
						material={materials.Dirt}
						position={[0, 0, 139.363]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Soil001_Dirt_0.geometry}
						material={materials.Dirt}
						position={[0, 0, -131.992]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Soil002_Dirt_0.geometry}
						material={materials.Dirt}
						position={[0, 0, 410.508]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Soil003_Dirt_0.geometry}
						material={materials.Dirt}
						position={[0, 0, -403.467]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tomatoe_F1_Tomatoe_0.geometry}
						material={materials.Tomatoe}
						position={[-225.476, 0, -401.782]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tomatoe_F2_Tomatoe_0.geometry}
						material={materials.Tomatoe}
						position={[-16.224, 0, -401.782]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tomatoe_F3_Tomatoe_0.geometry}
						material={materials.Tomatoe}
						position={[208.723, 0, -401.782]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
						scale={[136, 136, 100]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Wheat_F1_Wheat_0.geometry}
						material={materials.Wheat}
						position={[-219.477, 0, 413.099]}
						rotation={[-Math.PI / 2, 0, Math.PI]}
						scale={[136, 136, 100]}
					/>
				</group>
			</group>
			<group
				position={[-3.485, 0.334, 6.312]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={0.603}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_3.geometry}
					material={materials.trunk}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_3_1.geometry}
					material={materials.leaves}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_3_2.geometry}
					material={materials.stems_1}
				/>
			</group>
			<group position={[-5.11, 0.225, 6.384]} rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tree_0_Tree_0Mat_0.geometry}
						material={materials.Tree_0Mat}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tree_1_Tree_1Mat_0.geometry}
						material={materials.Tree_1Mat}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tree_2_Tree_2Mat_0.geometry}
						material={materials.Tree_2Mat}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tree_3_Tree_3Mat_0.geometry}
						material={materials.Tree_3Mat}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Tree_4_Tree_4Mat_0.geometry}
						material={materials.Tree_4Mat}
					/>
				</group>
			</group>
			<group
				position={[-2.474, 0.334, 5.824]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={0.603}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_2003.geometry}
					material={materials.leaves}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_3001.geometry}
					material={materials.leaves}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_4001.geometry}
					material={materials.stems_1}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_5001.geometry}
					material={materials.trunk}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube.geometry}
				material={materials.field}
			/>
		</group>
	);
}

useGLTF.preload("/activity.glb");
