import { Html } from "@react-three/drei";
import { Vector3 } from "three";

interface Style {
  [props: string]: string | number;
}

interface Props {
  title: string | null;
  say: string;
  position: number[];
  onClickHandler: () => void;
  style?: Style;
}

const MainDialog = ({ say, position, onClickHandler, title, style }: Props) => (
  <Html
    // Adjust position as needed
    position={new Vector3(position[0], position[1], position[2])}
    wrapperClass="html-dialog" // Optional: Add a class for styling
    center // Center the HTML content
  >
    <div
      className="absolute w-80 b-0 r-0 bg-white/[0.25] rounded-md p-4"
      style={style}
    >
      <p className="text-5xl ms-0 text-[#000000] font-bold">{title}</p>
      {/* You can add a title if needed */}
      <p className="text-white text-base">{say}</p>
      <button
        className="bg-red-500 text-white rounded-md p-2 px-4"
        onClick={(e) => onClickHandler()}
      >
        Explorar
      </button>
    </div>
  </Html>
);

export default MainDialog;
