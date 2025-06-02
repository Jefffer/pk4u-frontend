// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';
  import Layout from './components/layout/Layout';
  import LoginFake from './components/auth/LoginFake';

function App() {
  // Intentamos obtener el alias de localStorage al iniciar
  const [userAlias, setUserAlias] = useState(() => localStorage.getItem('pk4uUserAlias'));
  const [aliasHasBeenSet, setAliasHasBeenSet] = useState(() => !!localStorage.getItem('pk4uUserAlias'));

  const handleAliasSubmit = (alias) => {
    localStorage.setItem('pk4uUserAlias', alias); // Guardamos el alias en localStorage
    setUserAlias(alias);
    setAliasHasBeenSet(true);
  };

  // (Opcional) Añadir una función para "cerrar sesión" o cambiar alias
  // const handleLogout = () => {
  //   localStorage.removeItem('pk4uUserAlias');
  //   setUserAlias(null);
  //   setAliasHasBeenSet(false);
  // };

  if (!aliasHasBeenSet) {
    return <LoginFake onAliasSubmit={handleAliasSubmit} />;
  }

  // Puedes pasar userAlias a Layout si quieres mostrarlo, por ejemplo, en el Header
  return <Layout userAlias={userAlias} /* onLogout={handleLogout} */ />;
}

export default App;
