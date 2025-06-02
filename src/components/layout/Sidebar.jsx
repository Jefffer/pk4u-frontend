import React, { useState } from 'react';
import SearchBar from '../ui/Searchbar';
// import ParkingList from '../parking/ParkingList';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Aquí iría la lógica para filtrar parkings o llamar a una API con el término de búsqueda
    console.log("Buscando:", term);
  };

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 dark:bg-slate-800 p-6 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
      <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 pt-2 pb-4 z-10">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Buscar Parkings</h2>
        <SearchBar onSearch={handleSearch} placeholder="Introduce ubicación o nombre..." />
      </div>
      {/* Aquí iría el ParkingList que usaría el searchTerm para filtrar, o mostraría el ParkingDetail */}
      <p className="text-slate-600 dark:text-slate-400 mt-4">
        {searchTerm ? `Resultados para: ${searchTerm}` : "Lista de parkings o detalles aquí..."}
      </p>
    </aside>
  );
};

export default Sidebar;
