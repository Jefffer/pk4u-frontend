import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import {
    LiaSignOutAltSolid,
    LiaBarsSolid,
    LiaTimesSolid,
    LiaSearchLocationSolid,
    LiaPlusSolid,
    LiaGithub
} from "react-icons/lia";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import HeaderMenu from "../ui/DropdownMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const logoUrl = "/pk4u-v1.png";

const Header = ({
                    userAlias,
                    onLogout,
                    currentTheme,
                    toggleTheme,
                    isSidebarVisible,
                    toggleSidebar,
                    onSearchClick,
                }) => {
    const { t, i18n } = useTranslation();

    // Fuerza re-render cuando cambia el idioma
    useEffect(() => {}, [i18n.language]);

    return (
        <header className="bg-white dark:bg-slate-950 text-teal-600 dark:text-teal-400 border-b-1 border-teal-800 p-3 sm:p-4 shadow-md sticky top-0 z-[1100]">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/* Botón para alternar el Sidebar */}
                    <button
                        onClick={toggleSidebar}
                        title={isSidebarVisible ? t("Ocultar detalles") : t("Mostrar detalles")}
                        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-200"
                    >
                        <LiaTimesSolid
                            className={`w-4 h-4 transition-transform duration-500 ease-in-out ${
                                isSidebarVisible ? "rotate-0" : "rotate-135"
                            }`}
                        />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <img
                            src={logoUrl}
                            alt="PK4U Logo"
                            className="h-10 w-auto sm:h-11"
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
                        <h1 className="text-xl sm:text-2xl font-bold block">
                            PK4U
                            {/* - Parking for You */}
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-4">
                    {userAlias && (
                        <span className="text-xs sm:text-sm md:inline">
                            {t("Hola,")} <span className="font-semibold">{userAlias}</span>!
                        </span>
                    )}

                    {/* Buscador en el Header */}
                    <div className="relative">
                        <button
                            onClick={onSearchClick}
                            className="flex items-center p-2 rounded-lg transition-all duration-300 cursor-text
                            sm:lg:w-54 sm:pl-2 sm:text-sm sm:text-left sm:text-slate-500 sm:dark:text-slate-400 sm:border sm:border-slate-300 sm:dark:border-none sm:bg-slate-50 sm:dark:bg-slate-700/50 sm:hover:bg-slate-100 sm:dark:hover:bg-slate-700/80 sm:focus:ring-1 sm:w-48"
                            aria-label={t("Buscar parking")}
                        >
                            <LiaSearchLocationSolid className="w-5 h-5 sm:mr-2" />
                            <span className="hidden sm:inline text-xs">{t("Busca tu parking")}</span>
                        </button>
                    </div>

                    {/* Menú de navegación */}
                    <HeaderMenu onLogout={onLogout} />

                    {/* Botón para cambiar tema */}
                    <ThemeToggleButton
                        currentTheme={currentTheme}
                        toggleTheme={toggleTheme}
                    />

                    {/* {userAlias && (
            <button
              onClick={onLogout}
              title="Cambiar de usuario"
              className="flex items-center space-x-2 mr-1 sm:mr-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
            >
              <LiaSignOutAltSolid className="h-4 w-4 sm:h-5 sm:w-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline text-xs sm:text-sm">Salir</span>
            </button>
          )} */}

                    <a
                        href="https://github.com/Jefffer/pk4u-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t("Ver repositorio en GitHub")}
                        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
                    >
                        <LiaGithub className="w-5 h-5" />
                    </a>

                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
};

export default Header;
