import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketService from "../../../service/TicketService";
import "./TicketDetailTechnical.css";
import { format } from "date-fns";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2"; // Importa SweetAlert2

const TicketDetailTechnical = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState("");

    // Cargar ticket
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

    // Enviar respuesta al ticket
    const handleSubmitResponse = async () => {
        if (!response.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campo vacío",
                text: "Por favor, escribe una respuesta antes de enviarla.",
            });
            return;
        }

        try {
            const ticketId = ticket.ticketId;
            // Llamamos al servicio respondToTicket y pasamos el ticketId y la respuesta del usuario
            const result = await TicketService.respondToTicket(ticketId, response);

            // Mostrar respuesta exitosa
            Swal.fire({
                icon: "success",
                title: "Respuesta enviada",
                text: "La respuesta se ha enviado correctamente.",
            }).then(() => {
                // Limpiar el campo de respuesta después de enviar
                setResponse("");
                // Recargar la página
                window.location.reload();
            });
        } catch (error) {
            console.error("Error al enviar la respuesta:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al enviar la respuesta. Intenta nuevamente.",
            });
        }
    };

    const getStatusCircle = (statusDate) => (statusDate ? "in-progress" : "pending");

    if (loading) return <p>Cargando detalle del ticket...</p>;
    if (error) return <p>{error}</p>;
    if (!ticket) return <p>No se encontró el ticket.</p>;

    return (
        <div className="ticket-detail-container">
            <div className="cards-container">
                {/* Card de Detalle del Ticket */}
                <div className="card">
                    <div className="breadcrumb">
                        <a href="/list">Tickets</a> &gt; <span>Detalle</span>
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

                {/* Card de Estado del Ticket */}
                <div className="card">
                    <h3 className="title">Estado</h3>
                    <ul className="timeline">
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.createdAt)}`}>
                                {ticket.createdAt ? <FaCheck /> : <FaTimes />}
                            </div>
                            <div className="text">
                                Registrado -{" "}
                                {ticket.createdAt && format(new Date(ticket.createdAt), "dd/MM/yyyy HH:mm:ss")}
                            </div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.assingnedAt)}`}>
                                {ticket.assingnedAt ? <FaCheck /> : <FaTimes />}
                            </div>
                            <div className="text">
                                Asignado - {ticket.assingnedAt || "Pendiente"}
                            </div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.inProgressAt)}`}>
                                {ticket.inProgressAt ? <FaCheck /> : <FaTimes />}
                            </div>
                            <div className="text">
                                En progreso - {ticket.inProgressAt || "Pendiente"}
                            </div>
                        </li>
                        <li>
                            <div className={`circle ${getStatusCircle(ticket.resolvedAt)}`}>
                                {ticket.resolvedAt ? <FaCheck /> : <FaTimes />}
                            </div>
                            <div className="text">
                                Finalizado - {ticket.resolvedAt || "Pendiente"}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mostrar tarjeta de respuesta solo si está asignado */}
            {ticket.assingnedAt && !ticket.inProgressAt && (
                <div className="card response-card">
                    <h3 className="title">Enviar Respuesta</h3>
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        rows="6"
                        className="response-textarea"
                    ></textarea>
                    <button onClick={handleSubmitResponse} className="response-button">
                        Enviar respuesta
                    </button>
                </div>
            )}
        </div>
    );
};

export default TicketDetailTechnical;
