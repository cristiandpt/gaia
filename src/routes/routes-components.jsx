import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import LossOfDiversity from "../pages/LossOfDiversity/LossOfDiversity";
import Erosion from "../pages/Erosion/Erosion";
import Deforest from "../pages/Deforest/Deforest";
import Register from "../pages/Register/Register";
import Signin from "../pages/Login/Login";
import Navbar from "../components/Navbar";
import Quiz from "../pages/Quiz/Quiz";
import GaiaObjectCapture from "../components/questions/GaiaObjectCapture";

const RouteComponentsRegister = {
  login: <Login />,
  gaia: <LandingPage />,
  signin: <Signin />,
  register: <Register />,
  deforest: <Deforest />,
  home: <Home />,
  erosion: <Erosion />,
  menu: <Navbar />,
  "loss-of-biodiversity": <LossOfDiversity />,
  quiz: <GaiaObjectCapture />,
};

const getComponentByPath = (path) => {
  const foundComponent = RouteComponentsRegister[path];
  return foundComponent ? foundComponent : <Home />;
};

export default getComponentByPath;
