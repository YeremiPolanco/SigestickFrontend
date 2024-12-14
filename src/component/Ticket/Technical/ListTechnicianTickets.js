import React, { useState, useEffect } from "react";
import "./ListTechnical.css";
import TicketService from "../../../service/TicketService";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ListTechnicianTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await TicketService.getTicketsByTechnical();
                setTickets(fetchedTickets);
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError("No se pudieron cargar los tickets.");
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);


    function capitalize(word) {
        if (!word) return ""; // Maneja el caso de cadenas vacías
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    if (loading) return <p className="loading">Cargando tickets...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="list-admin">
            <h1 className="list-admin-title">Listado de Tickets (Admin)</h1>
            <div className="table-container">
                <table className="tickets-table">
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Asunto</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                        <th>Fecha de registro</th>
                        <th>Técnico</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.ticketId}>
                            <td>{ticket.ticketId}</td>
                            <td>
                                <Link to={`/list/${ticket.ticketId}`}>
                                    {ticket.subject}
                                </Link>
                            </td>
                            <td>{capitalize(ticket.status.description)}</td>
                            <td>{ticket.username}</td>
                            <td>{format(new Date(ticket.createdAt), "dd/MM/yyyy HH:mm:ss")}</td>
                            <td>{ticket.technical?.fullName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTechnicianTickets;
