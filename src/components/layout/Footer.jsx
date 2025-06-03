import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Necesitarás instalar react-icons: npm install react-icons

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Asumo que los repositorios son los que están en TFM-SmartParking-Borrador2.docx [cite: 2]
  // Específicamente el de frontend.
  const frontendRepoUrl = "https://github.com/Jefffer/PK4U-frontend"; // Cambia esto si es necesario

  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-md py-8 px-4 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Sección de Información del Proyecto */}
        <div className="text-center md:text-left">
          <h5 className="text-xl font-bold mb-2">PK4U Smart Parking</h5>
          <p className="text-sm text-gray-400">
            Gestión inteligente de aparcamientos en tiempo real para Smart Cities.
            Este proyecto forma parte del Trabajo Fin de Máster de la UNIR.
          </p>
        </div>

        {/* Sección de Enlaces y Navegación (opcional, puedes añadir más aquí) */}
        <div className="text-center">
          {/* Podrías añadir enlaces a secciones importantes de tu app si lo deseas */}
        </div>

        {/* Sección de Copyright y Enlace a GitHub */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400 mb-2">
            &copy; {currentYear} PK4U Team
          </p>
          <a
            href={frontendRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300"
            aria-label="Repositorio de Frontend en GitHub"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Ver Código Fuente
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-xs text-gray-500">
          Desarrollado con <span className="text-teal-400 font-semibold">React</span> y <span className="text-sky-400 font-semibold">Tailwind CSS</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;