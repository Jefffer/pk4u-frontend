import React, { useState, useEffect, forwardRef } from "react";
import { FaSearch } from "react-icons/fa";
import { LiaSearchSolid  } from "react-icons/lia";

const SearchBar = forwardRef(
  ({ onSearch, placeholder = "Buscar por dirección o nombre..." }, ref) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      // Establece un temporizador para ejecutar la búsqueda 300ms después de que el usuario deje de escribir
      const handler = setTimeout(() => {
        // Solo ejecuta la búsqueda si el valor ha cambiado y tiene al menos 3 caracteres o está vacío
        if (onSearch && (inputValue.length >= 3 || inputValue.length === 0)) {
          onSearch(inputValue);
        }
      }, 500); // debounce de 300ms

      // Limpia el temporizador si el usuario sigue escribiendo
      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, onSearch]);

    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LiaSearchSolid  className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </div>
        <input
          ref={ref}
          type="text"
          className="w-full pr-3 pt-2 pb-2 pl-10 text-sm text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800/60 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 dark:placeholder-slate-400"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    );
  }
);

export default SearchBar;
