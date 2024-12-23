import React, { useEffect, useState } from "react";
import UserService from "../service/UserService";
import TicketService from "../service/TicketService";

const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [image, setImage] = useState(null); // Para almacenar la imagen
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Obtiene el token de localStorage
        if (!token) {
            setError("No se encontró el token de autenticación.");
            return;
        }

        // Primero, obtener el rol del usuario
        UserService.getRole(token)
            .then((data) => setRole(data)) // Asigna el rol a la variable de estado
            .catch((err) => setError("Error obteniendo el rol del usuario."));

        // Luego, obtener la imagen asociada al ticket (por ejemplo, con el ID 1)
        TicketService.getImageByTicket(1) // Cambia el ID según sea necesario
            .then((imageData) => {
                // Crea un Blob a partir de la respuesta de la imagen
                const imageBlob = new Blob([imageData], { type: "image/jpeg" });
                // Crea una URL a partir del Blob
                const imageUrl = URL.createObjectURL(imageBlob);
                setImage(imageUrl); // Guarda la URL de la imagen en el estado
            })
            .catch((err) => setError("Error obteniendo la imagen del ticket."));
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
            {image && (
                <div>
                    <h2>Imagen del Ticket:</h2>
                    <img src={image} alt="Ticket" style={{ maxWidth: "100%" }} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
