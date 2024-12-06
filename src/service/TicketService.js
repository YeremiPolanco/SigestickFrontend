const BASE_URL = "http://localhost:9090/api/tickets";

const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Token no encontrado. Inicia sesión.");
    }
    return token;
};

const TicketService = {
    getAllTickets: async () => {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/all-ticket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los tickets: ${response.statusText}`);
        }

        return response.json();
    },

    getAllMyTickets: async () => {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/all-my-ticket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener mis tickets: ${response.statusText}`);
        }

        return response.json();
    },
};

export default TicketService;
