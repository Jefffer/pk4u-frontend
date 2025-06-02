import React from "react";

const Header = ({ userAlias, onLogout }) => { 
  return (
    <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">PK4U - Smart Parking</h1>
        {userAlias && (
          <div className="text-sm">
            <span className="mr-2">Hola, <span className="font-semibold">{userAlias}</span>!</span>
            {/* (Opcional) Botón para cambiar alias/logout 
            <button 
              onClick={onLogout} 
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              Cambiar alias
            </button>
            */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
