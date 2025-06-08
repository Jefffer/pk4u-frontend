import React, { useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const [selectedParkingId, setSelectedParkingId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false); // estado para controlar el focus
  const searchInputRef = useRef(null); // Ref para el input del buscador del sidebar

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // función para manejar el click en un marcador
  const handleMarkerClick = (parkingId) => {
    setSelectedParkingId(parkingId); // Actualiza el ID del parking seleccionado
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
        />
        {/* <Header /> */}
        <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-white dark:bg-slate-800">
          <div className="flex-1 h-full">
            <MapView onMarkerClick={handleMarkerClick} />
          </div>
          <AnimatePresence>
            {isSidebarVisible && (
              <Sidebar
                selectedParkingId={selectedParkingId}
                searchInputRef={searchInputRef}
                onAnimationComplete={onSidebarAnimationComplete}
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
