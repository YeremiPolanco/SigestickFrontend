import React, { useEffect, useState } from "react";
import UserService from "../service/UserService";

const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Obtiene el token de localStorage
        if (!token) {
            setError("No se encontró el token de autenticación.");
            return;
        }

        UserService.getRole(token)
            .then((data) => setRole(data)) // Asigna el rol a la variable de estado
            .catch((err) => setError("Error obteniendo el rol del usuario."));
    }, []);

    return (
        <div className="dashboard">
            <h1>Hola Mundo</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error && !role && <p>Cargando rol del usuario...</p>}
            {role && (
                <div>
                    <h2>Rol del Usuario:</h2>
                    <p>{role}</p> {/* Muestra el nombre del rol */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
