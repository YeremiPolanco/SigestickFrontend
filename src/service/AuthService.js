import axios from 'axios';

const API_URL = 'http://localhost:9090/auth'; // Asegúrate de que esta URL sea correcta según tu configuración

class AuthService {
    // Método de Login
    async login(username, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Solo si el backend maneja cookies o autenticación basada en sesiones
            });

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('fullName', response.data.fullName);
                localStorage.setItem('role', response.data.role);
            }
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    // Método de Registro
    async register(firstName, lastName, email, dni, password, roleId) {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                firstName,
                lastName,
                email,
                dni,
                password,
                role: {
                    roleId,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    // Obtener el usuario actual
    async getCurrentUser() {
        const token = localStorage.getItem('authToken'); // Asume que el token está guardado en localStorage
        if (!token) {
            throw new Error('No hay un usuario autenticado.');
        }

        // Decodifica el token para obtener el usuario (esto dependerá de tu backend)
        try {
            const userPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del payload del JWT
            return { username: userPayload.username, roles: userPayload.roles };
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            throw new Error('Token inválido.');
        }
    }
}

export default new AuthService();
