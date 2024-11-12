import NavbarHome from "../../components/NavbarHome";
import MainScene from "../../3D-models/scenes/MainScene";
import Welcome from "./Welcome"; // Asegúrate de que la ruta sea correcta
import "./Home.css";
import EnvironmentalCare from "./EnvironmentalCare";

const LandingPage = () => {
  return (
    <>
      <NavbarHome />
      <div className="canvas-container">
        <MainScene />
        <EnvironmentalCare />
      </div>
      <Welcome />
    </>
  );
};

export default LandingPage;
