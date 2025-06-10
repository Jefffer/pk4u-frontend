import "./App.css";
import React, { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";
import LoginFake from "./components/auth/LoginFake";
import AboutPage from "./pages/AboutPage"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // Intentamos obtener el alias de localStorage al iniciar
  const [userAlias, setUserAlias] = useState(() =>
    localStorage.getItem("pk4uUserAlias")
  );
  const [aliasHasBeenSet, setAliasHasBeenSet] = useState(
    () => !!localStorage.getItem("pk4uUserAlias")
  );

  // Estado para el tema: 'light' o 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pk4uTheme');
    if (savedTheme) {
      return savedTheme;
    }
    // Preferir el esquema de color del sistema si no hay nada guardado, sino default a oscuro
    // window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    return 'dark'; // Default a oscuro 
  });

  useEffect(() => {
    // Aplicar la clase 'dark' al elemento <html> y guardar en localStorage
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pk4uTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleAliasSubmit = (alias) => {
    localStorage.setItem("pk4uUserAlias", alias); // Guardamos el alias en localStorage
    setUserAlias(alias);
    setAliasHasBeenSet(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("pk4uUserAlias");
    setUserAlias(null);
    setAliasHasBeenSet(false);
  };

  if (!aliasHasBeenSet) {
    return <LoginFake onAliasSubmit={handleAliasSubmit} currentTheme={theme} />;
  }

  // Componente privado para proteger rutas
  const PrivateRoute = ({ children }) => {
    return aliasHasBeenSet ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!aliasHasBeenSet ? <LoginFake onAliasSubmit={handleAliasSubmit} currentTheme={theme} /> : <Navigate to="/" />} />
        
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Layout userAlias={userAlias} onLogout={handleLogout} currentTheme={theme} toggleTheme={toggleTheme} />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/about" 
          element={
            <PrivateRoute>
              <AboutPage userAlias={userAlias} onLogout={handleLogout} currentTheme={theme} toggleTheme={toggleTheme} />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to={aliasHasBeenSet ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
