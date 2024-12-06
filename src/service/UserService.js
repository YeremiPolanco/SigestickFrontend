import axios from "axios";

const BASE_URL = "http://localhost:9090/api/user"; // Cambia la URL si es necesario

const UserService = {

    getRole: async (token) => {
        try {
            const response = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
                },
            });
            return response.data; // Devuelve el rol del usuario
        } catch (error) {
            console.error("Error obteniendo el rol del usuario:", error);
            throw error;
        }
    },
};

export default UserService;
