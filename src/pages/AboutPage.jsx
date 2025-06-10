import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  FaCity,
  FaSearchLocation,
  FaLaptopCode,
  FaDatabase,
  FaReact,
  FaJava,
  FaUsers,
} from "react-icons/fa";
import {
  LiaGlobeEuropeSolid,
  LiaProjectDiagramSolid,
  LiaKeySolid,
} from "react-icons/lia";

const AboutPage = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header
        userAlias={userAlias}
        onLogout={onLogout}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        isSidebarVisible={null}
        toggleSidebar={() => {}}
        onSearchClick={() => navigate("/")}
      />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <img
          src="/about1.png"
          alt="Smart City"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 dark:opacity-60 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-teal-100/60 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-teal-900/40" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/pk4u-v1.png"
            alt="PK4U Logo"
            className="h-20 w-20 mb-4 drop-shadow-xl rounded-full bg-white/80 dark:bg-slate-900/80 p-2"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400 drop-shadow-lg">
            PK4U: Parking for You
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-slate-700 dark:text-slate-200 font-medium">
            Plataforma abierta y gratuita para la gestión inteligente del aparcamiento urbano en Smart Cities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700 transition"
            >
              Ver Mapa de Parkings
            </Link>
            <a
              href="https://github.com/Jefffer/pk4u-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold shadow-lg hover:bg-slate-900 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
              Ver en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="relative py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center text-red-500 dark:text-red-400">
              <FaCity className="mr-3" />
              El Desafío Urbano
            </h2>
            <p className="mb-4 text-lg">
              En las ciudades modernas, encontrar aparcamiento se ha convertido en un desafío diario que genera estrés, pérdida de tiempo y un aumento innecesario del tráfico y la contaminación.
            </p>
            <p className="mb-4 text-lg">
              Este fenómeno, conocido como <span className="font-semibold text-teal-600 dark:text-teal-400">"cruising for parking"</span>, afecta negativamente la calidad de vida y la sostenibilidad urbana.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Las soluciones comerciales suelen ser propietarias y costosas, limitando su adopción y la interoperabilidad entre servicios de Smart City.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            <img
              src="/about2.png"
              alt="Problema de aparcamiento"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover object-center border-4 border-teal-100 dark:border-teal-900"
              style={{ filter: "grayscale(0.2) brightness(0.95)" }}
            />
            <LiaGlobeEuropeSolid className="absolute -top-8 -right-8 text-[7rem] text-teal-200 dark:text-teal-800 opacity-30 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className="relative py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center relative">
            <img
              src="/about3.png"
              alt="Solución PK4U"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover object-center border-4 border-teal-100 dark:border-teal-900"
              style={{ filter: "grayscale(0.1) brightness(1.05)" }}
            />
            <img
              src="/pk4u-v1.png"
              alt="Logo PK4U"
              className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-white/80 dark:bg-slate-900/80 p-2 shadow-lg border-2 border-teal-200 dark:border-teal-800"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center text-teal-600 dark:text-teal-400">
              <LiaProjectDiagramSolid className="mr-3" />
              Nuestra Solución: PK4U
            </h2>
            <p className="mb-4 text-lg">
              <span className="font-semibold text-teal-600 dark:text-teal-400">PK4U</span> es una plataforma web <span className="font-semibold text-teal-600 dark:text-teal-400">Open Source</span> y gratuita que centraliza la información de disponibilidad de plazas de aparcamiento en tiempo real.
            </p>
            <p className="mb-4 text-lg">
              Unificamos datos de diferentes parkings en una sola interfaz con mapas interactivos, empoderando a los conductores para tomar mejores decisiones y reducir el tráfico y la contaminación.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Nuestro objetivo es democratizar el acceso a la información y fomentar la movilidad sostenible en las ciudades inteligentes.
            </p>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 flex items-center justify-center">
          <LiaKeySolid className="inline-block mr-3 text-yellow-500" />
          Características Clave
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaSearchLocation className="text-5xl text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visualización en Mapa</h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Mapa interactivo con OpenStreetMap que muestra la ubicación de todos los parkings y su estado general.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-5xl text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Información en Tiempo Real</h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Datos de ocupación actualizados periódicamente para reflejar la disponibilidad de plazas de la forma más precisa posible.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaLaptopCode className="text-5xl text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Código Abierto</h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              Proyecto distribuido bajo una licencia Open Source para fomentar la colaboración, la transparencia y la adaptación a las necesidades de cualquier ciudad.
            </p>
          </div>
        </div>
      </section>

      {/* STACK TECNOLÓGICO */}
      <section className="py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Stack Tecnológico
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaReact className="text-5xl text-sky-400 mr-4" />
            <div>
              <h3 className="font-bold text-lg">Frontend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                React, React Router, Tailwind CSS
              </p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaJava className="text-5xl text-orange-500 mr-4" />
            <div>
              <h3 className="font-bold text-lg">Backend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Java, Spring Boot
              </p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaDatabase className="text-5xl text-green-500 mr-4" />
            <div>
              <h3 className="font-bold text-lg">Datos y Búsqueda</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                MongoDB, Elasticsearch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          ¿Listo para transformar la movilidad urbana?
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Únete a la comunidad PK4U, explora el código, contribuye o simplemente utiliza la plataforma para mejorar tu día a día en la ciudad.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 rounded-lg bg-white text-teal-600 font-semibold shadow-lg hover:bg-slate-100 transition"
          >
            Ir al Mapa
          </Link>
          <a
            href="https://github.com/Jefffer/pk4u-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            Ver en GitHub
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;