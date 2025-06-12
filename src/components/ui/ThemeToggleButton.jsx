import React from "react";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon } from "react-icons/fa";
import { LiaSunSolid, LiaMoonSolid } from "react-icons/lia";

const ThemeToggleButton = ({ currentTheme, toggleTheme }) => {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  return (
      <button
          onClick={toggleTheme}
          title={isDark ? t("theme.toggleToLight") : t("theme.toggleToDark")}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-200 mr-1 sm:mr-2"
      >
        {isDark ? (
            <LiaSunSolid className="w-5 h-5 hover:text-yellow-400 dark:hover:text-yellow-400 dark:text-slate-300" />
        ) : (
            <LiaMoonSolid className="w-5 h-5 hover:text-sky-500 text-slate-600" />
        )}
      </button>
  );
};

export default ThemeToggleButton;
