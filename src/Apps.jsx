import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'; // Asegúrate de que la ruta sea correcta
import Login from './pages/Login/Login'; // Asegúrate de que la ruta sea correcta
import Cinnamoroll from './pages/Cinnamoroll/Cinnamoroll'; // Importa tu componente Cinnamoroll
import Navbar from './pages/Componenetes/Navbar'; // Importa tu componente Navbar
import Menu from './pages/Menu/Inicio'; // Asegúrate de que la ruta sea correcta
import Erosion from './pages/Componenetes/Erosion'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cinnamoroll" element={<Cinnamoroll />} />
        <Route path="/menu" element={<Navbar />} />
        <Route path="/menu2" element={<Menu />} />
        <Route path="/erosion" element={<Erosion/>} />
      </Routes>
    </Router>
  );
}

export default App;
