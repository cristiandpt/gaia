import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Cinnamoroll from './pages/Cinnamoroll/Cinnamoroll.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Inicio from './pages/Menu/Inicio.jsx';

const router = createBrowserRouter([
  { path: "/", element: <Home />,},
  { path: "/Login", element: <Login />,},
  { path: "/Cinnamoroll", element: <Cinnamoroll />, },
  { path: "/Inicio", element: <Inicio />, }
  
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);