import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LiaAngleDownSolid } from "react-icons/lia";
import LanguageDropdown from "./LanguageDropDown"; 

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const currentLanguageCode = i18n.language;
    const currentLanguageFlag = currentLanguageCode === "es" ? "/ES.png" : "/EN.png";
    const currentLanguageAlt = currentLanguageCode === "es" ? t("Español") : t("Inglés");

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    return (
        <div className="relative"> {/* Contenedor para el botón y el dropdown */}
            <button
                type="button"
                onClick={toggleDropdown}
                title={t("Cambiar idioma")}
                className="flex items-center p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-200"
                aria-label={t("Cambiar idioma")}
                aria-expanded={isDropdownVisible}
            >
                {/* Icono de la bandera actual */}
                <img
                    src={currentLanguageFlag}
                    alt={currentLanguageAlt}
                    className="w-5 h-5 object-contain rounded-sm"
                    style={{ minWidth: 20, minHeight: 20 }}
                />
                {/* Flecha hacia abajo */}
                <LiaAngleDownSolid
                    className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                        isDropdownVisible ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>

            <LanguageDropdown isVisible={isDropdownVisible} onClose={closeDropdown} />
        </div>
    );
};

export default LanguageSwitcher;