import { Text3D } from "@react-three/drei";
import { MutableRefObject } from "react";

interface Props {
	refToModel: any;
}

const ErosionText = ({ refToModel }: Props) => {
	return (
		<Text3D
			ref={refToModel}
			position={[-12, 7, 12]}
			font="fonts/Nostalgic Whispers-Regular.json"
			text="Erosion"
			fontSize={10}
			rotation={[0, 0, 0]}
			bevelEnabled
			bevelSize={0.02}
			bevelThickness={0.01}
			height={0.5}
			lineHeight={0.75}
			letterSpacing={0.05}
			size={1.5}
		>
			Erosion
			<meshStandardMaterial color="green" />
		</Text3D>
	);
};

export default ErosionText;
