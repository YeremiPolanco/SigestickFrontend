import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Login from "./component/Auth/Login";
import Sidebar from "./component/Adicionales/Sidebar";
import ThemeSwitcher from "./component/Adicionales/ThemeSwitcher";
import UserService from "./service/UserService";
import ListAdmin from "./component/Ticket/Admin/ListAdmin";
import ListTechnical from "./component/Ticket/Technical/ListTechnical";
import ListUser from "./component/Ticket/User/ListUser";
import TicketDetailAdmin from "./component/Ticket/Admin/TicketDetailAdmin";
import TicketDetailUser from "./component/Ticket/User/TicketDetailUser";
import TicketDetailTechnical from "./component/Ticket/Technical/TicketDetailTechnical";
import ListTechnicianTickets from "./component/Ticket/Technical/ListTechnicianTickets";

const App = () => {
    const location = useLocation();
    const shouldShowSidebar = location.pathname !== "/";

    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Usuario no autenticado");
                }

                const userRole = await UserService.getRole(token);
                if (!userRole) {
                    throw new Error("Rol no encontrado");
                }

                setRole(userRole);
            } catch (error) {
                console.error("Error obteniendo el rol:", error);
                localStorage.removeItem("authToken"); // Limpia el token inválido
                setRole(null); // Marca como no autenticado
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    // Redirige al login si no hay token o el usuario no está autenticado
    if (!role && location.pathname !== "/") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="App">
            <ThemeSwitcher />
            {shouldShowSidebar && <Sidebar />}
            <Routes>
                {/* Ruta pública */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Rutas privadas según el rol */}
                {role === "ADMIN" && (
                    <>
                        <Route path="/list" element={<ListAdmin />} />
                        <Route path="/list/:id" element={<TicketDetailAdmin />} />
                    </>
                )}

                {role === "TECHNICAL" && (
                    <>
                        <Route path="/list" element={<ListTechnical />} />
                        <Route path="/list-technical" element={<ListTechnicianTickets />} />
                        <Route path="/list/:id" element={<TicketDetailTechnical />} />
                    </>
                )}

                {role === "USER" && (
                    <>
                        <Route path="/list" element={<ListUser />} />
                        <Route path="/list/:id" element={<TicketDetailUser />} />
                    </>
                )}

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

const WrapperApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrapperApp;
