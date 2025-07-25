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
  FaGithub,
} from "react-icons/fa";
import {
  LiaGlobeEuropeSolid,
  LiaProjectDiagramSolid,
  LiaKeySolid,
  LiaLaptopCodeSolid,
  LiaCitySolid,
  LiaReact,
  LiaGithubAlt,
} from "react-icons/lia";
import { useTranslation } from "react-i18next"; // i18n hook

const AboutPage = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Destructura t para usar traducciones

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300">
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
            src="/logo-transparent.png"
            alt={t("about.logoAlt", "PK4U Logo")}
            className="w-30 mb-4 drop-shadow-xl p-2"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400 drop-shadow-lg">
            {t("about.heroTitle", "PK4U: Parking for You")}
          </h1>
          <p className="mt-4 text-lg tracking-wide sm:text-xl max-w-2xl mx-auto text-slate-700 dark:text-slate-200 font-medium">
            {t(
              "about.heroSubtitle",
              "Plataforma abierta y gratuita para la gestión inteligente del aparcamiento urbano en Smart Cities."
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition"
            >
              {t("about.viewMap", "Ver Mapa de Parkings")}
            </Link>
            <a
              href="https://github.com/Jefffer/pk4u-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow-lg hover:bg-amber-700 transition flex items-center gap-2"
            >
              <LiaGithubAlt className="w-5 h-5" />
              {t("about.viewOnGitHub", "Ver en GitHub")}
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="relative py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-right justify-end">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center text-right justify-end text-red-500 dark:text-red-400">
              <LiaCitySolid className="mr-3" />
              {t("about.challengeTitle", "El Desafío Urbano")}
            </h2>
            <p className="mb-4 text-lg">
              {t(
                "about.challengeP1",
                "En las ciudades modernas, encontrar aparcamiento se ha convertido en un desafío diario que genera estrés, pérdida de tiempo y un aumento innecesario del tráfico y la contaminación."
              )}
            </p>
            <p className="mb-4 text-lg">
              {t("about.challengeP2", "Este fenómeno, conocido como")}{" "}
              <em className="font-semibold text-teal-600 dark:text-teal-400">
                cruising for parking
              </em>
              {t(
                "about.challengeP2b",
                ", afecta negativamente la calidad de vida y la sostenibilidad urbana."
              )}
            </p>
            <p className="text-base tracking-wider text-slate-600 dark:text-slate-400">
              {t(
                "about.challengeP3",
                "Las soluciones comerciales suelen ser propietarias y costosas, limitando su adopción y la interoperabilidad entre servicios de Smart City."
              )}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center relative overflow-visible">
            <div className="relative w-full max-w-md">
              <img
                src="/about2.png"
                alt={t("about.parkingProblemAlt", "Problema de aparcamiento")}
                className="rounded-2xl shadow-2xl w-full object-cover object-center border-4 border-teal-100 dark:border-teal-900"
                style={{ filter: "grayscale(0.2) brightness(0.95)" }}
              />
              <LiaGlobeEuropeSolid
                className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-[7rem] text-teal-200 dark:text-teal-800 opacity-30 pointer-events-none max-w-[40%] max-h-[40%] hidden sm:block"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className="relative py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center relative overflow-visible">
            <div className="relative w-full max-w-md">
              <img
                src="/about3.png"
                alt={t("about.solutionImgAlt")}
                className="rounded-2xl shadow-2xl w-full object-cover object-center border-4 border-teal-100 dark:border-teal-900"
                style={{ filter: "grayscale(0.1) brightness(1.05)" }}
              />
              <img
                src="/pk4u-v2.png"
                alt={t("about.logoAlt")}
                className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 h-20 w-20 rounded-full bg-white/80 dark:bg-slate-900/80 p-2 shadow-lg border-2 border-teal-200 dark:border-teal-800 max-w-[40%] max-h-[40%] hidden sm:block"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
          <div className="md:w-1/2 justify-start text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center text-teal-600 dark:text-teal-400">
              <LiaProjectDiagramSolid className="mr-3" />
              {t("about.solutionTitle")}
            </h2>
            <p className="mb-4 text-lg">
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                PK4U
              </span>{" "}
              {t("about.solutionP1")}
            </p>
            <p className="mb-4 text-lg">{t("about.solutionP2")}</p>
            <p className="text-base tracking-wider text-slate-600 dark:text-slate-400 ">
              {t("about.solutionP3")}
            </p>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 flex items-center justify-center text-yellow-500">
          <LiaKeySolid className="inline-block mr-3" />
          {t("about.keyFeatures.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaSearchLocation className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t("about.keyFeatures.feature1.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              {t("about.keyFeatures.feature1.description")}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t("about.keyFeatures.feature2.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              {t("about.keyFeatures.feature2.description")}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaLaptopCode className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t("about.keyFeatures.feature3.title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              {t("about.keyFeatures.feature3.description")}
            </p>
          </div>
        </div>
      </section>

      {/* STACK TECNOLÓGICO */}
      <section className="py-20">
        <h2 className="text-indigo-400 text-3xl sm:text-4xl font-bold text-center mb-12">
          <LiaLaptopCodeSolid className="inline-block mr-3" />
          {t("about.techStack.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaReact className="text-5xl text-sky-400 mr-4" />
            <div>
              <h3 className="font-bold text-lg">
                {t("about.techStack.frontend.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("about.techStack.frontend.description")}
              </p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaJava className="text-5xl text-orange-500 mr-4" />
            <div>
              <h3 className="font-bold text-lg">
                {t("about.techStack.backend.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("about.techStack.backend.description")}
              </p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FaDatabase className="text-5xl text-green-500 mr-4" />
            <div>
              <h3 className="font-bold text-lg">
                {t("about.techStack.data.title")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("about.techStack.data.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t("about.cta.title")}
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          {t("about.cta.description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 rounded-lg bg-white text-teal-600 font-semibold shadow-lg hover:bg-slate-100 transition"
          >
            {t("about.cta.goToMap")}
          </Link>
          <a
            href="https://github.com/Jefffer/pk4u-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 transition flex items-center gap-2"
          >
            <LiaGithubAlt className="w-5 h-5" />
            {t("about.cta.viewOnGitHub")}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
