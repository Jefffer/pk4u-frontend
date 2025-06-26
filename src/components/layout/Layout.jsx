import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next"; // <-- Importar useTranslation
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import useParkingData from "../../hooks/useParkingDataHook";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const { t } = useTranslation(); // <-- Hook para traducciones

  const [selectedParkingId, setSelectedParkingId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false); // estado para controlar el focus
  const searchInputRef = useRef(null); // Ref para el input del buscador del sidebar

  const {
    parkings,
    selectedParkingDetails,
    isLoading,
    error,
    selectParking,
    getSpotsForLevel,
    handleSearch, 
    searchResults, 
    isSearching, 
    searchTerm,    
  } = useParkingData(selectedParkingId);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // función para manejar el click en un marcador
  const handleMarkerClick = (parkingId) => {
    setSelectedParkingId(parkingId); // Actualiza el ID del parking seleccionado
    selectParking(parkingId); // Llama a la función para cargar los detalles del parking
    setShouldFocusSearch(false); // No queremos focus al hacer click en un marcador
    if (!isSidebarVisible) {
      // Si la sidebar está oculta
      setIsSidebarVisible(true); // Muéstrala
    }
  };

  // función para abrir el sidebar y hacer focus en el buscador
  const handleSearchClick = () => {
    setShouldFocusSearch(true); // Indicamos que queremos hacer focus
    if (!isSidebarVisible) {
      setIsSidebarVisible(true);
    } else {
      // Si el sidebar ya está visible, hacemos focus directamente
      searchInputRef.current?.focus();
      setShouldFocusSearch(false);
    }
  };

  // --- FUNCIÓN CALLBACK ---
  const onSidebarAnimationComplete = () => {
    if (shouldFocusSearch) {
      searchInputRef.current?.focus();
      setShouldFocusSearch(false); // Reseteamos el estado
    }
  };

  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header
          userAlias={userAlias}
          onLogout={onLogout}
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebarVisibility}
          onSearchClick={handleSearchClick}
          // Si Header usa textos, ahí dentro ya debe usar t('clave')
        />
        {/* <Header /> */}
        <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-white dark:bg-slate-800">
          <div className="flex-1 h-full">
            {/* Pasa la lista de parkings del hook a MapView */}
            <MapView
              parkings={parkings} // Pasa la lista de parkings
              onMarkerClick={handleMarkerClick}
              selectedParkingId={selectedParkingId} // Pasa el ID seleccionado para que el mapa resalte el marcador
            />
          </div>
          <AnimatePresence>
            {isSidebarVisible && (
              <Sidebar
                // Pasa los detalles del parking seleccionado y el estado de carga/error del hook
                selectedParkingId={selectedParkingId}
                parkings={parkings} // Pasa la lista de parkings
                onParkingSelect={handleMarkerClick} // Pasa la función de click
                parkingDetails={selectedParkingDetails} // Pasa los detalles completos
                isLoading={isLoading}
                error={error}
                searchInputRef={searchInputRef}
                onAnimationComplete={onSidebarAnimationComplete}
                getSpotsForLevel={getSpotsForLevel} // Pasa la función para obtener detalles de plazas
                onSearch={handleSearch}
                searchResults={searchResults}
                isSearching={isSearching}
                searchTerm={searchTerm}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
