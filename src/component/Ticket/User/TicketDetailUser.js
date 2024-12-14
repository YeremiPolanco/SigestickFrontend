import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketService from "../../../service/TicketService";
import "./TicketDetailUser.css";
import { format } from "date-fns";
import { FaCheck, FaTimes } from "react-icons/fa";  // Añadir íconos

const TicketDetailUser = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const fetchedTicket = await TicketService.getTicketById(id);
                setTicket(fetchedTicket);
            } catch (err) {
                setError("No se pudo cargar el detalle del ticket.");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);

    if (loading) return <p>Cargando detalle del ticket...</p>;
    if (error) return <p>{error}</p>;
    if (!ticket) return <p>No se encontró el ticket.</p>;

    // Función para obtener el estado del círculo
    const getStatusCircle = (statusDate) => {
        return !statusDate || statusDate === "Pendiente" ? 'pending' : 'in-progress';
    };

    const getImageUrl = (imageBytes) => {
        if (imageBytes) {
            const byteCharacters = atob(imageBytes);  // Decodifica el string base64
            const byteArray = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);  // Convierte cada carácter en su valor ASCII
            }

            const blob = new Blob([byteArray], { type: "image/jpeg" });  // Crea un blob con los datos binarios
            return URL.createObjectURL(blob);  // Convierte el blob en un URL
        }
        return null;
    };

    return (
        <div className="ticket-detail-container">
            <div className="cards-container">
                {/* Card de Detalle del Ticket */}
                <div className="card">
                    <div className="breadcrumb">
                        <a href="/list">Tickets</a> &gt; <a>Detalle</a>
                    </div>
                    <div className="details">
                        <h2 className="title">Detalle del Ticket #{ticket.ticketId}</h2>
                        <div className="item">
                            <span>Asunto:</span> {ticket.subject}
                        </div>
                        <div className="item">
                            <span>Descripción:</span> {ticket.description}
                        </div>
                        <div className="item">
                            <span>Nombre completo:</span> {ticket.fullName}
                        </div>
                        <div className="item">
                            <span>Email:</span> {ticket.email}
                        </div>
                        <div className="item">
                            <span>Usuario:</span> {ticket.username}
                        </div>
                        <div className="item">
                            <span>Estado:</span> {ticket.status.description}
                        </div>
                        <div className="item">
                            <span>Prioridad:</span> {ticket.priority.level}
                        </div>
                        <div className="item">
                            <span>Técnico:</span> {ticket.technical.fullName || "No asignado"}
                        </div>
                    </div>
                </div>

                {ticket.image && (
                    <div className="card">
                        <h3 className="title">Imagen adjunta</h3>
                        <img
                            src={getImageUrl(ticket.image)} // Usamos la función getImageUrl para convertir el byte[] a una URL
                            alt="Imagen adjunta"
                            className="ticket-image"
                        />
                    </div>
                )}


                {/* Card de Estado del Ticket */}
                <div className="card">
                    <h3 className="title">Estado</h3>
                    <ul className="timeline">
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.createdAt)}`}>
                                {ticket.createdAt ? <FaCheck/> : <FaTimes/>}
                            </div>
                            <div className="text">Registrado - {ticket.createdAt && format(new Date(ticket.createdAt), 'dd/MM/yyyy HH:mm:ss')}</div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.assingnedAt)}`}>
                                {ticket.assingnedAt ? <FaCheck/> : <FaTimes/>}
                            </div>
                            <div className="text">Asignado - {ticket.assingnedAt && format(new Date(ticket.assingnedAt), 'dd/MM/yyyy HH:mm:ss') || "Pendiente"}</div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.inProgressAt)}`}>
                                {ticket.inProgressAt ? <FaCheck/> : <FaTimes/>}
                            </div>
                            <div className="text">En progreso - {ticket.inProgressAt && format(new Date(ticket.inProgressAt), 'dd/MM/yyyy HH:mm:ss') || "Pendiente"}</div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.resolvedAt)}`}>
                                {ticket.resolvedAt ? <FaCheck/> : <FaTimes/>}
                            </div>
                            <div className="text">Finalizado - {ticket.resolvedAt && format(new Date(ticket.resolvedAt), 'dd/MM/yyyy HH:mm:ss') || "Pendiente"}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailUser;