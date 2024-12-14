import React, { useState } from 'react';
import './Login.css';
import AuthService from "../../service/AuthService";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(credentials.username, credentials.password)
            .then(() => {
                // Redirigir al usuario o realizar otras acciones después del login
                console.log('Inicio de sesión exitoso');
                window.location.href = '/dashboard'; // Redirección de ejemplo
            })
            .catch((error) => {
                setErrorMessage('Credenciales inválidas. Intente nuevamente.');
            });
    };

    const togglePassword = () => {
        setCredentials((prevState) => ({
            ...prevState,
            showPassword: !prevState.showPassword,
        }));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Bienvenido</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ingrese su usuario"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-wrapper">
                            <input
                                type={credentials.showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Ingrese su contraseña"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePassword}
                            >
                                {credentials.showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>
                <p className="register-link">
                    ¿Olvidaste tu contraseña? <a href="#">Recuperar contraseña</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
