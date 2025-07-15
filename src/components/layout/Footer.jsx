import React from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaReact, FaJava, FaInfoCircle } from "react-icons/fa";
import { SiMongodb, SiElasticsearch, SiRabbitmq } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const frontendRepoUrl = "https://github.com/Jefffer/PK4U-frontend";

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-800 dark:text-white border-t-1 border-teal-800 shadow-md py-8 px-4 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Sección de información del proyecto */}
        <div className="text-center md:text-left">
          <h5 className="text-xl font-bold mb-2">
            {t("footer.projectInfo.title")}
          </h5>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("footer.projectInfo.description")}
          </p>
        </div>

        {/* Navegación del footer */}
        <div className="text-center">
          <h5 className="text-lg font-semibold mb-2">
            {t("footer.navigation.title")}
          </h5>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <Link
                to="/about"
                className="inline-flex items-center hover:text-teal-400 transition-colors duration-300"
              >
                <FaInfoCircle className="w-4 h-4 mr-2" />
                {t("footer.navigation.aboutProject")}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="inline-flex items-center hover:text-teal-400 transition-colors duration-300"
              >
                <FaReact className="w-4 h-4 mr-2" />
                {t("footer.navigation.goToMap")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Créditos y GitHub */}
        <div className="text-center md:text-right text-slate-600 dark:text-slate-400">
          <p className="text-sm mb-2">
            {t("footer.copyright.text", { year: currentYear })}
          </p>
          <a
            href={frontendRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-teal-400 transition-colors duration-300"
            aria-label={t("footer.copyright.githubAriaLabel")}
          >
            <FaGithub className="w-5 h-5 mr-2" />
            {t("footer.copyright.viewSource")}
          </a>
        </div>
      </div>

      {/* Built by */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center tracking-wide text-slate-600 dark:text-slate-400">
        <p className="text-xs flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
          {t("footer.builtWith.text")}{" "}
          <FaReact
            className="inline-block text-teal-400 align-middle"
            aria-label={t("footer.builtWith.reactAriaLabel")}
          />
          <span className="text-teal-400 font-semibold">
            {t("footer.builtWith.react")}
          </span>
          {"|"}
          <FaJava
            className="inline-block text-orange-500 align-middle"
            aria-label={t("footer.builtWith.javaAriaLabel")}
          />
          <span className="text-orange-500 font-semibold">Java</span>
          {"|"}
          <SiMongodb
            className="inline-block text-green-600 align-middle"
            aria-label="MongoDB"
          />
          <span className="text-green-600 font-semibold">MongoDB</span>
          {"|"}
          <SiElasticsearch
            className="inline-block text-yellow-600 align-middle"
            aria-label="Elasticsearch"
          />
          <span className="text-yellow-600 font-semibold">Elasticsearch</span>
          {"|"}
          <SiRabbitmq
            className="inline-block text-blue-500 align-middle"
            aria-label="RabbitMQ"
          />
          <span className="text-blue-500 font-semibold">RabbitMQ</span>
        </p>
        <div className="mt-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
          <span>{t("footer.developers", "Desarrolladores:")}</span>
          <a
            href="https://github.com/Jefffer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-teal-400 transition-colors"
            aria-label="GitHub Jeffer"
          >
            <FaGithub className="w-4 h-4 mr-1" />
            Jeffer
          </a>
          <a
            href="https://github.com/MMunozLo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-teal-400 transition-colors"
            aria-label="GitHub Maria"
          >
            <FaGithub className="w-4 h-4 mr-1" />
            Maria
          </a>
          <a
            href="https://github.com/gecamara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-teal-400 transition-colors"
            aria-label="GitHub Germi"
          >
            <FaGithub className="w-4 h-4 mr-1" />
            Germi
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
