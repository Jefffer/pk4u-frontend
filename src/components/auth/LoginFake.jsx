import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const logoUrl = "/pk4u-v2.png";

const AliasScreen = ({ onAliasSubmit }) => {
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Validación del alias
    if (alias.length === 0) {
      setError("");
      setIsValid(false);
      return;
    }

    if (alias.length > 20) {
      setError(t("login.error.tooLong"));
      setIsValid(false);
    } else if (!/^[a-zA-Z0-9\s]*$/.test(alias)) {
      setError(t("login.error.invalidChars"));
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }, [alias, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && alias.trim()) {
      onAliasSubmit(alias.trim());
    } else if (!alias.trim()) {
      setError(t("login.error.empty"));
      setIsValid(false);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 via-indigo-600 to-purple-700 p-4">
        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
                src={logoUrl}
                alt="PK4U Logo"
                className="h-30 w-auto"
                onError={(e) => {
                  e.target.onerror = null; // Previene loops si el placeholder también falla
                  e.target.style.display = "none"; // Oculta la imagen rota
                  // Muestra un texto si el logo no carga:
                  const logoText = document.createElement("p");
                  logoText.textContent = "PK4U";
                  logoText.className =
                      "text-4xl font-bold text-sky-600 dark:text-sky-400";
                  e.target.parentNode.appendChild(logoText);
                }}
            />
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-100 mb-2">
            {t("login.welcome")}
          </h1>
          <p className="text-center text-teal-500 dark:text-teal-500 mb-8">
            {t("login.instructions")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* <label
              htmlFor="alias"
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
            >
              Tu Nombre de Usuario:
            </label> */}
              <input
                  id="alias"
                  name="alias"
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className={`w-full p-3 border rounded-lg shadow-sm transition-colors
                          ${
                      error
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
                  }
                          bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder={t("login.placeholder")}
              />
              {error && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400 animate-pulse">
                    {error}
                  </p>
              )}
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {alias.length}/20 {t("login.characters")}
              </p>
            </div>

            <button
                type="submit"
                disabled={!isValid || !alias.trim()}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                        transition-all duration-150 ease-in-out
                        ${
                    isValid && alias.trim()
                        ? "bg-teal-500 hover:bg-teal-600 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        : "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                } 
                        transform hover:scale-105 disabled:hover:scale-100`}
            >
              {t("login.continue")}
            </button>
          </form>
        </div>
      </div>
  );
};

export default AliasScreen;
