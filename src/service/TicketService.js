import axios from "axios";

const BASE_URL = "http://localhost:9090/api/tickets";

// Obtiene el token de autenticación desde localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Token no encontrado. Inicia sesión.");
    }
    return token;
};

const TicketService = {
    // Obtiene un ticket por su ID
    getTicketById: async (ticketId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            throw new Error("No se pudo obtener el ticket.");
        }
    },

    getImageByTicket: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/attachment/${id}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            throw new Error("No se pudo obtener el ticket.");
        }
    },

    // Obtiene todos los tickets
    getAllTickets: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/all-ticket`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener todos los tickets:", error);
            throw new Error("No se pudieron obtener los tickets.");
        }
    },

    // Obtiene todos los tickets del usuario actual
    getAllMyTickets: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/all-my-ticket`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener mis tickets:", error);
            throw new Error("No se pudieron obtener tus tickets.");
        }
    },

    getTicketsWithNoTechnical: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tickets-with-no-technical`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener mis tickets:", error);
            throw new Error("No se pudieron obtener tus tickets.");
        }
    },

    assignTicketToTechnician: async (ticketId) => {
        try {
            const response = await axios.post(`${BASE_URL}/${ticketId}`, {}, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al asignar el ticket:", error);
            throw new Error("No se pudo asignar el ticket.");
        }
    },

    getTicketsByTechnical: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/all-my-technical-ticket`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener mis tickets:", error);
            throw new Error("No se pudieron obtener tus tickets.");
        }
    },

    createTicket: async (ticketData, attachments) => {
        try {
            const formData = new FormData();

            // Añade los datos del ticket al FormData
            formData.append(
                "ticket",
                new Blob([JSON.stringify(ticketData)], { type: "application/json" }) // Asegura que el ticket se envíe como JSON
            );

            // Añade las imágenes (archivos adjuntos) al FormData
            if (attachments && attachments.length > 0) {
                attachments.forEach((file) => {
                    formData.append("attachments", file); // Asegúrate de que "attachments" sea el nombre esperado por el backend
                });
            }

            const response = await axios.post(`${BASE_URL}`, formData, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`, // Incluye el token de autenticación si es necesario
                    "Content-Type": "multipart/form-data", // Asegura que se envíen archivos adjuntos
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw new Error("No se pudo crear el ticket. Por favor, intenta nuevamente.");
        }
    },

    respondToTicket: async (ticketId, responseMessage) => {
        try {
            const response = await axios.put(`${BASE_URL}/${ticketId}/response`, responseMessage, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                    "Content-Type": "text/plain",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al responder al ticket:", error);
            throw new Error("No se pudo responder al ticket.");
        }
    },

    // Nueva función para finalizar el ticket
    finishTicket: async (ticketId) => {
        try {
            const response = await axios.put(`${BASE_URL}/${ticketId}/finish`, {}, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al finalizar el ticket:", error);
            throw new Error("No se pudo finalizar el ticket.");
        }
    },
};

export default TicketService;
