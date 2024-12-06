import React, { useState } from 'react';
import { FaBars, FaTimes, FaWarehouse, FaSignOutAlt } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import './Sidebar.css';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function getFullName() {
        return localStorage.getItem("fullName");
    }

    function getRole() {
        return localStorage.getItem("role");
    }


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const fullName = getFullName();
    const role = getRole();

    const handleLogout = () => {
        // Mostrar la alerta de confirmación
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar el token de localStorage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userName'); // Si guardas también el nombre del usuario
                localStorage.removeItem('userRole'); // Si guardas también el rol del usuario

                // Mostrar mensaje de éxito
                Swal.fire({
                    title: "Logged out!",
                    text: "You have successfully logged out.",
                    icon: "success"
                }).then(() => {
                    // Redirigir a la raíz (página de login o principal)
                    navigate('/');
                });
            }
        });
    };

    return (
        <div className="container">
            {/* Icono para abrir/cerrar el sidebar */}
            <button onClick={toggleSidebar} className="menu-button">
                {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h2 className="title">{fullName}</h2>
                <h2 className="title">{role}</h2>
                <ul className="list">
                    <li className="list-item">
                        <FaWarehouse className="icon"/>
                        <Link to="/dashboard" className="link">Dashboard</Link>
                    </li>
                    <li className="list-item">
                        <FaWarehouse className="icon"/>
                        <Link to="/order" className="link">Order</Link>
                    </li>
                    <li className="list-item">
                        <FaWarehouse className="icon"/>
                        <Link to="/hello-world" className="link">hw</Link>
                    </li>
                    <li className="list-item">
                        <FaSignOutAlt className="icon"/>
                        <button onClick={handleLogout} className="logout-button">Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
