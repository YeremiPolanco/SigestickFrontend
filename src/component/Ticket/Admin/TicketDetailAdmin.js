import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketService from "../../../service/TicketService";
import "./TicketDetailAdmin.css";
import {format} from "date-fns";

const TicketDetailAdmin = () => {
    const { id } = useParams(); // Ajusta "id" según el nombre en tu ruta
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                console.log("Fetching ticket with ID:", id);
                const fetchedTicket = await TicketService.getTicketById(id);
                setTicket(fetchedTicket);
            } catch (err) {
                console.error("Error fetching ticket details:", err);
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

    return (
        <div className="ticket-detail">
            <h1>Detalle del Ticket #{ticket.ticketId}</h1>
            <ul>
                <li><strong>Estado:</strong> {ticket.status.description}</li>
                <li><strong>Prioridad:</strong> {ticket.priority.level}</li>
                <li><strong>Descripción:</strong> {ticket.description}</li>
                <li><strong>Usuario:</strong> {ticket.username}</li>
                <li><strong>Nombre completo:</strong> {ticket.fullName}</li>
                <li><strong>Email:</strong> {ticket.email}</li>
                <li><strong>Técnico:</strong> {ticket.technical.fullName || "No asignado"}</li>
                <li><strong>Asunto:</strong> {ticket.subject}</li>
                <li><strong>Fecha de creación:</strong> {format(new Date(ticket.createdAt), 'dd/MM/yyyy HH:mm:ss')}</li>
                <li><strong>Fecha en progreso:</strong> {ticket.inProgressAt || "Espera"}</li>
                <li><strong>Fecha de resolución:</strong> {ticket.resolvedAt || "Espera"}</li>
            </ul>
        </div>
    );
};

export default TicketDetailAdmin;
