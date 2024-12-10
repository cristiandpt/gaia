import { Html } from "@react-three/drei";
type Style = {
	[prop: string]: string | number;
};

interface Props {
	say: string;
	position: number[];
	style?: Style;
}

const GaiaDialog = ({ say, position, style }: Props) => (
	<Html
		// Adjust position as needed
		position={position}
		wrapperClass="html-dialog" // Optional: Add a class for styling
		center // Center the HTML content
	>
		<div
			className="absolute w-80 b-0 r-0 bg-white/[0.25]  rounded-md p-4"
			style={style}
		>
			<h2></h2> {/* You can add a title if needed */}
			<p
				className="text-white"
				style={{
					color: style?.color,
				}}
			>
				{say}
			</p>
		</div>
	</Html>
);

export default GaiaDialog;
