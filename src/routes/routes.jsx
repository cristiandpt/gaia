import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/Home/Home'; // Asegúrate de que la ruta sea correcta
import Login from '../pages/Login/Login'; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from '../pages/Cinnamoroll/Cinnamoroll'; // Importa tu componente Cinnamoroll
import Navbar from '../pages/Componenetes/Navbar'; // Importa tu componente Navbar
import Menu from '../pages/Menu/Inicio'; // Asegúrate de que la ruta sea correcta
import Erosion from '../pages/Erosion/Erosion';
import NoAuthorizedLayout from "../shared/authentication/NoAuthorizedLayout";
import PrivateRoutes from '../shared/PrivateRoutes';
import Inicio from '../pages/Menu/Inicio.jsx';
import Perdidabio from '../pages/Perdida-de-biodiversidad/Perdidabio.jsx';
import Deforestacion from '../pages/Deforestacion/Deforestacion.jsx';
import CreateAccountForm from "../pages/CreateAccount/CreateAccountPage";


const routes = [
	{
		path: "/no-authorized",
		element: <NoAuthorizedLayout />, // Layout for unauthorized access
		children: [
			{
				path: "", // Example nested route
				element: <Login />,
			},
			{
				path: "register", // Another example nested route
				element: <CreateAccountForm />,
			},
			{
				path: "google-signin",
				element: <Home />
			}
		],
	},
	{
		path: "/",
		element: (
			<PrivateRoutes />
		),
		children: [
			{
				path: "",
				element: <Inicio />,
			},
			{ 
				path: "/erosion", 
				element: <Erosion/>, },
			{
				path: "/cinnamoroll",
				element: <Cinnamoroll />,
			},
			{
				path: "/menu",
				element: <Navbar />,
			},
			{
				path: "/menu2",
				element: <Menu />,
			},
			{
				path: "/erosion",
				element: <Erosion />,
			},
		],
	},
]

export default routes;
