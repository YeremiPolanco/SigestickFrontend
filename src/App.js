import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Login from "./component/Auth/Login";
import Sidebar from "./component/Adicionales/Sidebar";
import List from "./component/Ticket/List";
import ThemeSwitcher from "./component/Adicionales/ThemeSwitcher";

const App = () => {
    const location = useLocation();
    const shouldShowSidebar = location.pathname !== "/";

    return (
        <div className="App">
            <ThemeSwitcher />
            {shouldShowSidebar && <Sidebar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/list" element={<List />} />
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
