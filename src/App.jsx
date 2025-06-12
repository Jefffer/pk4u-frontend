import "./App.css";
import React, { useState, useEffect } from "react";
import Layout from "./components/layout/Layout";
import LoginFake from "./components/auth/LoginFake";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [userAlias, setUserAlias] = useState(() =>
      localStorage.getItem("pk4uUserAlias")
  );
  const [aliasHasBeenSet, setAliasHasBeenSet] = useState(
      () => !!localStorage.getItem("pk4uUserAlias")
  );

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pk4uTheme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
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
    localStorage.setItem("pk4uUserAlias", alias);
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