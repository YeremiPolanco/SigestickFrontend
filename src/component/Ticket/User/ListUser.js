import React, { useState, useEffect } from "react";
import "./ListUser.css";
import TicketService from "../../../service/TicketService";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ListUser = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        priorityId: "",
        description: "",
    });
    const [formError, setFormError] = useState("");
    const [attachments, setAttachments] = useState([]); // Estado para manejar los archivos

    const fetchTickets = async () => {
        try {
            const fetchedTickets = await TicketService.getAllMyTickets();
            setTickets(fetchedTickets);
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setError("No se pudieron cargar los tickets.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setAttachments(Array.from(e.target.files)); // Convertir FileList en un array
    };

    const handleSubmit = async () => {
        if (!formData.subject || !formData.priorityId || !formData.description) {
            setFormError("Por favor, completa todos los campos.");
            return;
        }

        const newTicket = {
            subject: formData.subject,
            priority: { priorityId: formData.priorityId },
            description: formData.description,
            createdAt: new Date(),
        };

        Swal.fire({
            title: "¿Deseas guardar el ticket?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await TicketService.createTicket(newTicket, attachments); // Enviar ticket y archivos
                    Swal.fire("Guardado", "El ticket ha sido creado exitosamente.", "success");
                    setShowModal(false);
                    setFormData({ subject: "", priorityId: "", description: "" });
                    setAttachments([]); // Limpiar archivos seleccionados
                    setFormError("");
                    await fetchTickets();
                } catch (err) {
                    Swal.fire("Error", "No se pudo crear el ticket.", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("No guardado", "El ticket no se guardó.", "info");
            }
        });
    };

    if (loading) return <p className="loading">Cargando tickets...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="list-admin">
            <h1 className="list-admin-title">Tus Tickets</h1>
            <button className="create-ticket-button" onClick={() => setShowModal(true)}>
                Crear Ticket
            </button>
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
                            <td>{ticket.status.description}</td>
                            <td>{ticket.username}</td>
                            <td>{format(new Date(ticket.createdAt), "dd/MM/yyyy HH:mm:ss")}</td>
                            <td>{ticket.technical?.fullName || "No asignado"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="modal show" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">Crear Nuevo Ticket</div>
                        <div className="modal-body">
                            {formError && <p className="form-error">{formError}</p>}
                            <label>
                                Asunto:
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Prioridad:
                                <select
                                    name="priorityId"
                                    value={formData.priorityId}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>
                                        Selecciona una prioridad
                                    </option>
                                    <option value="1">Baja</option>
                                    <option value="2">Mediana</option>
                                    <option value="3">Alta</option>
                                    <option value="4">Urgente</option>
                                </select>
                            </label>
                            <label>
                                Descripción:
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </label>
                            <label>
                                Adjuntar archivos:
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button className="close-button" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className="save-button" onClick={handleSubmit}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListUser;
