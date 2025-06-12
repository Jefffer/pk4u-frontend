import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    return (
        <div className="flex items-center space-x-2 ml-2">
            <button
                type="button"
                onClick={() => i18n.changeLanguage("es")}
                className={`flex items-center p-1 rounded ${
                    i18n.language === "es" ? "bg-slate-200 dark:bg-slate-700" : ""
                }`}
                aria-label={t("Cambiar a español")}
            >
                <img
                    src="/ES.png"
                    alt={t("Español")}
                    className="w-6 h-6"
                    style={{ minWidth: 24, minHeight: 24 }}
                />
            </button>
            <button
                type="button"
                onClick={() => i18n.changeLanguage("en")}
                className={`flex items-center p-1 rounded ${
                    i18n.language === "en" ? "bg-slate-200 dark:bg-slate-700" : ""
                }`}
                aria-label={t("Cambiar a inglés")}
            >
                <img
                    src="/EN.png"
                    alt={t("Inglés")}
                    className="w-6 h-6"
                    style={{ minWidth: 24, minHeight: 24 }}
                />
            </button>
        </div>
    );
};

export default LanguageSwitcher;
