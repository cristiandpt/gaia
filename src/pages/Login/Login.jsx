import React, { useState } from 'react';
import UserDAO from "../../daos/user-DAO"; 
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Ingreso = () => { // Cambia el nombre del componente a Ingreso
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Cambia aquí la lógica para verificar el login
            const user = await UserDAO.login({ email, password });
            if (user) {
                navigate('/Inicio'); // Redirige a la página de inicio si las credenciales son correctas
            } else {
                setError("Credenciales incorrectas. Intenta nuevamente."); // Manejo de error
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setError("No se pudo iniciar sesión. Intenta nuevamente.");
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <h2>Iniciar Sesión</h2> {/* Cambia el encabezado a Iniciar Sesión */}
                <form onSubmit={handleLogin} className="form"> {/* Cambia la función a handleLogin */}
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="button">Iniciar Sesión</button> {/* Cambia el texto del botón */}
                </form>
                <h1>Gaia</h1> 
            </div>
        </div>
    );
};

export default Ingreso; // Asegúrate de exportar el componente actualizado
