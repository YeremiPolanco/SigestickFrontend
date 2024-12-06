import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./Card.css"; // Estilos específicos para las tarjetas

const Card = ({ ticket, moveCard, index }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "CARD",
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveCard(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const showDetails = () => {
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
        <div
            ref={(node) => dragRef(dropRef(node))}
            className={`card ${isDragging ? "dragging" : ""}`}
        >
            <h3>{ticket.name}</h3>
            <p>{ticket.description}</p>
            <p><strong>Prioridad:</strong> {ticket.priority.level}</p>
            <p><strong>Estado:</strong> {ticket.status.description}</p>
            <button onClick={showDetails} className="details-button" >Detalle</button>
        </div>
    );
};

export default Card;
