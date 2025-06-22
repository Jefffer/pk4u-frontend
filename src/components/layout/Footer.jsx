import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaReact, FaJava, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
              {t('footer.projectInfo.title')}
            </h5>
            <p className="text-sm text-gray-400">
              {t('footer.projectInfo.description')}
            </p>
          </div>

          {/* Navegación del footer */}
          <div className="text-center">
            <h5 className="text-lg font-semibold mb-2">
              {t('footer.navigation.title')}
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                    to="/about"
                    className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  <FaInfoCircle className="w-4 h-4 mr-2" />
                  {t('footer.navigation.aboutProject')}
                </Link>
              </li>
              <li>
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  <FaReact className="w-4 h-4 mr-2" />
                  {t('footer.navigation.goToMap')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Créditos y GitHub */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              {t('footer.copyright.text', { year: currentYear })}
            </p>
            <a
                href={frontendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300"
                aria-label={t('footer.copyright.githubAriaLabel')}
            >
              <FaGithub className="w-5 h-5 mr-2" />
              {t('footer.copyright.viewSource')}
            </a>
          </div>
        </div>

        {/* Built with React & Java */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-500">
            {t('footer.builtWith.text')}{" "}
            <FaReact
                className="inline-block text-teal-400 mx-1 align-middle"
                aria-label={t('footer.builtWith.reactAriaLabel')}
            />
            <span className="text-teal-400 font-semibold">
            {t('footer.builtWith.react')}
          </span>{" "}
            {t('footer.builtWith.and')}{" "}
            <FaJava
                className="inline-block text-orange-500 mx-1 align-middle"
                aria-label={t('footer.builtWith.javaAriaLabel')}
            />{" "}
            <span className="text-orange-500 font-semibold">
            {t('footer.builtWith.java')}
          </span>
          </p>
        </div>
      </footer>
  );
};

export default Footer;
