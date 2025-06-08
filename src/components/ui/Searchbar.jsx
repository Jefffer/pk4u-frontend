import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { LiaSearchLocationSolid } from "react-icons/lia";

const SearchBar = ({ onSearch, placeholder = "Buscar por dirección o nombre..." }, ref) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LiaSearchLocationSolid className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
      <input
        ref={ref}
        type="text"
        className="w-full pr-3 pt-2 pb-2 pl-10 text-sm text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/60 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 dark:placeholder-slate-400"
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)} 
      />
    </div>
  );
};

export default SearchBar;