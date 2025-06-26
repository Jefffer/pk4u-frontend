import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { LiaCheckSolid } from "react-icons/lia";

const LanguageDropdown = ({ isVisible, onClose }) => {
    const dropdownRef = useRef(null);
    const { i18n, t } = useTranslation();

    const languages = [
        { code: "es", name: t("Español"), flag: "/ES.png" },
        { code: "en", name: t("Inglés"), flag: "/EN.png" },
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

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        onClose(); // Cierra el menú después de seleccionar un idioma
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    style={{ zIndex: 1200 }}
                >
                    <ul className="p-2">
                        {languages.map((lang) => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                                        i18n.language === lang.code
                                            ? "bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 font-semibold"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                                    }`}
                                >
                                    <img src={lang.flag} alt={lang.name} className="w-5 h-5 mr-3 rounded-sm" />
                                    <span>{lang.name}</span>
                                    {i18n.language === lang.code && (
                                        <LiaCheckSolid className="ml-auto text-teal-600 dark:text-teal-400" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguageDropdown;