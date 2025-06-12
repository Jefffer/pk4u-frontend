import React, { useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const { t } = useTranslation();
  const [selectedParkingId, setSelectedParkingId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleMarkerClick = (parkingId) => {
    setSelectedParkingId(parkingId);
    setShouldFocusSearch(false);
    if (!isSidebarVisible) {
      setIsSidebarVisible(true);
    }
  };

  const handleSearchClick = () => {
    setShouldFocusSearch(true);
    if (!isSidebarVisible) {
      setIsSidebarVisible(true);
    } else {
      searchInputRef.current?.focus();
      setShouldFocusSearch(false);
    }
  };

  const onSidebarAnimationComplete = () => {
    if (shouldFocusSearch) {
      searchInputRef.current?.focus();
      setShouldFocusSearch(false);
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