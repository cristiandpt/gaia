import React, { useState } from 'react';
import UserDAO from "../../daos/user-DAO";
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const newUser = { email, name, password };
            await UserDAO.createUser(newUser);
            navigate('/Inicio');
        } catch (error) {
            console.error("Error en la creación del usuario:", error);
            setError("No se pudo registrar el usuario. Intenta nuevamente.");
        }
    };

    return (
        <>
        <div className="perfil-container">
            
            <div className="perfil-card">
                <h2>Registrar</h2>
                <form onSubmit={handleRegister} className="form">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="button">Registrarse</button>
                </form>
                <h1>Gaia</h1> 
                
            </div>
            <div className="bar"></div> 
        </div>
        <div className="bar"></div> 
        </>
    );
};

export default Registrar;
