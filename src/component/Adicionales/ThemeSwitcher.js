import React, { useState, useEffect } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        // Aplicar el tema inicial basado en localStorage
        const savedTheme = localStorage.getItem("darkTheme") === "true";
        setDarkTheme(savedTheme);
        document.body.className = savedTheme ? "dark-theme" : "light-theme";
    }, []);

    const toggleTheme = () => {
        const newTheme = !darkTheme;
        setDarkTheme(newTheme);
        document.body.className = newTheme ? "dark-theme" : "light-theme";
        localStorage.setItem("darkTheme", newTheme);
    };

    return (
        <button className="theme-switcher-button" onClick={toggleTheme}>
            {darkTheme ? "🌞" : "🌚"}
        </button>
    );
};

export default ThemeSwitcher;
