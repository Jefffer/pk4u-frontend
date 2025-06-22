import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  LiaInfoCircleSolid,
  LiaMapMarkedAltSolid,
  LiaBarsSolid,
  LiaSignOutAltSolid,
} from "react-icons/lia";

// Los elementos del menú principal
const DropdownMenu = ({ isVisible, onClose, onLogout }) => {
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const menuItems = [
    { to: "/", label: t("menu.map"), icon: <LiaMapMarkedAltSolid /> },
    { to: "/about", label: t("menu.about"), icon: <LiaInfoCircleSolid /> },
    // Futuros enlaces se pueden añadir aquí
  ];

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  return (
      <AnimatePresence>
        {isVisible && (
            <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                style={{ zIndex: 1200 }} // Asegura que esté por encima de otros elementos
            >
              <ul className="p-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                          to={item.to}
                          onClick={onClose}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 rounded-md transition-colors duration-150"
                      >
                  <span className="mr-3 text-teal-500 text-base">
                    {item.icon}
                  </span>
                        {item.label}
                      </Link>
                    </li>
                ))}
              </ul>

              {/* Separador */}
              <div className="h-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

              {/* Botón de Salir */}
              <ul className="p-2">
                <li>
                  <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-md transition-colors duration-150"
                  >
                <span className="mr-3 text-red-500 text-base">
                  <LiaSignOutAltSolid />
                </span>
                    {t("menu.logout")}
                  </button>
                </li>
              </ul>
            </motion.div>
        )}
      </AnimatePresence>
  );
};

const HeaderMenu = ({ onLogout }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Evita que el clic se propague y cierre el menú inmediatamente
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
      <div className="relative mr-1 sm:mr-2">
        <button
            onClick={toggleMenu}
            title="Navegación"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
        >
          <LiaBarsSolid className="w-5 h-5" />
        </button>
        <DropdownMenu
            isVisible={isMenuVisible}
            onClose={closeMenu}
            onLogout={onLogout}
        />
      </div>
  );
};

export default HeaderMenu;
