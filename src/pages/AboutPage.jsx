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

// Puedes pasar las props necesarias al Header. Para esta página, algunas pueden ser estáticas.
const AboutPage = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header
        userAlias={userAlias}
        onLogout={onLogout}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        // Props no relevantes para esta página, pero necesarias para el componente
        isSidebarVisible={null}
        toggleSidebar={() => {}}
        onSearchClick={() => navigate("/")}
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400">
            Acerca de PK4U
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Una solución de código abierto para la gestión inteligente del
            aparcamiento en las Smart Cities.
          </p>
        </div>

        {/* Sección: El Problema */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <FaCity className="mr-3 text-red-500" />
              El Desafío Urbano
            </h2>
            <p className="mb-4">
              En las ciudades modernas, encontrar aparcamiento se ha convertido
              en un desafío diario que genera estrés, pérdida de tiempo y un
              aumento innecesario del tráfico y la contaminación. Este fenómeno,
              conocido como "cruising for parking", afecta negativamente la
              calidad de vida y la sostenibilidad urbana.
            </p>
            <p>
              Aunque existen soluciones comerciales de "Smart Parking", suelen
              ser sistemas propietarios, costosos y cerrados, lo que limita su
              adopción y la interoperabilidad entre diferentes servicios de una
              ciudad inteligente.
            </p>
          </div>
          <div className="flex justify-center">
            <LiaGlobeEuropeSolid className="text-8xl text-teal-500 opacity-20" />
          </div>
        </div>

        {/* Sección: Nuestra Solución */}
        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <LiaProjectDiagramSolid className="mr-3 text-teal-500" />
            Nuestra Solución: PK4U
          </h2>
          <p className="text-center max-w-4xl mx-auto">
            PK4U nace como una respuesta{" "}
            <span className="font-semibold text-teal-500">Open Source</span> a
            este problema. Nuestro objetivo es ofrecer una plataforma web
            centralizada y gratuita que permita a los ciudadanos visualizar en
            tiempo real la disponibilidad de plazas de aparcamiento en diversos
            establecimientos. Al unificar esta información en una única interfaz
            con mapas interactivos de OpenStreetMap, empoderamos a los
            conductores para que tomen decisiones informadas, optimicen sus
            rutas y contribuyan a una movilidad más fluida y sostenible.
          </p>
        </div>

        {/* Sección: Características Clave */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <LiaKeySolid className="inline-block mr-3 text-yellow-500" />
            Características Clave
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <FaSearchLocation className="text-4xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Visualización en Mapa
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Mapa interactivo con OpenStreetMap que muestra la ubicación de
                todos los parkings y su estado general.
              </p>
            </div>
            <div className="p-6">
              <FaUsers className="text-4xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Información en Tiempo Real
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Datos de ocupación actualizados periódicamente para reflejar la
                disponibilidad de plazas de la forma más precisa posible.
              </p>
            </div>
            <div className="p-6">
              <FaLaptopCode className="text-4xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Código Abierto</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Proyecto distribuido bajo una licencia Open Source para fomentar
                la colaboración, la transparencia y la adaptación a las
                necesidades de cualquier ciudad.
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Stack Tecnológico */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Stack Tecnológico
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <FaReact className="text-5xl text-sky-400 mr-4" />
              <div>
                <h3 className="font-bold">Frontend</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  React, React Router, Tailwind CSS
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <FaJava className="text-5xl text-orange-500 mr-4" />
              <div>
                <h3 className="font-bold">Backend</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Java, Spring Boot
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg col-span-2 md:col-span-1">
              <FaDatabase className="text-5xl text-green-500 mr-4" />
              <div>
                <h3 className="font-bold">Datos y Búsqueda</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  MongoDB, Elasticsearch
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
