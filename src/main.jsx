import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Cinnamoroll from './pages/Cinnamoroll/Cinnamoroll.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Inicio from './pages/Menu/Inicio.jsx';
import Perdidabio from './pages/Perdida-de-biodiversidad/Perdidabio.jsx';
import Erosion from './pages/Erosion/Erosion.jsx';
import Deforestacion from './pages/Dseforestacion/Desforestacion.jsx';
import Registrar from './pages/Registro/Registrar.jsx';
import Iniciar_seccion from './pages/Login/Login.jsx'


const router = createBrowserRouter([
  { path: "/", element: <Home />,},
  { path: "/Login", element: <Login />,},
  { path: "/Cinnamoroll", element: <Cinnamoroll />, },
  { path: "/inicio", element: <Inicio />, },
  { path: "/perdidabio", element: <Perdidabio />, },
  { path: "/erosion", element: <Erosion/>, },
  { path: "/desforestacion", element: <Deforestacion/>, },
  { path: "/registrar", element: <Registrar/>, },
  { path: "/iniciar-sesion", element: <Iniciar_seccion/>, }
  
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);