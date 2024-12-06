import axios from 'axios';

const API_URL = 'http://localhost:9090/auth'; // Asegúrate de que esta URL sea correcta según tu configuración

class AuthService {
    // Login Method
    login(username, password) {
        return axios.post(`${API_URL}/login`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Solo si el backend maneja cookies o autenticación basada en sesiones
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('fullName', response.data.fullName);
                localStorage.setItem('role', response.data.role);
            }
            return response.data;
        }).catch(error => {
            console.error('Error en login:', error);
            throw error;
        });
    }

    // Register Method
    register(firstName, lastName, email, dni, password, roleId) {
        return axios
            .post(`${API_URL}/register`, {
                firstName,
                lastName,
                email,
                dni,
                password,
                role: {
                    roleId
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error en registro:', error);
                throw error;
            });
    }

    // Logout Method
    logout() {
        localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    }

    // Verifica si el usuario está autenticado
    isAuthenticated() {
        return localStorage.getItem('user') !== null;
    }

    // Obtener el token del usuario
    getToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.token : null;
    }
}

export default new AuthService();
