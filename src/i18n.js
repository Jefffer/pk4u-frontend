import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es/translation.json";
import en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: "es", // Idioma por defecto
  fallbackLng: "es", // Idioma de respaldo si falta alguna traducción

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
