import React from "react";
import SearchBar from '../ui/Searchbar';
// import ParkingList from '../parking/ParkingList';

const Sidebar = () => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 dark:bg-slate-800 p-4 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
      <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 py-2"> {/* Para que la búsqueda quede fija al hacer scroll en la lista */}
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Parkings</h2>
        <SearchBar />
      </div>
      {/* <ParkingList /> */}
      <p className="text-slate-600 dark:text-slate-400">Resultados de búsqueda o detalles del parking aquí...</p>
    </aside>
  );
};
export default Sidebar;
