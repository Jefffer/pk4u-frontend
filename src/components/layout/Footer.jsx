import React from 'react';
import { FaGithub, FaReact, FaJava, FaInfoCircle  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const frontendRepoUrl = "https://github.com/Jefffer/PK4U-frontend";
  const technologies = {
    frontend: ["React", "React Router", "JavaScript (ES6)", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Spring Boot", "Java"],
    databasesAndMaps: ["MongoDB", "Elasticsearch", "OpenStreetMap"]
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-800 dark:text-white border-t-1 border-teal-800 shadow-md py-8 px-4 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Sección de Información del Proyecto */}
        <div className="text-center md:text-left">
          <h5 className="text-xl font-bold mb-2">PK4U: Parking for You</h5>
          <p className="text-sm text-gray-400">
            Gestión inteligente de aparcamientos en tiempo real para Smart Cities.
            Este proyecto forma parte del Trabajo Fin de Máster de la UNIR.
          </p>
        </div>

        {/* Sección de Enlaces y Navegación */}
        <div className="text-center">
          <h5 className="text-lg font-semibold mb-2">Navegación</h5>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <FaInfoCircle className="w-4 h-4 mr-2" />
                Acerca del Proyecto
              </Link>
            </li>
            <li>
               <Link to="/" className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <FaReact className="w-4 h-4 mr-2" />
                Ir al mapa
              </Link>
            </li>
          </ul>
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
          Desarrollado con 
          <FaReact 
            className="inline-block text-teal-400 mx-1 align-middle" 
            aria-label="React Icon" 
          />
          <span className="text-teal-400 font-semibold">React</span> 
          {' y'}
          <FaJava 
            className="inline-block text-orange-500 mx-1 align-middle" // Usando naranja para Java, puedes cambiarlo
            aria-label="Java Icon"
          /> 
          <span className="text-orange-500 font-semibold">Java</span>
        </p>
      </div>
      {/* <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm font-medium text-gray-300 dark:text-gray-400 mb-3">
          Tecnologías Clave Utilizadas en este TFM:
        </p>
        <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <p>
            <span className="font-semibold text-gray-300 dark:text-gray-400">Frontend:</span> {technologies.frontend.join(", ")}.
          </p>
          <p>
            <span className="font-semibold text-gray-300 dark:text-gray-400">Backend:</span> {technologies.backend.join(", ")}.
          </p>
          <p>
            <span className="font-semibold text-gray-300 dark:text-gray-400">Datos y Mapas:</span> {technologies.databasesAndMaps.join(", ")}.
          </p>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;