import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { LiaSunSolid, LiaMoonSolid  } from "react-icons/lia";

const ThemeToggleButton = ({ currentTheme, toggleTheme }) => {
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-colors duration-200"
    >
      {isDark ? (
        <LiaSunSolid className="w-5 h-5 text-yellow-400" />
      ) : (
        <LiaMoonSolid className="w-5 h-5 text-sky-500" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
