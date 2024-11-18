import { Html } from "@react-three/drei";

interface Props {
  say: string;
  position: number[];
}

const GaiaDialog = ({ say, position }: Props) => (
  <Html
    // Adjust position as needed
    position={position}
    wrapperClass="html-dialog" // Optional: Add a class for styling
    center // Center the HTML content
  >
    <div className="absolute w-80 b-0 r-0 bg-white/[0.25]  rounded-md p-4">
      <h2></h2> {/* You can add a title if needed */}
      <p className="text-white">{say}</p>
    </div>
  </Html>
);

export default GaiaDialog;
