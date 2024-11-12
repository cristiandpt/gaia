import { ScrollControls } from "@react-three/drei";

interface Props {
	children: React.ReactNode;
}

const ErosionScrollControl = ({ children }: Props) => (
	<ScrollControls pages={3} damping={0.25}>
		<></>
	</ScrollControls>
);

export default ErosionScrollControl;
