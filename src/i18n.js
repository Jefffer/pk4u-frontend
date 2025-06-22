// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa manualmente las traducciones desde src/locales
import es from './locales/es/translation.json';
import en from './locales/en/translation.json';

// Inicializa i18n
i18n
    // Permite que i18n funcione con react-i18next
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
        },
        lng: 'es', // Idioma por defecto
        fallbackLng: 'es', // Idioma de respaldo si falta alguna traducción

        interpolation: {
            escapeValue: false, // React ya escapa automáticamente
        },

        // Puedes agregar más configuraciones aquí si lo necesitas
    });

export default i18n;
