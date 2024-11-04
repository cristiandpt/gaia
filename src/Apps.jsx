import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home"; // Asegúrate de que la ruta sea correcta
import Login from "./pages/Login/Login"; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from "./pages/Cinnamoroll/Cinnamoroll"; // Importa tu componente Cinnamoroll
import Navbar from "./pages/Componenetes/Navbar"; // Importa tu componente Navbar
import Menu from "./pages/Menu/Inicio"; // Asegúrate de que la ruta sea correcta
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AutheticatedLayout from "./shared/authentication/AuthenticatedLayout";
import PivateRoutes from "./shared/PrivateRoutes";
import Erosion from "./pages/Erosion/Erosion";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoutes element={<AuthenticatedLayout />} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
];

function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Login", element: <Login /> },
  { path: "/Cinnamoroll", element: <Cinnamoroll /> },
  { path: "/inicio", element: <Inicio /> },
  { path: "/perdidabio", element: <Perdidabio /> },
  { path: "/erosion", element: <Erosion /> },
  { path: "/desforestacion", element: <Deforestacion /> },
]);
