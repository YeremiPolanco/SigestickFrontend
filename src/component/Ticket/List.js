import React, { useState, useEffect } from "react";
import TicketService from "../../service/TicketService";
import "./List.css";
import Swal from "sweetalert2";

const List = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const fetchedTickets = await TicketService.getAllTickets(token);
                setTickets(fetchedTickets);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        fetchTickets();
    }, []);

    const showDetails = (ticket) => {  // Pasamos el ticket como parámetro
        Swal.fire({
            title: `Detalle ticket de ${ticket.fullName} número de ticket ${ticket.ticketId}`,
            html: `
                <p><strong>Username:</strong> ${ticket.username}</p>
                <p><strong>Email:</strong> ${ticket.email}</p>
                <p><strong>Descripción:</strong> ${ticket.description}</p>
                <p><strong>Prioridad:</strong> ${ticket.priority.level}</p>
                <p><strong>Estado:</strong> ${ticket.status.description}</p>
                <p><strong>Técnico:</strong> ${ticket.technical}</p>
            `,
            icon: "info",
            confirmButtonText: "Cerrar",
        });
    };

    return (
        <>
            <h1 className="title">Listado de Tickets</h1>
            <div className="flex-grid">
                {tickets.map((ticket) => (
                    <div className="flex-card" key={ticket.id}>
                        <h3>{ticket.name}</h3>
                        <p>{ticket.description}</p>
                        <p><strong>Prioridad:</strong> {ticket.priority.level}</p>
                        <p><strong>Estado:</strong> {ticket.status.description}</p>
                        <button className="details-button" onClick={() => showDetails(ticket)}>Ver Detalles</button> {/* Pasamos el ticket aquí */}
                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
