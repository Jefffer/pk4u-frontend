// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        es: { translation: { "Busca tu parking": "Busca tu parking" } },
        en: { translation: { "Busca tu parking": "Search your parking" } }
    },
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false }
});

export default i18n;