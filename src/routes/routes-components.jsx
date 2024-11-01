import Inicio from '../pages/Menu/Inicio';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import LossOfDiversity from '../pages/LossOfDiversity/LossOfDiversity';
import Erosion from '../pages/Erosion/Erosion';
import Deforest from '../pages/Deforest/Deforest';
import Registrar from '../pages/Registro/Registrar';
import Iniciar_seccion from '../pages/Login/Login';
import CreateUserForm from '../components/CreateUserForm';
import Navbar from '../components/Navbar';

const RouteComponentsRegister = {
	"login":				<Login />,
	"register":				<CreateUserForm />,
	"gaia":					<Home />,
	"signin":				<Iniciar_seccion/>,
	"register":				<Registrar/>,
	"deforest":				<Deforest/>,
	"home":					<Inicio />,
	"erosion":				<Erosion/>,
	"menu":					<Navbar />,
	"loss-of-biodiversity":	<LossOfDiversity />,
}

const getComponentByPath = (path) => {
	const foundComponent = RouteComponentsRegister[path];
	return foundComponent ? foundComponent: <Home />
}

export default getComponentByPath;
