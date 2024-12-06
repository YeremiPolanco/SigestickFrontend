import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./TicketList.css"; // Estilos de la lista

const TicketList = ({ role, fetchTickets }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const loadTickets = async () => {
            const fetchedTickets = await fetchTickets();
            setTickets(fetchedTickets);
        };

        loadTickets();
    }, [fetchTickets]);

    const moveCard = (draggedIndex, hoverIndex) => {
        const updatedTickets = [...tickets];
        const [draggedCard] = updatedTickets.splice(draggedIndex, 1);
        updatedTickets.splice(hoverIndex, 0, draggedCard);
        setTickets(updatedTickets);
    };

    return (
        <div className="ticket-list">
            <h2>Rol actual: {role}</h2>
            <div className="card-container">
                {tickets.map((ticket, index) => (
                    <Card
                        key={ticket.id}
                        ticket={ticket}
                        index={index}
                        moveCard={moveCard}
                    />
                ))}
            </div>
        </div>
    );
};

export default TicketList;
