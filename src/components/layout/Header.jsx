import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggleButton from '../ui/ThemeToggleButton';

const logoUrl = "/pk4u-v1.png";

const Header = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white p-3 sm:p-4 shadow-md sticky top-0 z-[1100]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <img
            src={logoUrl}
            alt="PK4U Logo"
            className="h-10 w-auto sm:h-12" // Ajusta el tamaño según necesites
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              const logoText = document.createElement("span");
              logoText.textContent = "PK4U";
              logoText.className =
                "text-2xl font-bold text-sky-600 dark:text-sky-400";
              e.target.parentNode.insertBefore(logoText, e.target);
            }}
          />
          <h1 className="text-xl sm:text-2xl font-bold hidden sm:block">
            PK4U - Parking for You
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {userAlias && (
            <span className="text-xs sm:text-sm hidden md:inline">
              Hola, <span className="font-semibold">{userAlias}</span>!
            </span>
          )}

          {/* Botón para cambiar tema */}
          <ThemeToggleButton
            currentTheme={currentTheme}
            toggleTheme={toggleTheme}
          />

          {userAlias && (
            <button
              onClick={onLogout}
              title="Cambiar de usuario"
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
            >
              <FaSignOutAlt className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-xs sm:text-sm">Salir</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
